# HTTP

## 



## webSocket

### 客户端：
  
1. 建立连接和断开连接

涉及事件：
    * open 打开连接，可以向服务器发送消息
    * close 关闭连接

````javascript
//检查是否支持websocket
if(window.webSocket != undefined){
    var connection = new WebSocket('ws://localhost:3000'); //需要使用ws协议
    //连接实例对象上面有readyState对象，表示目前状态，
    // 0 正在连接
    // 1 连接成功
    // 2 正在关闭
    // 3 关闭连接
    connection.onopen = wsOpen; //触发open事件，发送相关数据
    function wsOpen(event){
        console.log(event.currentTarget.URL)
    }
    connection.close(); //关闭连接
}
````

2. 发送数据和接收数据

涉及事件：
    * send 客户端向服务器发送数据
    * message 客户端接收到服务器的数据，会触发Message事件 监听该事件处理返回的数据

````javascript
 //通过send进行数据的发送
 connection.send(message);
 //监听message事件，处理返回的数据
 connection.onmessage =  wsMessage;
 function wsMessage(event){
     console.log(event.data);
 }
````

3. 处理错误

涉及事件：
    * error 监听该事件处理错误


### 服务器端

在服务器端要单独部署处理webSocket的代码，暂时需要搭建node.js环境

````javascript
var http = require('http');
var server = http.createServer(function(req,res){});

server.listen(3000,function(req,res){
    console.log((new Date()) + 'Server is listen port 3000')
})
//启动webSocket服务
var webSocketServer = require('websocket').server
var wsServer = new webSocketServer({
    httpServer: server
});
// 建立request事件的回调函数
var connection;
wsServer.on('request',function(req){
    connection  = req.accept('echo-protol',req.origin); // 建立webSocket连接
    // 对connection的message指定回调函数
    connection.on('message',function(message){
        var msgString = message.utf8Data;
        connection.sendUTF(msgString);
    });
    // 最后 监听disconnect事件
    connection.on('close',function(reasonCode,disctiption){
        console.log(connection.remoteAddress+'disconnetcion')
    });

})
````

### websocket.io

是websocket的实现模块

````javascript
var app = require('express')();
var server =  require('http').createServer(app);
var io = require('websocket.io').listen(server);

server.listen(90);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})

// 将websocket.io插入客户端网页
<script src="/socket.io/socket.io.js"></script>

//在客户端脚本中建立websocket连接

var websocket = io.connect('http://localhost:90')

websocket.on('news',function(data){
    console.log(data)
});

// 最后用emitc向服务器发送信号，触发服务器端的anotherNews事件
websocket.emit('anotherNews')
// 请注意，emit可以替代Ajax请求，而on方法可以指定回调函数，也等同于Ajax的回调函数

// 在服务器的app.js下添加以下代码
io.sockets.on('connection',function(socket){
    socket.emit('news',{hello:'world'});
    socket.on('anotherNews',function(data){
        console.log(data)
    })
})
````

websocket.io提供的方法 **emit用于发送消息，on用于监听对方发送的消息**