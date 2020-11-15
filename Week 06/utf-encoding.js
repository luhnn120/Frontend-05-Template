// 获取字符后者汉字的 UTF8 2进制编码
// 1字节 0xxxxxxx 
// 2字节 110xxxxx 10xxxxxx 
// 3字节 1110xxxx 10xxxxxx 10xxxxxx 
// 4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 
// 5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 
// 6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 
function utf8Encoding(char){
  if(!char) return null
  // 获取二进制码
  let binaryArr = []
  let charCode = char.codePointAt().toString(2)
  // 单子节
  if(charCode.length < 8){
    binaryArr.push(charCode.padStart(8,0))
    return binaryArr;
  }
  while(charCode.length > 6){
    // 每六位 补控制位10
    binaryArr.unshift(`10${charCode.substr(charCode.length-6)}`);
    charCode = charCode.substr(0, charCode.length-6);
  }
  // 补充首位控制位 1***10 
  charCode = '10'+charCode
  binaryArr.unshift(charCode.padStart(8,1))
  return binaryArr
}

console.log(utf8Encoding('一'))