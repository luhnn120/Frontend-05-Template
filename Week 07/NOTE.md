学习笔记
# Expression

## 运算符与语法树
  运算符的优先级会影响到语法树的生成，优先级高的运算符会形成子树

### 优先级
  优先级从上到下
#### Member
 * a.b
 * a[b]
 * foo`string`
 * super.b
 * super[b]
 * new.target
 * new Foo()

#### New
 new Foo

Example
  new a()(); Member的优先级更高,因此先执行new a(),对结果执行()
  new new a(); Member的优先级更高，因此先执行new a(),对结果执行new

#### Call
* foo()
* super()
* foo().a
* foo()[b]
* foo()`ab`
在call运算中的member运算和call运算一个优先级

#### left handside & right handside
Example
  a.b = c
  a+b = c
能放在赋值符号左边的都是left handside，否址是right handside

#### Update
* a++
* ++a
* a--
* --a

#### Unary
* delete
* void
* typeof
* +
* -
* ~
* ！
* await

####  Exponental
** 唯一一个右结合的运算符

Example:
  3 ** 2 ** 3 ==> 3 ** ( 2 ** 3) 

#### Multiplicative
* * / %

#### Additive
* + -

#### shift
* << >> >>>

##### Relationship
* <> <= >= instanceof in

##### Equality
* ==
* !=
* ===
* !==

##### Bitwise
* & ^ |

#### Logical
* &&
* ||

#### Conditional
* ?:

### 类型转换
* Number
Boolean
 0 转换成false 
 非0转换成true

* String
"" 转换成Boolean false

* undefinend
转换成Number NaN
转换成String 'Undefined'
转换成Boolean flase

* Null
转成Number 0
转成String 'null'
转换成Boolean false

* Object
转成Number valueOf
转成String valueOf toString
转换成Boolean true
除了Null和Undefinend外 其余类型转换成Object时都会进行Boxing操作

#### Unboxing
Object 转换成其他时都会存在Unboxing操作
1. 如果存在Symbool.toPrimitive,则一定会返回Symbol.toPrimitive的结果
2. toString vs valueOf，两者会根据使用的场景进行优先的选择。
   如果是类似 + 运算，则优先使用valueOf
   如果是类型 member运算，则优先使用toString

#### Boxing
* Number
  new Number()
  Number 直接调用返回一个值，new 调用返回一个Object
* String
  new String
* Boolean
  new Boolean
* Symbol 
  new Object(Symbol())
基础类型的member操作会自动进行Boxing操作

# Statemnet
## Grammmar
### 简单语句
  不会容纳其他语句
  * 表达式语句
  * 空语句
  * debugger语句
  * ThrowStatement
  * ContinueStatement
  * BreakStatement
  * ReturnStatement
### 复合语句
  * BlockStatement
  * IfStatement
  * SwitchStatement (不建议)
  * IterationStatement (循环语句)
  * WithStatement (不建议)
  * LabelStatement
  * TryStatement

### 声明
* function Declaration
* Generator Declaration
* Async Function Declaration
* Async Genrator Declaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration(let, const)

## Runtime
### Completion Record
 完成时记录，一种存在于JavaScript引擎中的特殊数据结构。用来记录语句是否有返回值，返回值是什么
 * [[type]] normal, break, continue,return,throw
 * [[value]] 
 * [[target]] label
### lexical environment
作用域为function body。同时相当于出现在函数首
* function
* function *
* async function
* async function*
* var

作用域为blockstatement body
* let
* const
* class

所有的声明都会有预处理机制，而const、let则是在声明前使用会抛错，但仍然会存在预处理

# JS执行粒度
* 宏任务
* 微任务（promise）
* 函数调用
* 语句/声明
* 表达式
* 直接量/变量/this

事件循环
  wait ==> get code ==> exectue ==> wait

# 函数调用
函数执行过程中使用的变量会保存在一个栈结构的执行上下文(execution context)中,栈顶元素叫做Running Execution context是我们当前执行的上下文环境

## Execution Context
* code evaluation state
  async generator 执行位置的保存信息
* funcion 
* script or module
* generator
  generator 运行时上下文
* realm
  所有内置对象
* lexical environment
  this,new.target,super,变量
* variable environment
  仅仅处理var声明

  ### Realm
  在一个js引擎实例里，所有的对象会被放到一个realm里