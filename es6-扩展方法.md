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



