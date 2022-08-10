# webpack学习笔记

## 1 起步

1. npm install --save-dev webpack 开发模式
2. npm install --sav-dev webpack-cli 安装脚手架
3. npm init -y 创建配置文件 配置文件中修改 “main.js”为"private ":true,可以防止意外将代码暴露在生产环境
4. 创建工程文件 index.html,src/index.js,用index.js来给html添加结构，要把script放在body中，必须引入lodash包，这样就有两个script标签
5. 把index.html放到dist文件夹中，引入lodash包，在js文件中import，在body标签下直接引用main.js
6. 文件就可以实现用js添加html结构
7. 运行npx webpack 自动生成main.js和bundle.js
8. 创建webpack.config.js可以定义webpack的打包行为，例如定义入口文件entry，输出路径名称output等
9. 自定义打包语句：在package.json中修改script下的build：webpack，可以直接使用npm run build进行打包

## 2 管理资源

配置module规则rules

#### 加载css

css-loader和style-loader

```javascript
rules:[
    {
        test:/\.css$/,
        use:[
            'css-loader',
            'style-loader'
        ]
    }
]
```

#### 加载图片

file-loader,image-webpack-loader,url-loader,html-loader

```javascript
rules:[
	{
		test:/\.(png|jpg|svg|gif)$/,
        use:[
            file-loader,
            {
                loader:'image-webpack-loader',
                option:{
                    ...
                }
            },
            {
                loader:'url-loader',
                option:{
                	...
            	}
            }
        ]
	}
]
```

image-webpack-loader配置项

```javascript
mozjpeg: {
  progressive: true,
},
// optipng.enabled: false will disable optipng
//优化
optipng: {
  enabled: false,
},
//压缩
pngquant: {
  quality: [0.65, 0.90],
  speed: 4
},
gifsicle: {
  interlaced: false,
},
// the webp option will enable WEBP
webp: {
  quality: 75
}
```

#### 加载字体

file-loader、url-loader可以接受并加载任何类型的文件到构建目录

```javascript
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}
```

#### 加载数据

json,csv.tsv.xml nodejs可以内置处理json格式，其他的要用csv-loader、xml-loader处理

```javascript
{
    test:/\.(csv|tsv)$/,
    use:[
        'csv-loader'
    ]
},
{
    test:/\.xml$/,
    use:[
        'xml-loader'
    ]
}
```

## 3 管理输出

#### 操作

```javascript
entry: {
  app: './src/index.js',
  print: './src/print.js'
},
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist')
}
```

缺点：修改入口名再打包时，还是使用的原来的html结构

#### html-webpack-plugin

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugin:[
    new HtmlWebpackPlugin({
        title:'Output Management'
    })
]
```

#### clean-webpack-plugin

```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//require返回的是一个对象，要使用插件构造函数需要解构
plugins:[new CleanWebpackPlugin()]//构造函数没有传入文件名数组的参数 文档中有错误
```

Webpack通过Manifest管理实际生产用到的项目文件，通过使用 webpack-manifest-plugin，可以直接将数据提取到一个 json 文件，以供使用。

## 4 开发

#### source-map 增强调试过程

代码输出到一个js文件的时候，如果出现错误只会展示输出的文件报错，不能指出原始文件中有的具体错误，所以使用source-map来追踪错误

不同的应用场景会用到不同的source-map 查看[devtool](https://www.webpackjs.com/configuration/devtool)

```javascript
devtool: 'inline-source-map'
```

#### webpack自动编译代码

当代码，配置有更新时每次都要重新npm run build 就会很麻烦，以下是三种自动编译的设置

- ##### webpack's Watch Mode 观察者

```package.json
"scripts": {
  "watch": "webpack --watch"
 }
```

`npm run watch `   不会退出命令行  需要刷新浏览器

- ##### webpack-dev-server 创建一个简单服务器

```javascript
devServer: {
    contentBase: './dist'
}
```

```script 脚本
"start": "webpack-dev-server --open",
```

`npm start`   浏览器自动加载页面 默认打开8080端口

- ##### express 配合 webpack-dev-middleware

webpack-dev-server内部也用到了webpack-dev-middleware（把webpack处理后的文件打包给服务器）

```JavaScript
//config中配置公共路径
output:{
    publicPath:'/'
}
```

```javascript
//sever.js
const express = require('express')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const app = express()
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

```script运行脚本
"server": "node server.js",
```

