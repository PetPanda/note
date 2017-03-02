# Nodejs教程————阮一峰

#### Assert模块

1. 简述：用于断言，如果表达式不符合预期，就会抛出一个错误。
2. 使用：接受两个参数，当第一个参数为true时，不会有任何提示，返回undefined;当第一个参数为false时，会抛出一个错误，错误的提示信息就是第二个参数设定的字符。
````javascript
var assert = require('assert');
assert(value,message);
````
3. 方法：
    * assert.equal();第一个是实际值，第二个是预期值，第三个是错误提示信息。

####  Buffer对象

1. 概述：处理二进制接口，是全局对象，可以直接使用，不用进行require。
````javascript
var bytes = new Buffer(34);
````

#### Child Process模块

1. 创建子进程。子进程运行结果存在系统缓存中，等子进程运行结束以后，主进程再使用回调函数读取子进程的运行结果。
2. 方法：
    * exec();执行bash命令，参数：命令字符串
    ````javascript
    var exec = require('child_process').exec'
    var ls = exec('ls -l',function(error,stdout,stderr){
        if(error){
            console.log(error.stack);
        }
    });
    ````

#### express框架

1. 运行原理：
    * 底层： http模块 >>>>>> express框架是在http模块之上，加了一个中间件。
    * 中间件：处理HTTP请求的函数，特点：一个中间件处理完，传递给下一个中间件。
    * use方法：express注册中间件的方法。
    ````javascript
    var express =  require('express');
    var http = require('http');
    var app = express();
    //使用use方法注册了两个中间件，收到http请求之后，先调用第一个中间件，然后通过next方法，将执行权传递给第二个中间件，若果没有next，则不再向下传递执行。
    app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
    });
    app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!\n");
    });
    http.createServer(app).listen(1337);
    ````
2. 方法：
    * all方法：所有请求都经过该中间件。内部使用next方法。
    * HTTP动词：get、post、put、delete
    * set方法：用于指定变量的值
    * response对象：
        * response.redirect:网址重定向
        * response.sendFile 用于发送文件 `response.sendFile("/path/to/amin.mp4")`;
        * response.render 渲染网页模板。`response.render("index",{message:"Hello world"})` 将message变量传入index模板
    * request对象：
        * request.ip 获取HTTP请求的ip
        * request.files 获取上传的文件。
    * **搭建HTTPs服务器**
    ````javascript
    var fs = require('fs');
    var options = {
        key: fs.readeFileSync("E:/ssl/myserver.key");
        cert: fs.readFileSync('E:/ssl/myserver.crt'),
        passphrase: '1234'
        };
        var https = require('https');
        var express = require('express');
        var app = express();
        app.get('/', function(req, res){
        res.send('Hello World Expressjs');
        });
        var server = https.createServer(options, app);
        server.listen(8084);
        console.log('Server is running on port 8084');
    ````

#### fs模块

1. 简介：提供本地文件的读写能力，可以对本地文件进行操作。

2. 方法：
    * readFile()用于异步读取数据，参数一：文件的路径；参数二：读取完成之后的回调函数。
    * readFileSync()同步读取文件， 返回字符串。参数一：文件路径，参数二：表示配置的对象，也可以是表示文本文件编码的字符串。
    * writeFile()异步写入文件。参数一：文件路径；参二：写入的字符串；参数三：回调函数
    * writeFileSync()同步写入文件 参数一：文件路径；参数二：文件字符串；参数三：文件编码，默认utf8
    * exists(path,callback);判断指定路径是否存在。
    * mkdir()用于新建目录；1.目录名；2.权限值；3.回调函数
    * writeFile();写入文件，1.文件路径以及文件名；2.文件内容；3.callback;  readFile()读取文件，1.文件名；2.文件编码；3.callback
    * readdir() 读取目录，返回一个所包含的文件和子目录的数组。
    * watchfile()监听文件，若文件发生变化，会自动触发回调函数。

##### http模块

1. 基本用法：
    * 处理GET请求
    * request 对象：属性：url发出请求的网址；method:HTTP请求的方法；headers：HTTP所请求的所有HTTP头信息。
    * 处理异步操作：遇到异步操作时，会先处理后面的请求。

#### koa框架

1. Kao应用： 一个koa应用就是一个对象，包含middleware数组。

2. 中间件：对HTTP请求处理的函数，但必须是一个 Generator函数。属于层层调用， 上游中间件必须等到下游中间件返回结果，才回继续执行。
    * Generator函数内部使用yield命令，将程序的执行权交给下一个中间件，即：yield next，要等到下一个中间件返回结果，才会继续执行。
    * 只要有一个中间件缺少yield next语句，后面的中间件都不会执行。
    * 如果想跳过一个中间件，可以直接在该中间件的第一行语句上写上 `return yield next`；
    * Koa要求，中间件的唯一参数就是next。

3. 多个中间件的合并
    * 由于中间件的参数统一为next，因此可以使用`.call(this,next)` 将多个中间件进行合并。
    ````javascript
    function *random(next) {
        if ('/random' == this.path) {
            this.body = Math.floor(Math.random()*10);
        } else {
            yield next;
        }
    };
    function *backwards(next) {
        if ('/backwards' == this.path) {
            this.body = 'sdrawkcab';
        } else {
            yield next;
        }
    }
    function *pi(next) {
        if ('/pi' == this.path) {
            this.body = String(Math.PI);
        } else {
            yield next;
        }
    }
    function *all(next) {
      yield random.call(this, backwards.call(this, pi.call(this, next)));
    }
    app.use(all);
    ````

4. 路由：可以通过this.path属性， 判断用户请求的路径，从而起到路由的作用。复杂路由可以使用koa-router插件。

5. koa-router插件提供一系列动词：他们的参数：参数一：路径模式；参数er: 对应控制器方法(中间件)；
    * router.get()
    * router.post();
    * router.pull();
    * router.del();
    *router.patch();
    注意：路径匹配的时候，不会把查询字符串考虑在内，比如：`/index?param=xyz` 匹配路径：`/index`;
6. context对象：中间件中的this表示上下文对象context,代表一次HTTP请求和回应。context封装了request和response对象，每次HTTP请求，就会创建一个新的context对象。
    

