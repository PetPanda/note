# 创建个人博客遇到的问题

1. 利用不同github分支管理博客源代码
    * 创建两个分支，master 和 hexo分支，将hexo分支设置为默认分支。
    * 将hexo分支拉取到本地,`git pull origin hexo --allow-unrelated-histories` 合并不同分支
    * 将博客源码push到远程仓库，`git push -u origin master:hexo
    * 执行`hexo d` 发布博客到master上面

2. 关于域名解析

|记录名|主机记录|记录值|
|-|-|-|
|CNAME|二级域名|wangshouming.github.io|

需要解决的问题：

* 一个主机对应多个github账号提交代码
* 托管代码必须存在index.html文件
* 要存在404.html页面，转接跳转
* CNAME文件存在与否

