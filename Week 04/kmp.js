function kmp(source, pattern){
  let table = new Array(pattern.length).fill(0);
  // i 遍历指针 j 重复指针
  {
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
  }
  {
    let i= 0, j = 0;
    while(i < source.length){
      if(source[i] === pattern[j]){
        i++, j++;
      }else{
        if(j > 0){
          j = table[j];
        }else{
          i++;
        }
      }
      if(j === pattern.length){
        return true;
      }
    }
    return false;
  }
};
console.log(kmp("helxlo", "ll"))