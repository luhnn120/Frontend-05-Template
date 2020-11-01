function wildCard(source,pattern){
  let startCount = 0
  for (let index = 0; index < pattern.length; index++) {
    if(pattern[index] === '*'){
      startCount++
    }
  }
  // 边界条件
  if(startCount === 0){
    for (let index = 0; index < pattern.length; index++) {
      if(pattern[index] !== '?' && (pattern[index] !== source[index]) ){
        return false
      }
      return ;
    }
  }
  // 匹配第一个*号之前
  let i = 0;
  let lastIndex= 0;
  for (i = 0; pattern[i] != '*'; i++) {
    if(pattern[i] !== source[i] && pattern[i] !== '?'){
      return false
    }
  }
  lastIndex = i;
  // 若干个*pattern的匹配
  for(let p = 0; p < startCount - 1; p++){
    // 跳过*号
    i++;
    let subPatten = ''
    while(pattern[i]!= '*'){
      subPatten += pattern[i];
      i++;
    }
    // 匹配pattern
    let reg = new RegExp(subPatten.replace(/\?/g,"[\\s\\S]", "g"));
    // 指定正则开始位置
    reg.lastIndex = lastIndex
    if(!reg.exec(source)){
      return false
    }
    lastIndex = reg.lastIndex
  }
  // 匹配最后一个*号的剩余部分
  for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== "*"; j++){
    if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== '?'){
      return false
    }
    return true
  }
}

console.log(wildCard('abbabacccd', 'ab*xa*c?d'))