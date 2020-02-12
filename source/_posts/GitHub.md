---
title: GitHub
tags: Github
categories: Tools
abbrlink: github
date: 2017-11-18 23:40:38
---

## Github访问速度慢以及显示不完全的解决办法

修改`C:\Windows\System32\drivers\etc`中的hosts文件（PS：若没有修改权限，可以鼠标右键，属性，安全，修改权限。或者将hosts文件复制到桌面，修改之后，复制到原文件夹），将如下代码添加到hosts文件中：
```git
\# GitHub Start 
192.30.253.112 github.com 
192.30.253.119 gist.github.com 
151.101.100.133 assets-cdn.github.com 
151.101.100.133 raw.githubusercontent.com 
151.101.100.133 gist.githubusercontent.com 
151.101.100.133 cloud.githubusercontent.com 
151.101.100.133 camo.githubusercontent.com 
151.101.100.133 avatars0.githubusercontent.com 
151.101.100.133 avatars1.githubusercontent.com 
151.101.100.133 avatars2.githubusercontent.com 
151.101.100.133 avatars3.githubusercontent.com 
151.101.100.133 avatars4.githubusercontent.com 
151.101.100.133 avatars5.githubusercontent.com 
151.101.100.133 avatars6.githubusercontent.com 
151.101.100.133 avatars7.githubusercontent.com 
151.101.100.133 avatars8.githubusercontent.com 
\# GitHub End
```

更新：在学校的时候电脑B是可以正常访问Github的且速度很快，然而回家之后发现无法访问Github了，一直转圈但是网页就是显示不出来，可能是由于不同地区的网络有些差别。将上述代码添加到电脑B之后可以正常访问了然而一会儿又不行了，可参考[该文章](https://www.cnblogs.com/baby123/p/10868095.html)查询github.com对应的TTL值最小的IP地址，将其添加到hosts文件中即可。

更新：又卡的不行，更新了IP地址还是卡，将其从从hosts文件去掉之后发现竟然又可以访问了，真是服了这垃圾网络。

>https://www.cnblogs.com/baby123/p/10868095.html
>http://blog.sciencenet.cn/home.php?mod=space&uid=2577109&do=blog&quickforward=1&id=1087257

## `failed to push some refs to 'git@github.com'`

出现这个错误是因为你有远程库中的文件没有下载下来，所以你需要先运行
```
git pull origin master
```
然后你就看到了远程文件已经下载到你的工程里面并且自动合并了，你需要在本地库中添加新文件并且提交。
```
git push -u origin master.
```

## `fatal: remote origin already exists.`

解决办法，依次输入如下命令：
```
git remote rm origin 
git remote add origin [git@github.com:djqiang/gitdemo.git](mailto:git@github.com:djqiang/gitdemo.git) 
```
如果输入`git remote rm origin`还是报错：
```
error: Could not remove config section 'remote.origin'. 
```
我们需要修改gitconfig文件的内容：找到你的github的安装路径，我的是：
```
C:\\Users\\ASUS\\AppData\\Local\\GitHub\\PortableGit_ca477551eeb4aea0e4ae9fcd3358bd96720bb5c8\\etc 
```
找到一个名为gitconfig的文件，把里面的**[remote "origin"]**那一行删掉就好了！

git无法pull仓库，refusing to merge unrelated histories
------------------------------------------------

我在Github新建一个仓库，然后把本地一个仓库上传。 先pull，因为两个仓库不同，发现
```
refusing to merge unrelated histories
```
无法pull，因为他们是两个不同的项目，如果要把两个不同的项目合并，git需要添加一句代码，
```    
--allow-unrelated-histories
```
假如我们的源是origin，分支是master，那么我们 需要这样写：
```
git pull origin master----allow-unrelated-histories
```

## 已经设置ssh连接，却仍要输入账户密码

只需更新[Git Credential Manager for Windows](https://github.com/Microsoft/Git-Credential-Manager-for-Windows/releases)即可。

## Github的分支
本地仓库文件夹中的内容会在执行切换分支命令之后自动切换到对应分支。如果将A分支中已上传到远程仓库的文件拷贝到B分支，然后在B分支中执行`git pull origin B`，则会提示`Everything up-to-date`，且Github个人主页中不会显示commited，这可能是由于在Github的远程仓库中不同分支中的同一文件只是多了一个索引，文件仍然只有一个，以节省空间。

## 开启issues
fork的仓库默认关闭issues，需要在`Setting->Options->Features`中手动打开，注意，Setting页面很长，要往下拉才看得到Features选项。

>https://help.github.com/en/github/managing-your-work-on-github/disabling-issues

## fork的仓库的gh-pages打不开
可参考[该issue](https://github.com/nqdeng/7-days-nodejs/issues/4)。

## `fatal: unable to access 'http://github.com/xxx/xxx.git/': Recv failure: Connection was reset`
`git push`时出现上述错误，不是网络问题，删除原仓库重新克隆即可。

## `git push -f`
`git push`的时候经常会遇到如下错误：
```
! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/JingwangLi/blog'
```

一般来讲，这时候要将远程仓库pull下来和本地仓库merge之后再push，但是如果是个人开发，直接`git push -f`方便很多。

## `Changes not staged for commit`
我出现该错误的原因是父文件夹`git init`时其中一个子文件夹已经有`.git`文件夹，将子文件夹中的`.git`文件夹删去即可。

