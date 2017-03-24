# koa学习

1. 关于中间件代码执行顺序

````javascript
var koa = require('koa');
var app = koa();

app.use(function* f1(next) {
  console.log('f1: pre next');
  yield next;
  console.log('f1: post next');
  yield next;
  console.log('f1: fuck');
});

app.use(function* f2(next) {
  console.log('  f2: pre next');
  yield next;
  console.log('  f2: post next');
  yield next;
  console.log('  f2: fuck');
});

app.use(function* f3(next) {
  console.log('  f3: pre next');
  yield next;
  console.log('  f3: post next');
  yield next;
  console.log('  f3: fuck');
});

app.use(function* (next) {
  console.log('hello world')
  this.body = 'hello world';
});


app.listen(3000);
//一次打印是
f1: pre next
  f2: pre next
  f3: pre next
hello world
  f3: post next
  f3: fuck
  f2: post next
  f2: fuck
f1: post next
f1: fuck

//基本实现逻辑是：第一个中间件代码执行一半停下了，然后执行第二个中间件；第二个中间件执行一半停下，执行第三个中间件；。。。。然后，第一个中间件等待第二个中间件执行，第二个中间件等待第三个中间件，，，，第三个中间件全部执行完毕，第二个中间件继续执行后面的代码，第二个中间件代码全部执行完毕，执行第一个中间件代码，完后结束。

//等价于
new Promise(function(resolve, reject) {
  // 我是中间件1
  yield new Promise(function(resolve, reject) {
    // 我是中间件2
    yield new Promise(function(resolve, reject) {
      // 我是中间件3
      yield new Promise(function(resolve, reject) {
        // 我是body
      });
      // 我是中间件3
    });
    // 我是中间件2
  });
  // 我是中间件1
});
//这才是核心思想
````

2. 常用方法
    * app.listen();快速启动一个服务的快速方法。 app.listen()是http.createServer的简单包装，实际可以这样运行. `http.createServer(app.callback()).listen(300)`
    * app.callback()返回一个可以http.createServer()接受的程序实例
    * app.use(function) 将给定的function当做中间件加载到应用当中
    * app.keys= 设置一个签名的Cookie秘钥

3. 错误处理：
    自定义【错误事件】来监听Koa app中的错误：
````javascript
app.on('error',function(error){
    log.error('server error',error);
});
````

4.应用上下文：Context
  Koa的上下文封装了request和response对象至一个对象之中，可以使用ctx.resqust和ctx.response中访问这些方法
  每一个请求都会创建一个上下文，在控制业务逻辑的中间件中，上下文被寄存在this中
  ````javascript
  app.use(function *(){
    this; // this上下文对象
    this.resquest; //Request对象
    this.response; //Response对象
  });
  ````

