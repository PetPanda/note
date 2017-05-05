# React学习

## jsx语法：

1.  html直接写在javascript中，不添加任何引号

2. 遇到'<'就会使用Html规则解析；遇到'{'使用javascript语法解析

3. 允许在模板中加入变量，若变量是一个数组，则会将数组展开

## 组件

1. React.createClass方法用于生成组件类

````javascript
var HelloMessage = React.createClass({
    render:function(){
        return <h2>Hello world！{this.props.name}</h2>
    }
});
ReactDOM.render({
    <HelloMessage name="jhon" />,
    document.getElementById('example')
})
//组件类第一个字母必须大写，否则会报错
````

2. 组件任意添加属性， 可以使用`this.props`来获取
    
添加组件属性需要将`class`写成`className` ，将`for`写成`htmlFor`

## this.props.children 表示组件的所有子节点

将组件中所有子组件渲染到父组件中
我们使用`React.Children`来处理`this.props.children`;使用`React.Children.map`遍历子组件

## PropTypes 用来验证实例组件的属性是否是符合要求

`getDefaultProps`方法用来设置组件的默认属性

````javascript
React.createClass({
    getDefaultProps() {
        return {
            title: 'this is title'
        }
    }
})
````

组件类的`PropTypes`属性，用来验证组件实例的属性是否符合要求

````javascript
const MyTitle = React.createClass({
    PropTypes: {
        title: this.PropTypes.string.isRequired
    },
    render(){
        return (
            <h1>{this.props.title}</h1>
        )
    }
})
````

## 获取真实的DOM节点

使用`ref`属性获取真实的DOM节点

````javascript
var MyComponent = React.createClass({
    handleClick: function(){
        this.refs.myTextInput.focus();
    },
    render: function(){
        return (
         <div>
            <input ref="mtTextInput" type="text"/>
            <input type="button" onClick={handleClick}/>
         </div>
        )
    }
});
ReactDOM.render({
    <MyComponent />,
    document.getElemntById('example')
});
````

## this.state

`getInitialState`用于定义初始状态，该状态是一个对象，通过`this.state`属性读取；`this.setState`改变状态值

区分
`this.props`定义了就不再改变的 特性
`this.state`可以改变的特性

## 表单

用户在表单填入的内容，不能使用`this.props`读取，使用`event.target.value`读取用户输入值

````javascript
var Input = React.createClass({
    getIntialState: function(){
        return {value: ''}
    },
    handleClick: function(event){
        this.setState({value: event.target.value})
    },
    render: function(){
        var value = this.state.value;
        return (
            <div>
                <input type="text" value={value} onChange={handleClick}/>
                <p>{value}</p>
            </div>
        )
    }
})
````

## 组件的生命周期

* Mounting:已插入真实的DOM
* Updating: 正在被重新渲染
* Unmounting: 已移出真是DOM


## Ajax

使用`componentDidMount`方法设置`Ajax`等到请求成功，再用`this.setState`方法重新渲染

````javascript
//方法片段
componentDidMount: function() {
$.get(this.props.source, function(result) {
        var lastGist = result[0];
        if (this.isMounted()) {
        this.setState({
            username: lastGist.owner.login,
            lastGistUrl: lastGist.html_url
        });
        }
    }.bind(this));
},

//使用promise对象

ReactDOM.render(
  <RepoList
    promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
  />,
  document.body
);
//组件处理
var RepoList = React.createClass({
  getInitialState: function() {
    return { loading: true, error: null, data: null};
  },

  componentDidMount() {
    this.props.promise.then(//使用promis
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error}));
  },

  render: function() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return (
          <li>
            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
          </li>
        );
      });
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      );
    }
  }
});
````

## 声明周期函数

### 装载组件触发

* 组件加载`componentWillMount`：会在组件render之前执行，并且永远只执行一次，如果在这里定义setState方法，页面只会在加载前更新一次

* 组件加载`componentDidMount` （常用）：会在组件加载完成之后立即执行

    - 这是组件已经生成对应的DOM结构，可以通过`this.getDOMNode()`来获取；

    - 如果使用其他框架，可以在这个组件中执行`setTimeout`，`setInterval`以及Ajax等异步操作（防止异步阻塞UI）

    - 绑定DOM事件


* 组件更新`componentWillReceiveProps`：比较当前属性和新属性，以便决定是否通过`this.setState()`进行状态转换；在组件接受到一个新的prop时被执行，在初始化render时不会被调用，在这个组件中调用this.setState不会触发render

* 组件更新`shouldComponentUpdate`:返回一个布尔值，在组件接受到新的props或者state时被执行，可以在你确认不需要组件时使用。

* 组件更新`componentWillUpdate`: 在组件接收到新的prop或者state时但是还没有render时被调用，在初始化时不会被调用，一般发生在组件更新之前。

* 组件更新`componentDidUpdate`：组件完成更新之后立即执行，在初始化时不会被执行，一般在组件完成更新之后使用。

