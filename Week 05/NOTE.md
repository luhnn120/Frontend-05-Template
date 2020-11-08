学习笔记
# proxy
会使对象操作变得不可预期性
对于函数、方法hooks的改写
# reactive
vue3.0中新的响应式系统
1. 检测发生改变的值
2. 跟踪改变值对应的方法
3. 触发方法更新结果
## 检测变化
  vue3.0中, 组件和实例data中的js对象，会遍历他所有的对象并通过带有getter和setter的handler将他们变成proxies。在handler中使用Reflect来做this的绑定
## 跟踪变化
  在getter通过tracker来设置一些我们想要的值，当发生变化时。这个过程被称为effect
## 触发方法
  在setter通过tirgger去触发
## effect
  在effect中先执行一遍callback函数来对涉及元素进行绑定。如果对象中存在嵌套对象的情况，通过在proxy中添加缓存来解决
## 应用
  数据和native的双向绑定。effect：数据 -> dom, 事件： dom -> 数据