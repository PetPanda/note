# webpack使用

1. extract-text-webpack-plugin 插件：将样式抽取成独立的文件
````javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}
````

2. __dirname __filename 都是绝对路径  
````javascript
const path = require('path');
const root = path.resolve(__dirname,'..'); // 项目的根目录的绝对路径

module.exports = {
    entry: path.join(root,'src/main.js'),
    output: {
        path: path.join(root,'dist'),
        filename: 'main.js'
        }
}
````

3. 配置适配vue处理

````javascript
//只做参考使用， 是基于webpack一来使用的
const path = require('path')
const root = path.resolve(__dirname, '..') // 项目的根目录绝对路径

module.exports = {
  entry: path.join(root, 'src/main.js'),  // 入口文件路径
  output: {
    path: path.join(root, 'dist'),  // 出口目录
    filename: 'main.js'  // 出口文件名
  },
  resolve: {
    alias: { // 配置目录别名
      // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
      components: path.join(root, 'src/components'),
      views: path.join(root, 'src/views'),
      styles: path.join(root, 'src/styles'),
      store: path.join(root, 'src/store')
    },
    extensions: ['', '.js', '.vue'], // 引用js和vue文件可以省略后缀名
    fallback: [path.join(root, 'node_modules')] // 找不到的模块会尝试在这个数组的目录里面再寻找
  },
  resolveLoader: {
    fallback: [path.join(root, 'node_modules')] // 找不到的loader模块会尝试在这个数组的目录里面再寻找
  },
  module: { // 配置loader
    loaders: [
      {test: /\.vue$/, loader: 'vue'}, // 所有.vue结尾的文件，使用vue-loader
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/} // .js文件使用babel-loader，切记排除node_modules目录
    ]
  }
}
```

 在根目录下添加.babelrc文件，用于配置babel
 ````json
 {
     "presets":  ["es2015"]
 }
 ````

````javascript
//dev.js的配置使用
module.exports = merge(baseConfig,{
    entry: [
        'webpack/hot/dev-server', //热替换处理入口文件
        path.join(root,'src/index.js')
    ],
    devServer: {
        historyApiFallback: true, //404页面跳转到的页面
        inline: true, //文件改变自动刷新页面
        progress: true, //显示编译进度
        colors: true, //使用颜色输出
        port: 3000 //服务器端口
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //添加热替换插件
        new HtmlWebpackPlugin({
            template: path.join(root,'index.html'), //模板文件
            inject: 'body' //js的script注入到body底部
        })
    ],
    devtool: "source-map" //用于编译后的文件和编译前的文件对应位置，便于调试
});
````


## webpack实现

### 概念

1. 入口
````javascript
entry: {
  main: './src/main.js',
  vendors: './src/vendors.js' //公共库入口， 方便使用CommonChunkPlugin抽取公共模块
}
````

2. 输出 output

* filename: 文件名，一般使用：bundle.js || main.js || index.js
  * 单个入口：
  ````javascript
  output: {
    filename: 'bundle.js',
    path:　__dirname + '/bundle'
  }
  ````
  * 多入口：
  ````javascript
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  }
  ````
* 可用选项：
  * chunkfilename:非入口的文件名，相当于path路径
  * crossOriginLoading:启用跨域加载  选项：`false 禁止启用跨域；anonymous 启用跨域加载，发送不带凭据的请求；use-credentials 启用跨域请求，发送带凭证的请求`
  * path：导出目录绝对路径（必选项）

3. 插件 在plugins传入new 关键字

4. 配置(configuration)


## 使用指南

1. 代码分割-css（使用ExtractTextWebpackPlugin）

````javascript
//将css独立导出到页面
module: {
  rules: [
    {
      test: /\.css$/,
      use: 'css-loader',
      use: ExtractTextWebpackPlugin({use: 'css-loader'})
    }
  ]
},
plugins: [
  new ExtractTextWebpackPlugin('style.css')
];
````

2. 代码分割-Libraries

将第三方代码和应用代码分离打包  使用到插件CommonsChunkPlugin 以及moment `npm i moment CommonsChunkPlugin --save`
````javascript
//在index.js 文件中使用
var moment = require('moment');
//webpack.config.js中使用---
return:{
  entry:　{
    index:'./index.js',
    vendor: 'moment'
  },
  output: {
    filename: '[chunkhash].[name].js', //为文件设置一个唯一hash值
    path: path.resolve(__dirname,'/dist')
  },
  plugins: [
    new webpack.optimize.CommonChunckPlugin({
      name: 'vendor'
    })
  ]
}

````

3. 代码拆分-require.ensure

4. 生产环境构建

* js文件压缩
````javascript
//使用UglifyJsPlugin
plugins: [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: options.devtool &&   (options.devtool.indexOf('sourceMap') >= 0 || options.devtool.indexOf('source-map') >= 0)
  })
]
````


