学习笔记
# 编译原理
编程语言的一般规律：用一定的词法和语法来表达一定的语义，从而操作运行时
## 词法分析 lexical analysis
将字符串序列转换成标记（token）, token是源代码中的最小单位
## 语法分析 syntactic analysis
将输入文本转换成语法结构的一种过程
### BNF产生式
BNF产生式是一种常用的描述语法的系统
基本用法：语法结构分为终结符和非终结符
1. 终结符: 不可拆分的最小单位
2. 非终结符: 由非终结符组合而成的复合结构
3. | 表示或
4. * 表示重复
5. + 表示至少一次
6. ::= 表示被定义
7. <> 必选内容
8. [] 可选内容
9. {} 重复内容

## 正则
lastIndex
1. lastIndex是regexp的一个特殊属性用来表明下一次匹配的开始位置。只有在/g和/y的正则匹配中才会配设置
2. 如果lastIndex的长度大于字符串的长度，test()和exec()会报错，同时lastIndex被重置为0
3. 如果lastIndex的长度小于或者等于字符串长度,如果匹配的是空字符串，下一次匹配会从lastIndex处开始
4. 如果lastIndex的长度等于字符串长度且匹配的不是空字符串，会略过这次匹配，并将last重置为0
5. 否则lastIndex会被设置为匹配的下一个位置

## LL算法
  从左到右扫描，从左到右规约

## 四则运算
### Token
number、whitespace、lineterminator、+、-、*、/

### 语法定义
加法由左右两个乘法组成、可以左右连加
乘法运算： 只有一个数字

整个四则运算表示可以看作是一个加法表达式加EOF(end of file 文档终结符)
<Expression> ::= 
  <AdditiveExpression><EOF>

加法表达式是一个非终结符，可以是一个单独的乘法表达式。也可以是一个加法表达式加+、-和一个乘法表达式，
这么表达的方法是一种通过递归方法来处理无限列表的常用手段，通过递归不断地解析非终结符。
<AdditiveExpression> ::=
<MultiplicativeExpression>
|<AdditiveExpression><+><MultiplicativeExpression>
|<AdditiveExpression><-><MultiplicativeExpression>

乘法表达式是一个终结符。可以是一个数字，也可以是一个乘法表达式加*、/符合和一个数字
<MultiplicativeExpression> ::=
<Number>
| <MultiplicativeExpression><*><Number>
| <MultiplicativeExpression></><Number>


