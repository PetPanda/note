# React-router学习

## 基本用法

1. `Router`使用时，Router就是React的一个组件，组件本身只是一个容器

2. 真正路由要通过`Route`组件定义


## 嵌套路由

````javascript
<Router history="hasHistory">
    <Route path="/" component={App} />
        <Route path="/repos" component={Repos} />
        <Route path="/about" component={About} />
</Route>
````

以上先加载App组件，再加载Repos组件，App组件要写成

````javascript
export default React.createClass( {
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})
````

上面代码中，App组件的`this.props.children`就是子组件。

## path属性 路由匹配规则

匹配路径是*可以省略*

## 通配符

规则：

1. `:parentName` 匹配URL的一个部分，直到遇到下一个`/`,`?`,`#`为止，路径参数可以通过`this.props.params.parentName`获取

````javascript
<Route path="/hello/:name" />
//匹配： /hello/mike
//      /hello/john
````

2. `()` 表示URL这个部分是可选的

````javascript
<Route path="/hello/(:name)" />
//  /hello
//  /hello/mike
//  /hello/john
````

3. `*` 匹配任意字符，知道模式里的下一个模式为止

````javascript
<Route path="/files/*.*" />
//匹配  /files/hello.gif
//  /files/hello.html
<Route path="/files/*"/>
// match   /files/
// match   /files/a
// match   /files/a/b
````

4. `**` 匹配任意字符，知道下一个`/`,`?`,`#`为止

````javascript
<Route path="/**/*.jpg" />
// match /files/hello.jpg
// match   /files/path/to/file.jpg
````

`path` 属性也可以使用相对路径（不以`/`开头），匹配时就会相对于父组件路径

注意： 路由匹配遵循从上至下的规则，如果已有匹配到，就不再往下进行匹配

## IndexRoute组件

````javascript
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
````

上面代码，访问`/`根路径，不会加载任何子组件，也就是说，App组件的`this.props.children` 此时是`undefined`

通常会采用： `this.props.children || <Home/>` Home是Accounts和Statements的同级组件，但是Home没写在路由中

IndexRoute 显式指定Home是根路由的子组件，指定默认情况下加载的子组件

````javascript
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/> //显式指定index.html
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>

````

注意： *IndexRoute没有path参数*

## Redirect组件

用于路由跳转（重定向）

````javascript
<Route path="Index" component={App}>
    <!--从 index/message/:id 跳转到 /index/message/:id-->
    <Redirect from="message/:id" to="message/:id"/>
</Route>
````

## IndexRedirect组件

用于访问根路径的时候，将用户重定向到某个组件

````javascript
<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
````

## Link 组件  --- 用于取代<a>元素

路由跳转标签

可以使用`activeStyle`定义样式 内联样式

使用`activeClassName`指定class

## IndexLink 

连接到根路径`/` 不要使用`Link`组件 要使用`IndexLink`组件 因为`activeStyle`以及`activeClassName`会失效

## history属性

监听路由的变化

属性值：

* browserHistory 正常显示路径 `example.com/some/path`  注意： *该种模式要对服务器进行改造*
* hashHistory 路由将通过URL的hash部分（#）来切换 形式类似于`example.com/#/some/path`
* createMemoryHistory 主要用于服务器渲染，不用于URL交互

## 表单处理

````javascript
<form onSubmit={this.handleSubmit}>
  <input type="text" placeholder="userName"/>
  <input type="text" placeholder="repo"/>
  <button type="submit">Go</button>
</form>
````

way1 : 使用`browserHistory`

````javascript
import { browserHistory } from 'react-router';
// ...
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
````

way2: 使用`context`对象

````javascript
export default React.createClass({

// ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
  // ...
    this.context.router.push(path)
  },
})
````

## 路由钩子

每个路由都有`Enter`和`Leave`钩子 ，用户进入或者离开路由时触发

demo01 ： 使用onEnter 替换 `<Redirect/>` 组件

````javascript
//在跳转时直接跳转到重定向到另一个路径
<Route path="inbox" component={Inbox}>
  <Route
    path="messages/:id"
    onEnter={
      ({params}, replace) => replace(`/messages/${params.id}`)
    }
  />
</Route>
````

demo02 : 做验证

````javascript
const requireAuth = (nextState,replace) => {
    if(!auth.isAdmin()){
        //如果没有通过验证 重定向到首页
        replace({pathname: '/'})
    }
}

export const AdminRoutes = () => {
    return (
        <Route path="/admin" component={Admin} onEnter={requireAuth}>
    )
}
````


## 声明路由

````javascript
//routes是设计
 <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="index" component={Home}/>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
        <Route path="antd" component={Antd}/>
  </Route>
<Router history={history} routes={routes} />
````






