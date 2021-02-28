学习笔记
# 持续继承
* daily build：每天全局build一次，是否可以build成功
* BVT：build verification test，构建的验证测试，属于一种冒烟测试，测试case一般都是最基本最简单的case，对build成功之后的结果进行一个基本的验证
# git hook
持续继承中通常使用pre-commit和pre-push两个hook函数来进行提交前校验
客户端检查的模式没有强制性，不能保证提交一定准确。更好的选择是web hook在服务端进行提交校验
# 无头浏览器
chrome headless
