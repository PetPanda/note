# es6

### 对象扩展

* Object.is()判断两个对象是否是相等。
* Object.assign();合并对象；参数一：源对象;参数二：要合并的对象；同名属性后面的属性会覆盖前面的属性；只有一个参数，会返回该参数。若不是对象，转换成对象，再返回。undefined和null不能转换为对象，报错。
    * 注意：Object.assign()是浅拷贝， 若是要合并的对象中含有值是对象的属性，则源对象拷贝到的是这个对象的引用。
    * 用途：为对象添加属性；添加方法；克隆对象(对象的引用)；合并多个对象；
    * 属性的遍历：
        1. for...in 循环遍历自身可枚举属性，不包含Symbol属性；
        2. Object.keys(obj);返回值：数组；包含对象自身（不含继承）所有可枚举属性（不含Symbol属性）
        3. Object.getOwnPropertyNames(obj);返回对象自身所有属性
        4. Object.getOwmPropertySymbols(obj)返回数组，包含自身所有Symbol属性
        5. Reflect.ownKeys(obj)返回数组，包含所有属性（全包括）；
* Object.setPrototypeOf(object,prototype)设置一个对象的prototype对象;Object.getPrototypeOf(obj);获取一个对象的prototype对象；
* Object.keys()返回数组，成员参数是对象自身所有可遍历键名；Object.values()数组，所有键值；Object.entries() 数组，所有键值对

### Reflect 目的是操作对象

### Symbol

* 概念：数据类型，表示独一无二的值
* 生成：Symbol()函数，不实用new 关键字
* 参数：字符串，目的是区分不同的symbol；若传递是一个对象，则调用Symbol对象的toString方法，然后生成。Symbol函数的参数表示对当前值的描述，因此相同参数的Symbol函数返回值是不相等的。
* 特性：不能与其他类型进行转换；显式转换为字符串；可转为布尔值；不可转换为数值。
* 作用：
    * 作为属性名：唯一，可做标示符
    ````
    //第一种写法
    let s  = Symbol();
    let a = {};
    a[s] = 'hello';
    //第二种写法
    let a = {
        [mySymbol]: 'hello'
    }
    //第三种写法
    let a = {};
    Object.difineProperty(a,mySymbol,{value:'hell0'});
    ````
    * 注意：作为对象属性名时，不能使用点运算符 `a.mySymbol = 'hello'` 是错误的！必须使用[],在对象内部也是这样。
* 属性名的遍历：作为属性名，该属性不会出现在`for...in、for...of`的循环中，也不会被`Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()`返回。可以使用`Object.getOwnPropertySymbols`获取指定对象的所有Symbol属性名。

* Symbol.for()，Symbol.keyFor()
    * Symbol.for()登记Symbol值，全局环境的； 重新使用同一个Symbol值，接受字符串参数 `Symbol.for('foo') === Symbol.for('foo') //true`,无论调用多少次，都会返回同一个Symbol值；而`Symbol('foo')`会返回不同的值
    * Symbol.keyFor 返回一个已登记的Symbol类性值的key `var s1 = Symbol.for('foo'); Symbol.keyFor(s1)//foo` 而`var s2 = Symbol('foo'); Symbol.keyFor(s2)//undefined`
* Symbol.iterator属性，指向该对象默认的遍历器方法。

### Set

* 基本用法：类似于数组，值是唯一的，没有重复的值。set本身是一个构造函数，用来生成Set数据结构。接受一个数组作为参数，用来初始化，返回初始化的数组。

````javascript
// 2 3 5 4  >>>> 不会添加重复的数>>>>>数组去重：[...new Set(array)];
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
};
````

* 注意：在向Set加入值的时候，不会发生类型转换，内部判断标准是`====`全等，不是先进行转换再判断相等与否。两个空对象是不相等的。

* 实例属性和方法：
    * 属性：constructor、size
    * 方法：
        * 操作方法：
            * add()添加某个值，返回Set本身。可以连缀
            * delete(value)删除值，返回布尔值。
            * has(value)查找是否存在，返回布尔值。
            * clear 清除成员
            * 番外：Array.from可以将Set结构转换为数组 `var array = Array.from(new Set([1,3,5,6]))` 是数组去重的另一种方式：`function debude(arr){return Array.from(new Set(arr))}`
        * 遍历操作：
            * keys()返回键名
            * values()返回键值
            * entries()返回键值对
            * forEach()使用回调函数遍历每个成员
        * 扩展运算浮的使用：let a = [...new Set([2,2,2,4,5])];

### Map 结构

* 概念：类似于对象，是键值对的集合；

### Iterator（遍历器）

1. 说明:遍历器是一种接口规格，人格对象只要部署这个接口，就可以完成遍历操作.
2. 作用：为各种数据结构，提供统一简便的接口；使得对象属性按照某种次序排列.
3. 在ES6中只有三种数据结构具备原生的Iterator接口：数组，类似数组的对象， set和Map结构。初次之外都需要自己部署。
4. for..of:只要对象部署@@Iterator接口，就可以使用for...of遍历他的值。js原有的for..in循环，只能获取对象的键名，不能获取键值，for...of可以获取键值。
    * for...of循环可以使用的范围：数组，类似数组的对象、Set和Map结构、Generator函数对象，以及字符串！！！

