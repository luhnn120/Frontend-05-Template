// 未知pattern的匹配
function statemachine(source, pattern){
  // 创建回退表
  let table = new Array(pattern.length).fill(0);
  // i 遍历指针 j 重复指针
  let i = 1,j = 0;
  while(i < pattern.length){
    if(pattern[i] === pattern[j]){
      // 匹配成功
      // 记录在下一位元素上
      i++, j++;
      table[i] = j
    }else{
      if(j > 0){
        // 从重复位匹配
        j = table[j]
      }else{
        i++
      }
    }
  }
  // 生成状态函数
  const stateFun = []
  for (let i = 0; i < pattern.length; i++) {
    stateFun.push(function(char){
      if(char === pattern[i]){
        return stateFun[i+1]
      }else if( i === 0){
        return stateFun[0]
      }else{
        return stateFun[table[i]](char)
      }
    })
  }
  stateFun.push(end)
  let state = stateFun[0]
  for (const char of source) {
    state = state(char);
  }
  return state === end;
  function end(){
    return end
  }
}

console.log(statemachine('cadaabaaacad', 'aabaaac'))