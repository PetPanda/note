# 各种杂项知识点

1. package.json文件
    * `dependencies`是项目运行需要依赖的模块；
    * `devDependencies`是项目开发所需要的模块;
    * `peerDependencies`:用来供插件指定其所需要的朱工具的版本。

2. 关于yarn的使用：
    * `yarn add [package]` 自动添加到package.json的依赖中。
    * `yarn add --dev` 添加到 devDependencies
    * `yarn add --pee`r 添加到 peerDependencies
    * `yarn add [package]@[version]` 通过指定版本来加载包
    * `yarn update [package]` 升级依赖包`yarn update [package]@[version]`
    * `yarn remove [package]`移除依赖包