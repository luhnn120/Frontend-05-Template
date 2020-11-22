function numberToString(num,radix){
  function changeFormat(val){
    let formatList = '0123456789ABCDEF'
    return formatList[val]
  }
  // 类型校验
  if(typeof num !== 'number' || Number.isNaN(num)){
    return 'not number';
  }
  // Number 转换num为十进制
  num = Number(num);
  radix = Number(radix);
  if(radix === 10){
    return num;
  }
  // 符号位
  let sign = num >= 0 ? '' : '-';
  num = Math.abs(num);
  // 整数位
  let intger = Number.parseInt(num);
  // 小数位
  let fixed = num - intger;
  let result = intger === 0 ? '0' : '';
  // 整数位转换
  // 整数位对radix取余作为结果，同时整数位不断整除radix,整除位为0
  while(intger !== 0 ){
    result = changeFormat(intger % radix) + result
    intger = Number.parseInt(intger / radix)
  }
  // 小数位转换
  // 小数位乘以radix 取结果的整数位。直到小数部分全为0
  if(fixed > 0){
    result += '.'
    while(fixed !== 0 ){
      let multiResult = fixed * radix
      let intger = Number.parseInt(multiResult)
      fixed = multiResult - intger
      result += changeFormat(intger)
    }
  }
  switch (radix) {
    case 2:
      return `${sign}0b${result}`
    case 8:
      return `${sign}0o${result}`
    case 16:
      return `${sign}0x${result}`
    default:
      return 'Invalid Radix'
  }
}

console.log(numberToString(0,2))
console.log(numberToString(-6,2))
console.log(numberToString(254,16))
console.log(numberToString(254.326,16))
console.log(numberToString(-10,2))
console.log(numberToString(-0xff,2))