import { Component, STATE, ATTRIBUTE} from './framework.js';
import { enableGesture } from './gesture/index.js';
import { TimeLine, Animation} from './animations/animation.js';

export {STATE} from './framework.js';

export class Carousel extends Component{
  constructor(){
    super();
  }
  render(){
    // 渲染轮播图
    this.root = document.createElement('div')
    this.root.classList.add("carousel")
    for (const record of this[ATTRIBUTE].src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url(${record.img})`
      this.root.appendChild(child)
    }

    // state
    this[STATE].position = 0
    let children = this.root.children
    let nextTick = null
    let nextTickHandle = null
    // 动画开始时间
    let animationStartTime = 0
    let animationX = 0
    // 绑定手势事件库
    enableGesture(this.root)

    // 绑定时间线
    const timeLine = new TimeLine();
    timeLine.start();
    this.root.addEventListener('start', event => {
      timeLine.pause()
      clearInterval(nextTickHandle)
      let process = (Date.now() - animationStartTime) / 1500
      animationX = process * 500 - 500
    })
    this.root.addEventListener('tap', event => {
      this.triggerEvent('click', {
        position: this[STATE].position,
        url: this[ATTRIBUTE].src[this[STATE].position].url
      })
    })
    this.root.addEventListener('pan', event => {
      let x = event.clientX - event.startX - animationX
      let current = this[STATE].position - (x - x % 500) / 500
      for (let offset of [-1, 0, 1]){
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length
        children[pos].style.transform = `translateX(${-pos*500 + offset*500 + x%500}px)`
      }
    })
    this.root.addEventListener('end', event => {
      timeLine.reset()
      timeLine.start()
      nextTickHandle = setInterval(nextTick, 3000) 
      let x = event.clientX - event.startX - animationX
      let current = this[STATE].position - (x - x % 500) / 500
      let direction = Math.round((x % 500) / 500)
      if(event.isFlick){
        if(event.velocity > 0){
          direction = Math.ceil((x % 500) / 500)
        }else{
          direction = Math.floor((x % 500) / 500)
        }
      }
      for (let offset of [-1, 0, 1]){
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length
        timeLine.add(new Animation(children[pos].style, 'transform', 
          -pos*500 + offset*500 + x%500,
          -pos*500 + offset*500 + direction*500,
          1500,
          null, null, v => `translateX(${v}px)`
        ))
      }
      this[STATE].position = current - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
      this.triggerEvent('change', {
        position: this[STATE].position
      })
    })

    nextTick = () => {
      let children = this.root.children
      let nextIndex = (this[STATE].position + 1) % children.length
      let current = children[this[STATE].position]
      let next = children[nextIndex]
      animationStartTime = Date.now()
      timeLine.add(new Animation(current.style, 'transform', 
       -this[STATE].position*500, -500 - this[STATE].position*500, 1500,
        0, null, v => `translateX(${v}px)`
      ))
      timeLine.add(new Animation(next.style, 'transform', 
        500 - nextIndex*500, -nextIndex*500, 1500,
        null, null, v => `translateX(${v}px)`
      ))
      this[STATE].position = nextIndex;
      this.triggerEvent('change', {
        position: this[STATE].position
      })
    }
    // 自动轮播
    nextTickHandle = setInterval(nextTick, 3000) 
    return this.root
  }
}