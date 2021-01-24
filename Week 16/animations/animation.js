const TICK = Symbol('tick')
const TICK_HANDLE = Symbol('tick-handle')
const ANIMATION = Symbol('animation')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class TimeLine{
  constructor(){
    this.state = 'inited'
    this[ANIMATION] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_TIME] = 0
  }

  // 启动
  start(){
    if(this.state !== 'inited'){
      return ;
    }
    this.state = 'started'
    let startTime = Date.now()
    let _self = this
    this[TICK] = () => {
      let now = Date.now()
      for (const animation of _self[ANIMATION]) {
        let t;
        if(_self[START_TIME].get(animation) > startTime){
          t = now - _self[START_TIME].get(animation) - _self[PAUSE_TIME] - animation.delay
        } else {
          t = now - startTime - _self[PAUSE_TIME] - animation.delay
        }
        if(animation.duration < t){
          _self[ANIMATION].delete(animation)
          t = animation.duration
        }
        if(t > 0){
          animation.receiveTime(t)
        }
      }
      _self[TICK_HANDLE] = requestAnimationFrame(_self[TICK])
    }
    this[TICK]()
  }
  
  // 暂停
  pause(){
    if(this.state !== 'started'){
      return ;
    }
    this.state = 'pause'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLE])
  }
  // 恢复
  resume(){
    if(this.state !== 'pause'){
      return ;
    }
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK_HANDLE] = requestAnimationFrame(this[TICK])
  }

  // 重置
  reset(){
    this[PAUSE_TIME] = 0
    this[TICK] = null
    cancelAnimationFrame(this[TICK_HANDLE])
    this[TICK_HANDLE] = null
    this[ANIMATION] = new Set()
    this[START_TIME] = new Map()
    this.state = 'inited'
  }

  // 添加animation
  add(animation, time = new Date()){
    this[ANIMATION].add(animation)
    this[START_TIME].set(animation, time)
  }
}

export class Animation{
  /**
   * @function constructor 动画构建方法
   * @param  {Object} object 目标对象
   * @param {String} property 目标属性数值
   * @param {String} startValue 开始时间
   * @param {String} endValue 结束时间
   * @param {String} duration 持续时间
   * @param {Stting} delay 延迟时间
   * @param {Function} timeFunction 时间函数，描述运动
   * @param {Function} template 属性单位
   * 
  */
  constructor(object, property, startValue, endValue, duration, delay, timeFunction, template){
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timeFunction = timeFunction || (v => v)
    this.template = template || (v => v)
  }
  receiveTime(time){
    let range = this.endValue - this.startValue
    let process = this.timeFunction(time / this.duration)
    // 均匀变换
    this.object[this.property] = this.template(this.startValue + range * process)
  }
}