* 卸载组件`componentWillUnmount`：在组件从DOM 卸载之后执行。主要用来执行一些必要的清理任务。例如清除setTimeout等函数，


## Flux

* `dispatcher`：处理动作触发，维护Store之间的依赖
* `stores`：数据与逻辑部分
* `views`：
* `actions`：提供给`dispatcher`传递数据给`store`


## Redux

### `Action`：

只是指明事件发生了， 并没有指明应用是如何更新状态

1. 使用一个字符串类型的`type`（字符串常量）表示将要执行的动作；尽量减少在`action`中来传递数据；

````javascript
const ADD_LIST = 'ADD_LIST';
````

2. Action创建函数：生成`action`的方法；简单返回一个`action`;在`Flux`中的actionn函数会触发一个`dispatch`；而`Redux`中只需把`action`的结果传递给`dispatch`，调用`dispatch(todos(text))`即可发起一个`dispatch`过程

````javascript
function todos(text){
    return {
        type: ADD_LIST,
        text
    }
}
//或者是创建一个被绑定的action函数来自动dispatch
const addEvent = (text) => dispatch(addTodo(text))
//然后自动调用
addEvent(text)
````

### `Reducer`：用来更新`state` 

reducer是纯函数，不能调用Date.now()一类的方法，因为每次都会有不同的结果。


相当于`vuex`中的`mutations`的作用

接收旧的`state`和`action`，返回新的`state`

_不要在reducer中执行的操作_

* 修改传入参数

* 执行副作用的操作，如API请求或者路由跳转

* 调用非纯函数，如`Date.now()`或`Math.random()`

````javascript
import {VisiblityFilter} from './actions';
//初始化的state
const initialState = {
    visibilityFilter: VisiblityFilter.SHOW_ALL,
    todos: []
}

function todoApp(state = initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign(null,state,{
                //只修改state中的visiblityFilter
                visibilityFilter: action.filter
            })
            default :
                return state
    }
}
````

注意：

1. 不要修改`state`，使用`Object.assign()`新建了一个副本，不可以`Object.assign(state,{visiblityFilter:action.filter})`，这样会改变第一个参数。

2. 在`default`情况下返回旧的`state`


`combineReducers`生成一个函数，来调用一系列的`reducer`

### Store

Redux 只有一个单一的store

作用：

* 提供`getState()`获取`state`

* 提供`dispatch(action)`更新`state`

* 通过`subscriber(listener)`注册监听器

* 通过`subscriber(listener)`返回函数注销监听器

`createStore()`: 参数一：已有的reducer 参数二： 设置state的初始状态

发起`Action`

````javascript
import {createStore} from 'redux';
import todoApp from './reducers'
let store = createStore(todoApp);
````

### 数据流


#### Redux的数据流声明周期：

1. 调用`store.dispatch(action)`: 在任何地方掉用

2. Redux store 调用传入的 reducer 函数；

Redux Store会将两个参数传入`reducer`: 当前的`state`和`action`。

3. 根 reducer 应该把多个子 reducer 输出合并成一个*单一的`state`树*。

4. Redux store 保存了根 reducer 返回的*完整 state 树*。

### 搭配React


展示组件与容器组件

||展示组件|容器组件|
-|-|-|
|作用|描述如何展现（骨架，样式）|描述如何运行（数据获取，状态更新）
|直接使用Redux|否|是
|数据来源|props|监听redux state
|数据修改|从props调用回调函数|向Redux派发actions
|调用方式|手动|通常由React Redux生成

技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件
可以使用 React Redux 库的 connect() 方法来生成容器组件

使用`connect()`之前，需要先定义`mapStateToProps`把当前 Redux store state 映射到展示组件的 props 中
除了读取`state`,组件容器还能分发`action`使用`mapDispatchToProps()`方法接收`dispatch()`


### 一些属性的应用


1. 关于ref的使用

````javascript
<input className="good-control-input" type="text" placeholder="输入商品URL" ref={(input) => { window.textInput = input; } } />
````

2. this.props.children

`this.props.children`代表该组件的*所有子组件*

````javascript
//this.props.children指的是以下两个子组件，但是在App创建时，任何的元素都不能叫做子组件
<App>
    <NodeList></NodeList>
    <List></List>
</App>
````

3. 可以使用`react-router-redux`中的routeReducer

````javascript
import React from 'react';
import {render} from 'react-redux';
import {Provider} from 'redux';
import {broswerHistory} from 'react-router';
//routerReducer也可以在reducer中使用combineReducers组合
/*
* import {combineReducer} from 'redux';
*
* const reducer = combineReducer({
*   ...reducer,//和变量名不是一类
*   routing: routerReducer
})
*/
import {syncHistoryWithStore,routerReducer} from 'react-router-redux';

const store = creactStore({
    combineReducer({
        ...reducer,
        routing: routerReducer
    })
})
//then
//create an enhance history that asyncs navigation events with the same
const history = syncHistoryWithReducer(browserHistory,store);

//render 
<Provider store={store}>
    /* tell the router to use enhance history*/
    <Router history={history}>
</Provider>
````
