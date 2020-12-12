学习笔记
# 浏览器原理
浏览器目标 从url到bitmap（本质是一个图片, 图片通过操作系统和显卡最终呈现给用户）
url（http）=> html(parse) => Dom（Css computing）=> Dom with css(layout) => Dom with position(render) => bitmap
* url通过http请求,从服务器获取资源
* html文件通过浏览器引擎的语法解析生产Dom树
* Dom树与css样式结合
* 生产CSS盒模型和布局
* Dom元素渲染
* 页面转换成bitmap

# 状态机
  有限状态机处理字符串(没有无限状态机)
  状态机的关键不在于状态而在于 **机** 上，每一个状态都是一个机器。机器之间相互的解耦，每一个机器都可以进行计算、存储、输出……
这样我们就不用去关心所有状态的内容处理。
  所有的状态机的输入应该都是一致的，同时状态机本身应该是无状态的。从函数的角度来看，它应该是纯函数。这里它可以接受输入，也可以对外输出。但执行过程中
绝不可以调用外界的内容。
**每个状态机的下一个状态都要是明确的**
* 不根据输入,明确知道下一个状态的叫做Moore
* 根据输入来决定下一个状态的叫Mealy

# 网络知识
## ISO-OSI 七层模型
* 应用
* 表示
* 会话
  * 上三层属于Http协议相关的内容，对应require("http")
* 传输
  * 属于TCP UDP协议的内容，对应require("net")
* 网络层
  * 属于Internet协议内容
* 数据链路
* 物理层
  * 下二层属于4G/5G/wifi内容

## TCP
TCP和UDP协议中数据以流的形式。**端口**是TCP中的重要内容，网卡通过端口将数据分发到各个应用

## IP
ip协议中数据以包的形式，通过IP地址分发内容。在node中没有直接对应的模块，需要使用C++的底层实现libnet/libcap

## HTTP
  http协议是文本型的协议，数据是以字符串的形式存在

# 实现
* 设计HTTP请求类
* options处理
  * content-type的处理
  * 不同content-type,body的处理
  * content-length的处理
* send函数
  * send是一个异步的过程，返回一个promise
  * 文本类型的response通过parser去解析
  * 发布请求，支持已有connection或者新建connection
  * 结束状态由parser的状态判断
* ResponseParser
  * Response需要分段去解析，所以我们需要一个parser来进行装配
  * 通过状态机来分段拆分文本
* BodyParser
  * Response的body更具content-type有多种不同的结构，因此采用子parser的形式
  * 同样使用状态机来处理body
