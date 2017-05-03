# 移动端布局遇到的问题

1. 从布局开始

直接使用flex布局

````HTML
<style>
    body {
        display: flex;
        flex-direction:column;
    }
    .main {
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        <!-- 控制元素在移动设备上是否使用滚动回弹效果 ；在ios设备滚动更流畅-->
        <!-- 值：auto: 使用普通滚动；touch:使用具有回弹效果的滚动 -->
    }
    .header {
        height: 44px;
    }
    .footer {
        height: 44px;
    }
</style>
````

2. fixed和input 标签

尽量不要在含有input标签的页面使用fixed定位；因为在ios上，点击input获取焦点的是偶，fixed会暂时失效，或者可以理解成变成了absolute定位，fixed定位节点会和其他节点一起滚动。

3. input 的 compositionstart 和 compositionend 事件

````javascript
//对input的值进行输入限制
inputElement.addEventListener('input', function(event) {
  let regex = /[^1-9a-zA-Z]/g;
  event.target.value = event.target.value.replace(regex, '');
  event.returnValue = false
});
````
以上代码在安卓下是没有问题的，但是在ios中，`input`事件会截断非直接输入

非直接输入：在我们输入汉字的时候，中间过程会输入拼音，每次输入一个字母就会触发一次input事件，在店中候选字之前，都属于非直接输入。

`compositionstart`:在用户进行非直接输入的时候触发，在非直接输入结束。
`compositionend `：用户点击候选词或者【选中】按钮之后触发。

4. iOS 1px border 实现

在ios上面，1px会显示成两像素

解决：
伪类 + transform

使用伪元素的box-shadow或者border实现border，然后用transform缩小至原来的一半。

````HTML
<style>
    @mixin hairline-common($border-radius) {
        position: relative;
        z-index: 0;
        &:before {
            position:absolute;
            content: '';
            border-radius:$border-radius;
            box-sizing: border-box;
            transform-origin: 0 0;
        }
    }

    @mixin hairline($direct: 'all',$border-color: #ccc,$border-radius: 0) {
        @include hairline-common($border-radius);
        &:before {
            transform: scale(.5);
            @if $direct == 'all' {
                top: 0;
                left: 0;
                width: 200%;
                height: 200%;
                box-shadow: 0 0 0 1px $border-color;
                z-index: -1;
            } @else if $direct == 'left' or $direct == 'right' {
                #{$direct}: 0;
                top: 0;
                width: 0;
                height: 200%;
                border-#{$direct}: 1px solid $border-color;
            } @else {
                #{$direct}: 0;
                left: 0;
                width: 200%;
                height: 0;
                border-#{$direct}: 1px solid $border-color;
            }
        }
    }

</style>
````
