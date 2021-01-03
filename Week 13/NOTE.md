学习笔记
# html定义
  html源于XML和SGML（数据定义语言，XML也是SGML的一个子集）。在html5之前的版本，html都是作为XML和SGML的子集，而HTML5之后则是借鉴了XML和SGML的语法。
## html DTD
  html5之前DTD中可借鉴的东西不太多，只有写特殊字符的定义
* &nbsp 空格，会链接前后两个字符，影响分词
* &quot "
* &amp &符
* &lt < 
* &gt >

# 语法
* Element: <tagname>...</tagname>
* Text: text
* Comment: <!--comments-->
* DocumentType: <!Doctype html>
* ProcessingInstruction: <?a 1?>
  预处理文本，不推荐使用。这里的第一个空格表示分割，意思是把1这个参数传递给a这个process
* CDATA： <![CDATA( )]>
  另一种文本节点，不会进行转义

# 浏览器API
## DOM
### 节点
Node：
  * Element
    * HtmlElement
    * SVGElement
    * MathMLElement
  * Document
  * characterData
    * Text： 文本节点
    * Comment： 注释
    * ProcessingInstruction
  * DocumentFragment: 文本片段
  * DocumentType
高级操作
  compareDocumentPosition 用于比较两个节点关系的函数
  contains 检查一个节点是否包另一个节点函数
  isEqualNode 检查两个节点是否完全相同
  cloneNode 复制一个节点
### 事件
  冒泡与捕获
### range
  更精准的操作DOM，效果更好
  range获取DOM。fragment操作dom
### cssom
  document.styleSheets
**Rules**
  * document.styleSheets[0].cssRules
  * document.styleSheets[0].insertRule("p {color:pink;}",0)
  * document.styleSheets[0].removeRule(0)
  * getComputedStyle: 能获得最终渲染的属性，以及伪元素
**CSS OM View**
* window
  * innerHeight、innerWidth（实际渲染区域）
  * outWidht、outerHeight（窗口总空间）
  * devicePixelRatio（物理像素与逻辑像素比值）
  * screen （屏幕属性）
* scroll
* layout
  * getClientRects()
  * getBoundingClientRect()
## BOM
## API
* khronos
  * WebGL
* ECMA
  * ECMAScript
* WHATWG
  * HTML
* W3C
  * webaudio
  * CG/WG