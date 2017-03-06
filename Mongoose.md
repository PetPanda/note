# Mongoose 的使用

1. 连接使用数据库：

````javascript
var mongoose = require('mongoose');
//连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/mydatabase');
//数据库连接后，就可以 对open和error事件进行监听了。
var db = mongoose.connection;
db.on('error',function clallback(){
    console.log('connection faild');
});
db.once('open',function clallback(){
    console.log('mongoose working!');
});
//使用mongoose.Schema方法用来定义数据库集的个格式，mongoose.model方法将该格式分配给指定的数据集。
var Schema = mongoose.Schema;
var userSchema = new Schema({//定义数据结构，
    name: String,
    age: Number,
    DOB: Date,
    isAlive: Boolean
});
var user = mongoose.model('User',userSchema);
````