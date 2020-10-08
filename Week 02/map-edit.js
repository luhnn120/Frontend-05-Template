/**
* @Description: 地图编辑器
* @Author: luhan
* @Date: 2020/10/06 16:36:21
* @todo:
* @param:{参数类型} 参数名 参数说明 
* @return: {返回值类型} 返回值 说明
*/
// 1 - block
let map = JSON.parse(localStorage.getItem('map')) || new Array(100*100).fill(0)
function sleep(t){
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
} 
// 二叉堆
class Heap{
  constructor(data, compare){
    this.data = []
    this.compare = compare || ( (a,b) => a-b )
    for (let index = 0; index < data.length; index++) {
      this.give(data[index])
    }
  }
  get length(){
    return this.data.length
  }
  take(){
    if(!this.data.length){
      return
    }
    let min = this.data[0]
    this.data[0] = this.data[this.data.length - 1] 
    for(let index = 0; index < this.data.length;){
      if(2*index + 1 > this.data.length - 1) {
        break
      }
      let minChildIndex = 2*index + 1 
      if(2*index + 2 <= this.data.length - 1 && this.compare(this.data[2*index+1], this.data[2*index+2]) > 0){
        minChildIndex = 2*index + 2
      }
      if(this.compare(this.data[index], this.data[minChildIndex]) > 0){
        let tmp = this.data[index]
        this.data[index] = this.data[minChildIndex]
        this.data[minChildIndex] = tmp
        index = minChildIndex
        continue
      }
      break
    }
    this.data.pop();
    return min
  }
  give(data){
    this.data.push(data)
    for(let index = this.data.length - 1; index >=1;) {
      let parentIndex = Math.floor((index-1)/2)
      if(this.compare(this.data[parentIndex], this.data[index]) > 0){
        let tmp = this.data[index]
        this.data[index] = this.data[parentIndex]
        this.data[parentIndex] = tmp
        index = parentIndex
        continue
      }
      break
    }
  }
  show(){
    console.log(this.data)
  }
}
class Sorted{
  constructor(data,compare){
    this.data = Object.create(data)
    this.compare = compare || ( ( a, b ) => a - b )
  }
  take(){
    if(!this.data.length){
      return
    }
    let min = this.data[0]
    let minIndex = 0
    for (let index = 1; index < this.data.length; index++) {
      if(this.compare(min, this.data[index]) > 0){
        min = this.data[index]
        minIndex = index
      }
    }
    this.data[minIndex] = this.data[this.data.length - 1]
    this.data.pop()
    return min
  }
  give(data){
    this.data.push(data)
  }
  get length(){
    return this.data.length
  }
}

// 广度优先寻路算法
async function findPath(map, start, end){
  const startTime = new Date().getTime()
  let mapTmp = Object.create(map)
  let query = new Heap([start], (a,b) => distance(a) - distance(b))
  while(query.length != 0 ){
    let [x, y] = query.take()
    if(x === end[0] && y === end[1]){
      let path = [end]
      while(x !== start[0] || y !== start[1]){
        await sleep(20)
        document.getElementById('container').children[x+ y*100].style.backgroundColor = 'purple'
        let tmp = mapTmp[x + y*100]
        x = tmp[0]
        y = tmp[1]
        path.push(tmp)
      }
      const endTime = new Date().getTime();
      console.log('time =====', (endTime - startTime))
      console.log('step =====', path.length)
      return path
    }
    await insert(x-1, y, [x, y])
    await insert(x+1, y, [x, y])
    await insert(x, y-1, [x, y])
    await insert(x, y+1, [x, y])
    await insert(x-1, y-1, [x, y])
    await insert(x-1, y+1, [x, y])
    await insert(x+1, y-1, [x, y])
    await insert(x+1, y+1, [x, y])
  }
  return null
  function distance(point){
    return (end[0] - point[0]) ** 2 + (end[1] - point[1]) **2
  } 
  // TODO: 优化最短路径，主要是pre点和有值时的返回
  async function insert(x, y, pre){
    if(x < 0 || y < 0 || x > 99 || y > 99){
      return
    }
    if(mapTmp[x + 100*y]){
      return
    }
    // await sleep(20)
    document.getElementById('container').children[x+ y*100].style.backgroundColor = 'lightgreen'
    mapTmp[x + 100*y] = pre
    query.give([x,y])
  }
}
function show(){
  const container = document.getElementById('container')
  container.innerHTML = ''
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.addEventListener('mousemove', () => {
        if(mouseDown){
          if(clear){
            map[i*100 + j] = 0
            cell.style.backgroundColor = "gray"
          }else{
            map[i*100 + j] = 1
            cell.style.backgroundColor = "black"
          }
        }
      })
      if(map[i*100 + j] === 1){
        cell.style.backgroundColor = "black"
      }
      container.appendChild(cell)
    }
  }
}
let mouseDown = false
let clear = false
document.addEventListener('mousedown', (e) => {
  clear = e.which === 3
  mouseDown = true
})
document.addEventListener('mouseup', () => {
  mouseDown = false
  clear = false
})
// 禁用右键
document.oncontextmenu = (e)=>{
  e.preventDefault()
}
document.getElementsByTagName('button')[0].addEventListener('click', () => {
  localStorage.setItem('map', JSON.stringify(map))
})
show()
