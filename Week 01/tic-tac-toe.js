/**
* @Description: tic-tac-toe
* @Author: luhan
* @Date: 2020/10/05 10:31:44
* @todo:
* @param:{参数类型} 参数名 参数说明 
* @return: {返回值类型} 返回值 说明
*/
(function(){
  // 棋盘 0 未落子 1 ⭕ 2 ❌
  let pattern = new Array(9).fill(0)
  // 落子方
  let color = 1
  function show(){
    const board = document.getElementById('board')
    board.innerHTML = ""
    for (let index = 0; index < pattern.length; index++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = 
        pattern[index] === 1 ? "⭕" : 
        pattern[index] === 2 ? "❌" : "";
      cell.addEventListener('click', () => userMove(index) )
      board.append(cell)
      if(index % 3 == 2){
        board.append(document.createElement('br'))
      }
    }
  }
  function userMove(index){
    if(pattern[index] !== 0 ){
      return
    }
    pattern[index] = color;
    show();
    if(checkWin(clone(pattern), color)){
      alert(`${color === 1 ? "⭕" : "❌"} is winner`)
    }
    color = 3 - color;
    if(willWin(clone(pattern), color)){
      console.log(`${color === 1 ? "⭕" : "❌"} is will win`)
    }
    computerMove()
  }
  function computerMove(){
    pattern[bestChoice(clone(pattern), color).point] = color;
    show();
    if(checkWin(clone(pattern), color)){
      alert(`${color === 1 ? "⭕" : "❌"} is winner`)
    }
    color = 3 - color;
    if(willWin(clone(pattern), color)){
      console.log(`${color === 1 ? "⭕" : "❌"} is will win`)
    }
  }
  function clone(obj){
    return Array.isArray(obj) ? [...obj] : JSON.stringify(JSON.parse(obj))
  }
  function checkWin(pattern,color){
    // row
    {
      for (let row = 0; row < 3; row++) {
        let win = true
        inner:
        for (let col = 0; col < 3; col++) {
          if(pattern[row*3 + col] !== color){
            win = false
            break inner
          }
        }
        if(win){
          return true
        }
      }
    }
    // col
    {
      for (let row = 0; row < 3; row++) {
        let win = true
        inner:
        for (let col = 0; col < 3; col++) {
          if(pattern[row + col*3] !== color){
            win = false
            break inner
          }
        }
        if(win){
          return true
        }
      }
    }
    // left oblique
    {
      let win = true
      for (let row = 0; row < 3; row++) {
        if(pattern[row*3 + row] !== color){
          win = false
        }
      }
      if(win){
        return true
      }
    }
    // right oblique
    {
     let win = true
     for (let row = 0; row < 3; row++) {
       if(pattern[row*3 + (2-row)] !== color){
         win = false
       }
     }
     if(win){
       return true
     }
    }
    return false
  }
  function willWin(pattern,color){
    for (let index = 0; index < pattern.length; index++) {
      if(pattern[index] !== 0){
        continue
      }
      let tmp = clone(pattern)
      tmp[index] = color
      if(checkWin(tmp, color)){
        return index
      }
    }
    return null   
  }
  // -1 输 0 和 1 赢
  function bestChoice(pattern, color){
    let p
    if(p = willWin(pattern, color)){
      return {
        result: 1,
        point: p,
      }
    }
    let result = -2
    let point = null
    for (let index = 0; index < pattern.length; index++) {
      if(pattern[index] !== 0){
        continue
      }
      let tmp = clone(pattern)
      tmp[index]=color
      let r = bestChoice(tmp, 3 - color).result
      if( -r > result) {
        result = -r
        point = index
      }
      // win-lost
      if(result === 1){
        break;
      }
    }
    return {
      result: point ? result : 0,
      point,
    }
  }
  show();
})();