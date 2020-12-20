学习笔记
# flex布局
* flex-direction: row
  * main: width x left right
  * cross: height y top bottom
* flex-direction: column
  * main: height y top bottom
  * cross widht x left right

拆分成主轴和交叉轴，对宽高等属性去做抽象，是为了后续内容的统一处理
* 布局的处理要等到所有的子元素处理结束后，因此在endTag中进行处理

## 元素入行
  * 根据主轴的尺寸对元素进行分行
  * no-warp元素放入一行
  