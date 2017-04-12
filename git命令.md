# Git常用命令

1. Git clone

>该命令会在本地生成一个版本库，和远程版本库名字相同
`git clone <远程仓库网址>` 

>指定不同的目录名，可以自己设置本地目录名
`git clone <远程仓库名> <本地目录名>`

2. Git remote

>列出所有远程主机
`git remote`

>查看远程主机的网址
>`git remote -v`

>查看该主机的详细信息
`git remote show <主机名>`

>添加远程主机
`git remote add <主机名> <网址>`

>删除远程主机
`git remote rm <主机名>`

>修改远程主机的名
`git remote rename <原主机名> <新主机名>`

3. Git fetch

>将远程主机的更新，全部拉取回本地.默认拉回所有分支更新
`git fetch <远程主机名>`

>拉取特定分支的更新
`git fetch <远程主机名> <分支名>`

>查看远程分支
`git branch -r`

>查看所有分支
`git branch -a`

>创建新分支
`git checkout -b <分支名>`

4. Git pull

>拉取回远程某个分支的更新，再与本地指定分支进行合并
`git pull <远程主机名> <远程分支名>:<本地分支名>`

>例如：拉取回`origin`主机的`next`分支，与本地`master`分支进行合并
`git pull origin next:master`

>如果远程分支是与当前分支合并
>`git pull origin next` 可以去掉冒号

>在某些场合，Git会自动在本地分支和远程分支之间建立一种追踪关系。比如，在`git clone`的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说本地的`master`分支会自动追踪`origin/master`分支

>Git允许手动建立追踪关系
>`git branch --set-upstream master origin/next` 指定`master`追踪`origin/next`分支

>如果当前分支与远程分支存在追踪关系，`git pull`就可以省略远程分支名
`git pull origin`

>如果当前分支只追踪一个分支，连主机名都有可以省略
`git pull`

5. Git push

>将 本地分支的更新推送到远程主机
`git push <远程主机名> <本地分支名>:<远程分支名>`

>注意与`git pull`区别，但是都遵循`<来源地>:<目的地>`的规则

> `git push origin master`表示将本地的`master`的分支推送到`origin`的`master`分支，如果后者不存在，则会被创建

>如果省略本地分支名，则表示删除指定远程分支，因为这是指定将一个本地空的分支推送到远程分支
>`git push origin :master`等同于`git push origin --delete master`

>如果当前分支与远程分分支之间存在追踪关系，则本地分支名以及远程分支名可以省略
`git push origin`

>如果当前分支与多个主机存在追踪关系，则可以使用`-u`指定一个默认主机，这样就后面使用就可以不加任何参数，直接使用`git push`。`git push -u origin master`

>将所有本地分支推送到远程分支
`git push --all origin`


