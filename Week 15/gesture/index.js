export class Listener{
  constructor(element, recognizer){
    const isMobild = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    const contexts = new Map()
    let isEventListened = false
    // 鼠标
    element.addEventListener('mousedown', event => {
      // chrome 移动模式BUG
      if(isMobild){
        return ;
      }
      const up = event => {
        let context = contexts.get(`mouse${1 << event.button}`)
        recognizer.end(event, context)
        if(event.buttons === 0){
          document.removeEventListener("mousemove", mousemove)
          document.removeEventListener("mouseup", up)
          isEventListened = false
        }
      }
      const mousemove = event => {
        let button = 1;
        while(button <= event.buttons){
          if(button & event.buttons){
            let key;
            if(button === 2){
              key = 4
            } else if( button === 4){
              key = 2
            } else {
              key = button
            }
            let context = contexts.get(`mouse${key}`)
            recognizer.move(event, context)
          }
          button = button << 1
        }
      }
      const context = Object.create(null)
      contexts.set(`mouse${1 << event.button}`, context)
      recognizer.start(event, context)
      if(!isEventListened){
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', up)
        isEventListened = true
      }
    })

    // 手势
    element.addEventListener('touchstart', event => {
      for (const target of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(target.identifier, context)
        recognizer.start(target, context)
      }
    })

    element.addEventListener("touchmove", event => {
      for (const target of event.changedTouches) {
        let context = contexts.get(target.identifier)
        recognizer.move(target, context)
      }
    })

    element.addEventListener("touchend", event => {
      for (const target of event.changedTouches) {
        let context = contexts.get(target.identifier)
        recognizer.end(target, context)
        contexts.delete(target.identifier)
      }
    })

    element.addEventListener("touchcancel", event => {
      for (const target of event.changedTouches) {
        let context = contexts.get(target.identifier)
        recognizer.cancle(target, context)
        contexts.delete(target.identifier)
      }
    })
  }
}

export class Recognizer{
  constructor(dispatcher){
    this.dispatcher = dispatcher
  }
  
  start(point, context){
    // Tap 默认事件
    context.isTap = true, context.isPan = false, context.isPress = false
    context.startX = point.clientX, context.startY = point.clientY
    // 记录移动轨迹 计算平均速度 判断flick
    context.moves = []
    context.moves.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
    context.handler = setTimeout(() => {
      this.dispatcher.dispatch('press')
      // Press 定时器
      context.isPan = false
      context.isTap = false
      context.isPress = true
      context.handler = null
    }, 500)
  }

  move(point, context) {
    let dX = point.clientX - context.startX,dY = point.clientY - context.startY
    if(!context.isPan && dX ** 2 + dY ** 2 > 100){
      // panstart
      context.beVertical = Math.abs(dX) < Math.abs(dY)
      this.dispatcher.dispatch('panstart', {
        clientX: point.clientX,
        clientY: point.clientY,
        startX: context.startX,
        startY: context.startY,
        beVertical: context.beVertical
      })
      context.isPan = true
      context.isTap = false
      context.isPress = false
      clearTimeout(context.handler)
    }
    context.moves = context.moves.filter( e => Date.now() - e.t < 300)
    context.moves.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }

  end(point, context) {
    if(context.isTap){
      clearTimeout(context.handler)
      this.dispatcher.dispatch('tap')
    }
    if(context.isPress){
      this.dispatcher.dispatch('press')
    }
    if(context.isPan){
      // 根据平均速度 判断flick
      context.moves = context.moves.filter( e => Date.now() - e.t < 300)
      if(context.moves.length === 0){
        context.isFlick = false
      } else {
        let d = Math.sqrt((point.clientX - context.moves[0].x) ** 2 +
          (point.clientY - context.moves[0].y) ** 2
        )
        let v = d / ( Date.now() - context.moves[0].t)
        context.isFlick = v > 1.5
        context.velocity = v
      }
      const panEvent = Object.create({
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isFlick: context.isFlick,
        beVertical: context.beVertical
      })
      this.dispatcher.dispatch('pan end', panEvent)
      if(context.isFlick){
        this.dispatcher.dispatch('flick', Object.assign(panEvent,{
          isFlick: context.isFlick,
          velocity: context.velocity
        }))
      }
    }
  }
  cancle(point, context) {
    clearTimeout(context.handler)
    if(context.isTap){
      this.dispatcher.dispatch('tap cancle')
    }
    if(context.isPress){
      this.dispatcher.dispatch('press cancle')
    }
    if(context.isPan){
      this.dispatcher.dispatch('pan cancle')
    }
  }
}

export class Dispatcher{
  constructor(element){
    this.element = element
  }
  dispatch (type, propreties){
    const event = new Event(type)
    for (const name in propreties) {
      event[name] = propreties[name]
    }
    this.element.dispatchEvent(event)
  }
}

export function enableGesture(element){
  new Listener(element, new Recognizer(new Dispatcher(element)))
}