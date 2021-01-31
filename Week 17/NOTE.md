学习笔记
# 工具链
## yeoman
  yeoman是一个生成脚手架工的脚手架工具
  1. 全局安装yeoman
    ``` npm install -g yo ```
  2. 安装yeo-generator
  ``` npm install --save yeoman-generator ```
  3. 创建项目，项目名必须以generator开始
  4. 创建项目结构
    /generator/app/index.js
  5. 启动项目前需要通过```npm link```关联全局的yo
  6. 启动项目
    ``` yo 项目名 ```
### 常用功能
* 输入输出
  * 输出 ```this.log```
  * 输入 ```this.prompt```
* 文件系统
  我们可以通过template指定模板生成指定文件
* 依赖管理
  我们可以生成指定的packjson文件，同时也可以执行npm指令安装以来

## vue generator
  1. 通过prompt来获取项目名
  2. 生成packageJson文件
  3. 安装vue、webpack、vue-loader
  4. 导入vue、main.js、webpack.config.js等模板文件