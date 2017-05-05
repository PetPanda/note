# Vue进阶学习

1. directive 自定义指令

````javascript
//全局定义指令
Vue.directive('focus',{
    //当绑定到DOM元素中去
    inserted: function(el){
        
        el.focus();
    }
});

//也可以注册局部指令
directives: {
    focus: {
        //something
    }
}
````

   * 指令定义函数的钩子函数
        * bind  只调用一次，指令第一次绑定到元素时执行
        * inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）；
        * update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化
        * componentUpdated  被绑定元素所在模板完成一次更新周期时调用。
        * unbind 只调用一次，指令与元素解绑时调用。
    * 钩子函数的参数：
        * el 指令所绑定的元素，可以用来直接操作 DOM
        * binding 一个对象，包括：指令名name;指令值:value;指令绑定的前一个值：oldVaule;expression:绑定值的字符串形式
        * vnode Vue编译生成的虚拟节点
        * oldVnode：上一个虚拟节点