学习笔记
# 单元测试
## mocha
解决mocha无法支持export语法
1. 安装babel/core、babel/register、babel/preset-env
2. 配置.babelrc
3. 通过mocha --require @babel/register 来启动测试

# code coverage
nyc
## nyc 兼容babel
1. 安装依赖babel-plugin-istanbul、@istanbuljs/nyc-config-babel
2. 配置babel plugin
3. 配置nyc的extends

# html-parser test
## mocha debug
windows 环境下debug配置中使用.bin目录可能会出现无法到达的情况，此时
```
  "program": "${workspaceFolder}\\node_modules\\mocha\\bin\\mocha"
```