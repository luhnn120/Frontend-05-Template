/**
* @Description: LL四则运算
* @Author: luhan
* @Date: 2020/10/18 15:33:26
* @todo:
* @param:{参数类型} 参数名 参数说明 
* @return: {返回值类型} 返回值 说明
*/
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
const dictionary = ['Number','WhiteSpace','LineTerminator','+','-','*','/']
function* tokenize(source){
  let result = null
  while(true){
    // 上次匹配位置
    const lastIndex = regexp.lastIndex
    result = regexp.exec(source)
    if(!result){
      break
    }
    // 匹配未知字符
    if(regexp.lastIndex - lastIndex > result[0].length){
      throw new Error(`unknown token ${source.substring(lastIndex, regexp.lastIndex)}`)
    }
    for (let index = 1; index <= dictionary.length; index++) {
      if(result[index]){
        yield {
          type: dictionary[index - 1],
          value: result[0]
        }
      }
    }
  }
  yield {
    type: 'EOF'
  }
}

function Expression(tokens){
  if(tokens[0].type === 'AdditiveExpression' && tokens[1] && tokens[1].type === 'EOF'){
    let node = {
      type: 'Expression',
      children: [tokens.shift(), tokens.shift()]
    }
    tokens.unshift(node)
    return node
  }
  AdditiveExpression(tokens)
  return Expression(tokens)
}
function AdditiveExpression(source){
  // <Multiplicative>
  if(source[0].type === 'Multiplicative') {
    let node = {
      type: 'AdditiveExpression',
      children: [source[0]]
    }
    source[0] = node
    return AdditiveExpression(source)
  }
  // <AdditiveExpression><+><MultiplicativeExpression> <AdditiveExpression><-><MultiplicativeExpression>
  if(source[0].type === 'AdditiveExpression' && (source[1].type === '+') || (source[1].type === '-')){
    let node = {
      type: 'AdditiveExpression',
      operator: source[1].type,
      children: []
    }
    node.children.unshift(source.shift())
    node.children.unshift(source.shift())
    // 将这里的number或者连乘转换成 MultiplicativeExpression
    MultiplicativeExpression(source)
    node.children.unshift(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }
  if(source[0].type === 'AdditiveExpression'){
    return source[0]
  }
  // 首次执行将Number处理成MultiplicativeExpression
  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}
function MultiplicativeExpression(source){
  // <Number>
  if(source[0].type === 'Number'){
    let node = {
      type: 'Multiplicative',
      children: [source[0]]
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }
  // <MutiplicativeExpression><*><Number> <MutiplicativeExpression></><Number>
  if(source[0].type === 'Multiplicative' && (source[1].type === '*') || (source[1].type === '/')){
    let node = {
      type: 'Multiplicative',
      operator: source[1].type,
      children: []
    }
    node.children.unshift(source.shift())
    node.children.unshift(source.shift())
    node.children.unshift(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }
  if(source[0].type === 'Multiplicative'){
    return source[0]
  }
  throw new Error('MultiplicativeExpression Fail Parse')
}

let source = []
for (const token of tokenize('1024+10*25/24-22*3')) {
  source.push(token)
}
console.log(Expression(source))
