# Mongoose 的使用

## 连接使用数据库：

````javascript
var mongoose = require('mongoose');
//连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://127.0.0.1:27017/test');
//数据库连接后，就可以 对open和error事件进行监听了。
var db = mongoose.connection;
//监听是否成功连接
db.on('error',function clallback(){
    console.log('connection faild');
});
//监听是否成功打开数据库
db.once('open',function clallback(){
    console.log('mongoose working!');
});
````

## 创建Schema模式

````javascript
//使用mongoose.Schema方法用来定义数据库集的个格式，mongoose.model方法将该格式分配给指定的数据集。
var Schema = mongoose.Schema;
var userSchema = new Schema({//定义数据结构，字段和属性
    name: String,
    age: Number,
    isAlive: Boolean
});
//创建model  创建表关系以User为表名
var TestuserModel = mongoose.model('User',userSchema);
//实例化该model
var TestEntity = new Testuser({
    name: 'wangshouming',
    age: 12,
    isAlive: true
});
````

## 保存方法（增加数据）

### Model保存方法

model提供了一个create方法来对数据进行保存，
Model.create(文档数据,callback);

````javascript
Model.create({name: 'create_model',age:23},function(error,docs){
    //callback处理
})
````

### Entity保存

Entity.save(文档类型,callback);

````javascript
//保存实现>>>>>> 注意是保存model，即关系表以及表名
TestEntity.save(function(error,doc){
    if(error){
        console.log(error)
    }else{
        console.log(doc)
    }
});
````

````HTML
1. Schema:数据库集合的模型骨架，传统数据库的表结构
2. Model：通过Schema构造而成，除了具有Schema定义的数据库骨架之外，还可以具体操作数据库。
3. Entity: 通过Model创建的实体，还可以操作数据库
````

## 查找

查询是基于创建的model（关系实例）实例来进行查询的

````javascript
//该查询是基于Model关系表名查询的
TestuserModel.find({},function(error,doc){
    //若没有向find传递参数，默认显示的是所有文档
    if(error){
        console.log(error);
    }else{
        console.log(doc)
    }
});
//传递了参数的情况
TestuserModel.find({"age": 28},function(error,docs){
    if(error){
        console.log(error);
    }else{
        console.log(docs) //显示的是年龄为28的所有文档
    }
})
````

## 数据更新

obj.update(查询条件,更新对象,callback);

````javascript
var conditions = {name:'updatename'};
var update = {$set: {age:15}};
//$set应该是更新时使用的标示符
TestModel.update(conditions,update,function(error){
    //错误处理
});
````

## 删除数据

obj.remove(查询条件，callback);

````javascript
var conditions = {age: 12};

TestModel.rmeove(conditons,function(error){
    //错误处理
})
````
