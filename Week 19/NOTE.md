学习笔记
# 发布系统
1. 线上服务系统
2. 发布系统
3. 发布工具
## 线上服务系统
1. 服务器安装node环境
2. 本地通过express-generator来搭建express服务
   ```npx express-generator```
3. 通过scp指令将本地express文件复制到服务器上
  ```scp -P port file server-name@server-ip:/file-path```
4. 服务器启动express服务

## 流
1. 可读流
   1. event：data
   2. event： close