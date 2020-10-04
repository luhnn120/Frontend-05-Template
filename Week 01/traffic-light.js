/**
* @Description: 异步操作练习，通过callback、promise、async以及generator的方式来切换红绿灯
* @Author: luhan
* @Date: 2020/10/04 14:44:54
* @param: {参数类型} 参数名 参数说明 
* @return: {返回值类型} 返回值 说明
*/
function removeLight() {
  for (const item of document.getElementsByTagName('div')) {
    item.classList.remove('light')
  }
}
function green() {
  removeLight()
  document.getElementsByClassName('green')[0].classList.add('light')
}
function red() {
  removeLight()
  document.getElementsByClassName('red')[0].classList.add('light')
}
function yellow() {
  removeLight()
  document.getElementsByClassName('yellow')[0].classList.add('light')
}

function sleep(t) {
  return new Promise(resolve => {
    setTimeout(resolve,t)
  })
}

function happen(element, event) {
  return new Promise(resolve => {
    element.addEventListener(event,resolve, { once: true })
  })
}

function* LightGenerator(){
  while (true) {
    red()
    yield sleep(1000)
    yellow()
    yield sleep(200)
    green()
    yield sleep(500)
  }
}

// traversal the iterator Object that the generator returned
// In the then function of the vlaue, we handle async operations
function run(iterator){
  const {done, value} = iterator.next()
  if(done){
    return
  }
  if( value instanceof Promise){
    value.then(() => {
      run(iterator)
    })
  }else{
    run(iterator)
  }
}

// run generator by run function
function co(generator){
  run(generator())
}

// change light by callback function
function goByCallBack(){
  red()
  setTimeout(function(){
    yellow()
    setTimeout(function(){
      green()
      setTimeout(function(){
        goByCallBack()
      }, 500)
    }, 200)
  }, 1000)
}

// change light by promise
function goByPromise(){
  red()
  sleep(1000)
  .then(() => {
    yellow()
    return sleep(200)
  })
  .then(() => {
    green()
    return sleep(500)
  })
  .then(() => {
    goByPromise()
  })
  .catch(err => {
    console.error(err);
  })
}

// change light by async function
async function goByAsync(){
  while (true) {
    red()
    await sleep(1000)
    yellow()
    await sleep(200)
    green()
    await sleep(500)
  }
}

// change light by next button
async function goByNext(){
  const btnEle = document.getElementsByTagName('button')[0]
  while (true) {
    red()
    await happen(btnEle, 'click')
    yellow()
    await happen(btnEle, 'click')
    green()
    await happen(btnEle, 'click')
  }
}

// change light by generator
function goByGenerator(){
  co(LightGenerator)
}
