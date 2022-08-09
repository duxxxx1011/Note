# webpack学习笔记

## 起步

1. npm install --save-dev webpack 开发模式
2. npm install --sav-dev webpack-cli 安装脚手架
3. npm init -y 创建配置文件 配置文件中修改 “main.js”为"private ":true,可以防止意外将代码暴露在生产环境
4. 创建工程文件 index.html,src/index.js,用index.js来给html添加结构，要把script放在body中，必须引入lodash包，这样就有两个script标签
5. 把index.html放到dist文件夹中，引入lodash包，在js文件中import，在body标签下直接引用main.js
6. 文件就可以实现用js添加html结构
7. 运行npx webpack 自动生成main.js和bundle.js
8. 创建webpack.config.js可以定义webpack的打包行为，例如定义入口文件entry，输出路径名称output等
9. 自定义打包语句：在package.json中修改script下的build：webpack，可以直接使用npm run build进行打包