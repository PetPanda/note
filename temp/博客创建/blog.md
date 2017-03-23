# 创建个人博客遇到的问题

1. 利用不同github分支管理博客源代码
    1. 创建两个分支，master 和 hexo分支，将hexo分支设置为默认分支。
    2. 将hexo分支拉取到本地,`git pull origin hexo --allow-unrelated-histories` 合并不同分支
    3. 将博客源码push到远程仓库，`git push -u origin master:hexo
    4. 执行`hexo d` 发布博客到master上面