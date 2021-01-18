const dom = document.documentElement;
const isMobild = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
const contexts = new Map()
let isEventListened = false
// 鼠标
dom.addEventListener('mousedown', event => {
  // chrome 移动模式BUG
  if(isMobild){
    return ;
  }
  const up = event => {
    let context = contexts.get(`mouse${1 << event.button}`)
    end(event, context)
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
        move(event, context)
      }
      button = button << 1
    }
  }
  const context = Object.create(null)
  contexts.set(`mouse${1 << event.button}`, context)
  start(event, context)
  if(!isEventListened){
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', up)
    isEventListened = true
  }
})

// 手势
dom.addEventListener('touchstart', event => {
  for (const target of event.changedTouches) {
    let context = Object.create(null)
    contexts.set(target.identifier, context)
    start(target, context)
  }
})

dom.addEventListener("touchmove", event => {
  for (const target of event.changedTouches) {
    let context = contexts.get(target.identifier)
    move(target, context)
  }
})

dom.addEventListener("touchend", event => {
  for (const target of event.changedTouches) {
    let context = contexts.get(target.identifier)
    end(target, context)
    contexts.delete(target.identifier)
  }
})

dom.addEventListener("touchcancel", event => {
  for (const target of event.changedTouches) {
    let context = contexts.get(target.identifier)
    cancle(target, context)
    contexts.delete(target.identifier)
  }
})

const start = (point, context) => {
  // Tap 默认事件
  context.isTap = true, context.isPan = false, context.isPress = false
  context.startX = point.clientX, context.startY = point.clientY
  context.handler = setTimeout(() => {
    console.log('press')
    // Press 定时器
    context.isPan = false
    context.isTap = false
    context.isPress = true
    context.handler = null
  }, 500)
  // console.log('start', point.clientX, point.clientY)
}

const move = (point, context) => {
  let dX = point.clientX - context.startX,dY = point.clientY - context.startY
  if(!context.isPan && dX ** 2 + dY ** 2 > 100){
    // panstart
    console.log('panstart')
    context.isPan = true
    context.isTap = false
    context.isPress = false
    clearTimeout(context.handler)
  }
  if(context.isPan){
    console.log('pan')
  }
  // console.log('move', point.clientX, point.clientY)
}

const end = (point, context) => {
  if(context.isTap){
    clearTimeout(context.handler)
    console.log('tap end')
  }
  if(context.isPress){
    console.log('press end')
  }
  if(context.isPan){
    console.log('pan end')
  }
  // console.log('end', point.clientX, point.clientY)
}

const cancle = (point, context) => {
  clearTimeout(context.handler)
  if(context.isTap){
    console.log('tap cancle')
  }
  if(context.isPress){
    console.log('press cancle')
  }
  if(context.isPan){
    console.log('pan cancle')
  }
  // console.log('cancle', point.clientX, point.clientY)
}