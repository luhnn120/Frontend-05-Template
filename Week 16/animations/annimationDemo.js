import { TimeLine, Animation} from './animation.js';

let tl = new TimeLine();
let elDome = document.querySelector('#el')
document.querySelector('#pause-btn').addEventListener('click', () => {
  tl.pause()
})
document.querySelector('#resume-btn').addEventListener('click', () => {
  tl.resume()
})
document.querySelector('#reset-btn').addEventListener('click', () => {
  tl.reset()
  tl.add(new Animation(elDome.style, 'transform', 0, 500, 2000, 2000, null, v => `translateX(${v}%)`))
  tl.start()
})
tl.add(new Animation(elDome.style, 'transform', 0, 500, 2000, null, null, v => `translateX(${v}%)`))
tl.start()
