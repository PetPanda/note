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

1. 查询： find查询返回符合条件的一个或者是多个或是空文档结果

2. 保存： model调用create方法；entity调用save方法

3. 更新：obj.update(查询条件,更新对象,callback);

4. 删除： obj.remove(查询条件,callback) 

## find过滤查询

1. 属性过滤 find(conditions,field,callback);

field省略或者是null，则返回所有属性

````javascript
//返回一个只包含一个键值Name,aged的所有 记录
TestModel.find({},{name:1,age:1,_id:0},function(error，docs){})
````
说明： 只要我们把要显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回值

2. findOne的基本用法(只返回第一个符合条件的文档)

与find相同，但只返回单个文档，也就是当查找到一个符合条件的数据时，就不再继续查找，并返回查询结果.

````javascript
TestModel.findOne({age:12},function(error,docs){})
````

3. findById  参数是文档的id,返回单个文件  findById(_id,callback);\

## 条件查询

注： **引号加与不加没有影响**

* `$lt`(小于)
* `$lte`(小于等于)
* `$gt`(大于)
* `$gte`(大于等于)
* `$ne`(不等于)
* `$in`(可单值和多值的匹配)
* `$or`(查询多个键值的任意给定值)
* `$exists`(表示是否存在)
* `$all`

1. 大于小于操作

````javascript
Model.find({"age":{"$gt":8}},function(error,docs){})
//查询所有age大于8岁的数据
````

2. 不匹配 `$ne`

````javascript
//可以进行组合查询
Model.find({age: {$lt: 24},name: {$ne: 'tom'}},function(){})
````

3. `$in`匹配

````javascript
//可以把匹配的多个值组成一个数组
Model.find({age: {$in: [20,30]}},function(){})
````

4. `$or` 或者

````javascript
//查询年龄为23或者名字为tom的全部文档
Model.find({$or:[{name:'tom'},{age:23}]},function(){})
````

5. `$exists`(存在) **参数可以是布尔值**

````javascript
//查询所有存在name属性的文档
Model.find({name:{$exists:true}},function(){})
````

### `limit`函数的基本用法（限制返回的数量）

`限制数量：find(conditions,field,options,callback)`

````javascript
Model.find({},null,{limit:20},callback);
//返回20条记录，如果不足20，则返回实际记录数目
````

### `skip`函数的基本用法

`跳过数量 find({},null,options,callback)`

````javascript
Model.find({},null,{skip:4},callback);
//若查询结果少于4个，则不会返回任何结果
````

### `sort`函数的基本用法

结果排序: `find(conditions,field,options,callback)`

````javascript
Model.find({},null,{sort: {age: -1}},callback);
//查询所有数据，并按照age降序返回数据
````

## ObjectId简介

## Schema 添加属性

````javascript
var mongoose = require('mongoose');
var TempSchema = new mongoose.Schema();
TempSchema.add({name: 'String',email:'String',age:'Number'})
````

## 关于方法

### 实例方法

利用Schema提供公共方法

````javascript
var saySchema = new mongoose.Schema({name:'String'})
saySchema.metod('say',function(){
    console.log('this is a Friend')
})
var say = mongoose.model('say',saySchema);
var lenka = new say();
lenka.say() //this is a Friend
````

### Schema静态方法

````javascript
TestSchema.static('findName',function(name,callback){
    return this.find({name:name},callback);
});
TestModel.findName('tom',function(error,docs){
    //docs所有名字叫tom的结果集
})
````

### Schema追加方法

````javascript
TestSchema.method.speak = function(){
    console.log('my name is' + this.name);
}
TestModelEntity.speak(); // my name is ..
````