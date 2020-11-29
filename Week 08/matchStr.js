// 状态机匹配
// abcabx
// ababababx
function match(str){
  let state = start;
  for (const char of str) {
    state = state(char)
  }
  return state === end;
}


function end(){
  return end;
}

function start(c){
  if(c === 'a'){
    return foundA;
  }else{
    return start;
  }
}

function foundA(c) {
  if(c === 'b'){
    return fountB
  }else{
    return start(c)
  }
}

function fountB(c) {
  if(c === 'c'){
    return fountC;
  }else{
    return start(c)
  }
}

function fountC(c) {
  if(c === 'a'){
    return fountA2
  }else{
    return start(c)
  }
}

function fountA2(c) {
  if(c === 'b'){
    return fountB2
  }else{
    return start(c)
  }
}

function fountB2(c) {
  if(c === 'x'){
    return end;
  }else{
    return fountB(c)
  }
}