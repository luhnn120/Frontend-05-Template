学习笔记
# 语法分类
1. 非形式语言
  中文、英文
2. 形式语言（乔姆斯基谱系）
  1. 0型 无限制文法
  2. 1型 上下文相关语法
  3. 2型 上下文无相关语法
  4. 3型 正则语法
向上包含的关系

# 产生式（BNF）
BNF产生式是一种常用的描述语法的系统
基本用法：语法结构分为终结符和非终结符
1. 终结符: 不可拆分的最小单位
2. 非终结符: 由非终结符组合而成的复合结构
3. | 表示或
4. * 表示重复
5. + 表示至少一次
6. ::= 表示被定义
7. <> 必选内容 语法结构名
8. [] 可选内容
9. {} 重复内容

## 带括号的四则运算表达式
1*2+3/(5-4) 

<Expression> ::=
<BracketExpression><EOF>

<BracketExpression> ::=
<AdditiveExpression> |
<(><AdditiveExpression><)>

<AdditiveExpression> ::=
<BracketExpression> |
<MultiplicativeExpression>
|<AdditiveExpression><+><MultiplicativeExpression>
|<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression> ::=
<Number>
| <MultiplicativeExpression><*><Number>
| <MultiplicativeExpression></><Number>

# 语言分类
形式语言-用途
1. 数据描述语言
  json、html、xaml、sql、css
2. 编程语言
  c、Java、py、ruby、perl、lisp、js

形式语言-表达方式
声明式 -- 结果
json、html、sql、css、Lisp、Clojure、Haskell
命名式-- 步骤
c、c++、java、py、

# 图灵完备性
命令式-- 图灵机
  goto
  if和while
声明式-- lambda
  递归
# 动态和静态
动态:
  在用户的设备/在线服务器
  产品实际运行时
  Runtime
静态
  在程序员的设备
  产品开法时
  Compiletime

# 类型系统
动态类型系统和静态类型系统
强类型与弱类型
复合类型
子类型
泛型

# 一般命令式编程语言
1. Atom 
  定义 直接量
2. Expression
  Atom+操作符
3. statement
  expression + 关键字
4. Structure
  Function Class Namespace
5. Program
  program module package library

  语法 ==语义==> 运行时 

## Atom
### Grammar
 Literal
 Variable
 Keywords
 whitspace
 lin Terminator

 ### Runtime
  types
  Exection context

八种基本类型
Number、string、Boolean、null、undefined、Symbol、Object、BigInt(在途)

### Number
double float
1 符合位
11 指数位
52 精度位

### String
ASCII --127字符
Unicode
GB

### Null & Undefined
undefined 能赋值 用void 0 代替

### Object
state、indentifier、behavior

#### Object in Js
indentifier： 内存地址

js中得属性是kv对
k：string、symbol
v：data、accessor
数据属性描述状态
访问器属性描述行为