# Code Splitting

如何做：
1. 分离业务代码和第三方代码库
2. 按需加载（import）

1. 分离业务代码和第三方库

使用`CommonChunkPlugin`进行分离代码

采用自动化分离`vender`,

````javascript
new webpack.optimize.CommonChunkPlugin({
    name: 'vender',
    minChunk: ({resource}) => (
        resource && resource.indexOf('node_modules') >= 0 && 
        resource.match(/\.js$/)
    )
});
// 以上代码是将某些模块来自node_modules的并且名字是以.js结尾的文件都移入vendor chunk中，如果vendor hcunk不存在，就创建一个，
````

2. Dynamic Import

如果要实现按需加载路由组件时，设置chunk的名字即可：

````javascript
// router.js

const Emoij = () => import('component module path');

const Photos  = () => import('component module path')

//webpack配置
output: {
    chunkFilename:　'[name].chunk.js'
}
// 如果使用了babel
{
    "plugins": ['syntax-dynamic-import']
}
// 以上代码出现的问题，会加载两次共同文件，所以要使用一步flag

// webpack.config.js
new webpack.optimize.CommonsChunkPlugin({
  async: 'common-in-lazy',
  minChunks: ({ resource } = {}) => (
    resource &&
    resource.includes('node_modules') &&
    /axios/.test(resource)
  ),
}),

// 或者
new webpack.optimize.CommonsChunkPlugin({
  async: 'used-twice',
  minChunks: (module, count) => (
    count >= 2
  ),
})
// 在模块中找到引用2次的文件，放到used-chunk-twice文件中。
````