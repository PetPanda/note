# Redux进阶

## Redux适用范围

* 用户使用方式复杂
* 不同身份的用户有不同的使用方式（如用户和管理员）
* 多个用户之间可以协作
* 与服务器大量交互，或者使用了websocket
* View要从多个来源获取数据

从组建角度看:

* 某个组件的状态需要共享
* 某个状态需要在任何地方都可以拿到
* 一个组件可以改变全局
* 一个组件需要改变另一个组件的状态






## Redux的API

* createStore(reducer, initialState, enhancer)

````javascript
/**
 * @param  {函数}  reducer 不多解释了
 * @param  {对象}  preloadedState 主要用于前后端同构时的数据同步
 * @param  {函数}  enhancer 很牛逼，可以实现中间件、时间旅行，持久化等
 * ※ Redux 仅提供 applyMiddleware 这个 Store Enhancer ※
 * @return {Store}
 */
````

    - 下属四个API
        - getState();
        - dispatch(action);
        - subscribe(listener);
        - replaceReducer(nextReducer);

* combineReducers(reducers) 应用状态树的分级管理
* applyMiddleware(...middlewares)
* compose(...functions)

````javascript
//实际
/*
* @param: {多个函数，用逗号隔开}
* @return: {函数}
*/
compose(f, g, h)(...arg) => f(g(h(...args)))
//demo
//返回的是一个函数，所以进行直接执行
var re2 = Redux.compose(func3, func2, func1)(0);
````

## React-redux

1. `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` 连接react组件和redux

    * `mapStateToProps(state, [ownProps])`：如果定义该参数，组件将会监听Redux store的变化，该函返回一个对象，这个对象会与组件的props合并
    * `mapDispatchToProps(dispatch, [ownProps])`如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
    * `mergeProps(stateProps, dispatchProps, ownProps)`如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。
    * `options`: 如果指定该参数，可以指定connector的参数

2. React-Redux 提供connect方法，用于从 UI 组件生成容器组件 connect就是将两种组件连接起来

````javascript
import { connect } from 'react-redux';
const VisibleTodoList = connect()(TodoList);
````

上面代码中，`TodoList`是UI组件，`VisibleTodoList` 就是由React-Redux通过connect方法自动生成的容器组件
但是没有定义业务逻辑，上面容器组件毫无意义；
为了定义业务逻辑，需要给出下面两种信息：

````TEXT
1. 输入逻辑：外部的数据（即state对象）如何转变成UI组件的参数
2. 输出逻辑：用户发出的逻辑如何变为Action对象，从UI组件传下去
````

完整的API如下

````javascript
import { connect } from 'react-redux';

const VisibleTodoList = connect({
    mapStateToProps,
    mapDispatchProps
})(TodoList);
````

connect 接受两个参数，,mapStateToProps以及mapDispatchToProps，他们定义了UI组件的业务逻辑，前者负责输入逻辑，即将state映射到UI组件的参数（props）; 后者负责输出逻辑，即将用户对UI组件的操作映射成Action


### mapStateToProps():是一个函数， **state的映射**

建立一个从（外部）state到（内部）props对象的映射关系*

作为函数，执行后应该返回一个对象，里面的每一个键值对就是一个映射。

````javascript
const mapStateToProps = (state) => {
    return {
        todos:getVisibleTodos(state.todos,state.visiblityFilter)
    }
}
````

以上，mapStateToProps是一个函数，参数是state，返回一个对象，该对象有一个todos属性，代表UI组件*的同名参数*。后面的getVisiblityFilter是一个函数，可以从state算出todos值

````javascript
const getVisiblityFilter = (todos,filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)//filter方法和参数不是一类型
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        default :
            throw new Error('Unkonw filter' + filter)
    }
}
````

mapStateToProps第一个参数是state对象；第二个参数是代表容器组件的props对象

````javascript
// 容器组件的代码
//    <FilterLink filter="SHOW_ALL">
//      All
//    </FilterLink>

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
````

### mapDispatchToProps  **事件映射**

用来建立UI组件参数到`store.dispatch`方法的映射；可以是一个函数也可以是一个对象；

如果`mapDispatchToProps`是一个函数，会有dispatch 和 ownProps（容器组件的props） 两个参数

````javascript
const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    onClick: () => {
        dispatch({
            type: 'SET_VISIBLITY_FILTER',
            filter: ownProps.filter
        })
    }
}
````

如果`mapDispatchToProps`是一个对象，它的每个键名也是对应UI组件的同名参数，键值应该是一个函数，会被当做Action creator

````javascript
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
````

### <Provider/> 组件

connect方法生成容器组件之后，需要让容器组件拿到state对象，才能生成UI组件的参数

React-Redux 提供Provider组件，可以让容器组件拿到state

````javascript
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
````


## 中间件

`applyMiddleware` 中间件的使用顺序有要求，使用前要查询

Store enhancer `store`增强器


注意：

在异步操作中使用对象展开浮（... ES7中提案）代替`Object.assign()`

````javascript
switch(action.type){
    case Todos.ADD_EVENT:
        return {...state,visiblity: none}
        break;
}
````



## 关于Redux的异步操作


* 用于生成action creator的函数

````javascript
function makeActionMaker(type,...argNames){
    return function(...args){
        let action =  { type };
        argNames.forEach((arg,index) => {
            action[argNames[index]] = args[index]
        })
        return action;
    }
}
const ADD_TODO = 'ADD_TODO';
export const addTodo = makeActionMaker(ADD_TODO,'id','text')
````

* 编写自己的异步action creator函数

````javascript
function loadPosts(userId){
    return {
        //要在发送之前和之后的action types
        types: ['LOADE_REQUEST','LOADE_SUCCESS','LOADE_FAILER'],
        //检查缓存
        shouCallAPI: (state) => !state.users[userId],
        callAPI: () => fetch('http://myapi/users/${userId}/posts'),
        //在action开始和结束时注入的id
        playload: {userId}
    }
}
````