### Generator

1. 基本概念：异步变成解决方案；标志：function *() ；内部使用yield关键字；类似于普通函数，添加括号，函数不执行，返回的是指向函数内部状态的**指针对象**,使用next方法继续执行。yield是暂停执行的标记，next 是可以恢复执行。
2. yield语句：遇到yield语句，暂停后面的操作，并将紧跟在yield后面的表达式的值作为返回对象的Value对象值。不能用在普通函数中， 否则会报错。如果用在表达式中， 必须放在括号中 ` console.log('1111' + (yield))`; 本身没有返回值，或者总是返回undefined

3. next参数：可以带一个参数，作为上一个yield的返回值；

````javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
//注意：其中的value 以及 done；其中Value的值是yield后面的计算结果。执行到return时才会显示done结束
var a = foo(5);
a.next() // Object{value:6, done:false} 
a.next() // Object{value:NaN, done:false}//运行时没有参数，导致
a.next() // Object{value:NaN, done:true}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
````

4. for...of循环可以自动遍历 Generator函数生成的Iterator对象，且不需要调用next方法；一旦next方法的返回对象的done属性为true时，for..of循环就会终止，且不包含该返回的对象。

5. yield* 语句，用来在一个Generator函数中执行另一个Generator函数。表明返回的是遍历器。不是单一的对象。

````javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
````

6. 应用：
    * 异步操作的同步化表达
    * 控制流管理：多级回调函数的解决；yield是同步执行，不是异步，同时返回Promise对象。
    * 部署iterator接口：可以在任意对象上面部署iterator接口

### async函数

1. 概念：async函数就是将 Generator函数的星号（*）替换成async，将yield替换成await;可以按照普通函数执行的模式进行执行；返回值是Promise对象。

2. 基本用法：async返回值是Promise对象，可以使用then方法添加回调函数。当函数执行时，一旦遇到await就会先返回，等待异步操作完成。

3. 语法：
    * 返回Promise对象，async函数内部returny语句返回的值，会成为then方法的回调函数的**参数**。
    ````javascript
    async function f(){
        return 'hello world';
    }
    f().then(v => console.llog(v));
    ```` 
    * await命令后面是一个Promise对象，如果不是，则会被转成一个立即reslove的Promise对象。

4. 注意点：

* await后面的Promise对象，运行结果可能是rejected,所以最好把await命令放在try...catch代码块中。
* 多个await后面的异步操作，如果不存在继发关系，最好是让他们同时触发。
* await只能用在async函数中，否则会报错。

### Promise

1. 异步操作同步化

2. Promise构造函数接收一个函数作为参数，该函数的两个参数分别是resolve方法和rejected方法；

3. Promise.all和Promise.race()都是将多个Promise实例包装成新的Promise实例。

4. 将现有的对象（普通对象）转换成Promise对象，可以使用Promise.resolve()或Promise.rejected()方法

````javascript
//Promise.resolve()方法返回一个新的Promise对象，他的状态时fulfilled.
var p = new Promise.resolve('hello');
//p的状态时fulfilled，所以回调函数会立即执行。
p.then((s) => {
    console.log(s)
});

//Promise.rejected(reason)方法会返回一个新的Promise实例，该实例状态为rejected,Promise.rejected()函数参数的reason，会被传递给实例的回调函数。
var p = new Promise.rejected('出错啦！');
p.the((s) => {
    console.log(s);
});
````

5. async函数：用来取代回调函数的一种方法


````javascript
//第一种写法
doSomething().then(function(){
     return doSomethingElse();
}).then(finalHandler)
//finalHandler回调函数的参数是doSomethingElse函数的运行结果

//第二种写法
doSomething().then(function(){
     doSomethingElse();
     return;
}).then(finalHandler);
//finalHandler回调函数的参数是undefined

//第三种写法
doSomething().then(doSomethingElse()).then(finalHandler);
//finalHandler回调函数的参数是doSomethingElse函数返回的回调函数的运行结果；；；；；；返回函数，而不是运行结果！！！！！

//第四种写法
doSomething().then(doSomethingElse).then(finalHandler);
//写法四和写法一只有一个差别，那就是doSometingElse会收到doSomething()返回的结果。
````



### Attention

1. 合并对象：Object.assign(target,source); 为对象添加或者修改属性：Object.defineProperty(target,key,value);

2. 异步编程：（将耗时的操作推迟执行）
    * 回调函数实现异步（在函数中使用setTimeout进行事件的处理）
    * 监听事件
    * 发布/订阅 subscriber/publish
    * Promise对象：每一个异步任务返回一个Promise对象，该对象有一个then方法，允许调用回调函数。
