学习笔记
# 手势与动画
## 帧
60帧 人眼一秒内识别最高频率。因此 16ms处理一帧动作
* setInterval 不推荐，因为不可控。可能会发生积压的情况
* setTimeout
* requestAnimationFrame 浏览器执行下一帧时处理代码
## 属性动画 & 帧动画
属性动画： 改变对象的某种属性
帧动画： 每秒替换图片
## 时间线和动画创建
时间线： 作为所有动画播放的进度控制
* 开始
* 暂停、恢复
* 添加动画
动画： 以属性动画的形式，创建动画
* tick 某一帧时状态
## 时间线延迟
针对不同时间加入时间线动画的处理。在动画加入时间线时记录时间。在时间线的tick中，如果时间线开始时间小于动画加入时间，则动画展示的开始阶段从动画加入时间开始计算，而不是时间线开始时间
## 暂停和恢复
通过handler记录时间线上的requestAnimation，暂停时解除handler同时记录暂停开始时间。恢复时创建handler，同时累加暂停时间。同时动画播放时间中减去暂停时间部分。
## 功能补全
delay， reset，timeFun
## 状态管理
通过state 来记录每个操作的状态，同时根据状态来进行异常操作的处理

# 手势
*  手势操作的touch: start move end事件和鼠标click: down move up事件，统一看成start、move、end三个阶段
  * touchstart事件一定会触发touchmove事件，event有多个触点
  * touch事件中会有一个identifiy的标识符去标记
* tap：点击
* pan：移动
  * 触发pan状态的条件移动10px，指Retina屏幕真实像素。
  * 如果是其他情况，根据dpr进行换算
* flick：滑、扫
* press：长按
## 手势状态管理
1. tap：默认事件，通过其他状态中改变其状态
2. pan： move事件中通过移动的记录改变状态，注意这是一个一次性的状态改变
3. press： start事件中增加定时器，在定时器中改变其状态。其他状态改变时需要clear定时器
4. flick
## 手势识别
处理鼠标左右键和多指操作时的事件识别。主要处理是将start、move、end事件中的状态，从全局转移到具体事件对应context中
### 多指操作
  touch事件中存在identified，通过identified来标记对应的context
### 鼠标操作
鼠标操作中我们可以在mouse down时，通过event.button来记录按下的鼠标。但需要注意的是mouse move时并没有这个属性（因为移动事件和鼠标按下并没有关联），因此在mouse move时通过event buttons来获取所有已按下的按键（buttons中的记录是以掩码的形式，因此需要通过位运算来进行筛选。同时中键和右键的顺序与mouse down中的顺序相反）。最后要对事件绑定做特殊的处理，不能对move和up事件进行重复绑定，同时解除绑定的原则遵循up事件时无任何键被按下。