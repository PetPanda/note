# es6添加的新方法

## 数组

* Array.from() 将类似数组的对象和可遍历的对象转换为真正的数组
* Array.of() 将一组值装换为数组

````javascript
Array.of(2,4,5) //[2,4,5]
````

* 数组实例的copyWithin()方法，在当前数组的内部 ，将指定位置的成员复制到其他位置。

Array.prototype.copyWithin(target, start = 0, end = this.length)

参数：

    - target 从该位置开始替换数据
    - start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
````javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
````

* 数组实例的find()和findIndex()

    - find 用于找出第一个符合条件的数组成员，参数是回调函数，返回值是boolean
    ````javascript
    [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
    }) // 10
    ````
    - findIndex   返回第一个符合条件的数组成员的位置

* 数组实例的fill()使用给定值，填充一个数组

````javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
//还可以添加第二个第三个参数表示起始和结束位置
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
````

* 数组实例的entries()，keys()和values()  用于遍历数组

    - entries() 对键值对的遍历
    - keys() 对键名的遍历
    - values()对键值的遍历

* 数组实例的includes() 返回布尔值，表示数组是否包含给定值

## 字符串的扩展

1. ES6中添加了字符串遍历接口，可以使用`for...of`进行遍历

2. ES5提供的`charAt()`返回字符串给定位置的字符，但是不能识别码点大于`x0ffff`的字符；ES6提供`at()`方法可以识别

3. normalize用来将字符不统一的标示方法统一为 同样的形式

4. 查找方法：
    * includes() 返回布尔值，表示是否找到了参数字符串
    * startsWith() 返回布尔值，表示参数字符串是否在源字符串的开头
    * endsWith() 返回布尔值，表示参数字符串是否在目标字符串尾部

5. repeat(n) 返回一个新的字符串，将原字符串重复N次

6. padStart/padEnd Es2017引入字符串补全长度的功能，`'a'.padStart(4,'x')` 输出`xxxa`

## 正则的扩展


1. 字符串的正则方法：math/replace/search/split 在ES6中将这些方法都定义在正则对象内部

## 数值的扩展

1. Number.isFinite()和Number.isNaN() 用来检查数值是否为有限，是否为NaN

2. Number.parseInt(), Number.parseFloat() 将两个方法移植到Number对象上面，行为保持不变

3. Number.isInteger()用来判断一个值是否为整数

4. Number.EPSILON 是一个极小的常量，在于为浮点数计算，设置一个误差范围，

````javascript
5.551115123125783e-17 < Number.EPSILON
// true
````

## Math 对象上的扩展

1. Math.trunc() 用于去除一个数的小数部分，返回整数部分。

2. 用来判断一个数到底是正数、负数、还是零：正数返回+1；负数返回-1；0返回0；-0返回-0；其他值返回NaN

3. Math.cbrt()用于计算一个数的立方根

## 函数扩展

`querySelectorAll`方法返回的是一个`nodeList`对象,不是数组，而是一个类似数组的对象，扩展运算符可以将其转换为真正的数组。

扩展运算符调用的是数据结构的Iterator接口，因此只要有Iterator接口的对象，都可以使用扩展运算符。比如mao结构


## 对象的扩展

1. Object.is()比较两个值是否是严格相等

2. `Object.assign()`用于对象的合并，将源对象的所有可枚举属性，复制到目标对象；只拷贝源对象自身的属性， 不拷贝继承属性和不可枚举属性。
    * 为对象添加属性
    * 为对象添加方法
    * 克隆对象
````javascript
function clone(origin){
    return Object.assign({},origin);
}
//只能克隆原始对象自身，不能克隆他的继承值
function clone(origin){
    var orignProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto),origin)
};
````
    * 合并多个对象
    * 为属性指定默认值

3. 属性的遍历：
    * `for...in`循环遍历对象自身和继承的可枚举属性。
    * `Object.keys`返回一个数组，包含对象自身所有不含继承的可枚举属性。
    * `Object.getOwnPropertyNames(Obj)`返回一个数组，包含对象自身的所有属性，包括 不可枚举属性，不含Symbol属性
    * `Object.getOwnPropertySymbols`返回一个数组，包含所有Symbol属性

4. `Object.setPrototypeOf()`用来设置一个对象的`prototype`对象

5. `Object.getPrototype`获取`prototype对象`








