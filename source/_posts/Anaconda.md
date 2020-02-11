---
title: Anaconda
tags:
  - Python
categories:
  - Python
abbrlink: anaconda
date: 2017-11-01 18:55:36
---

## Anaconda的安装
2018.12.5 更新： 之前出现的问题主要是由于我之前配置的 java 的环境变量和 anaconda 发生了冲突，如果没有安装过 java 的话可以忽略。 还有就是之前说过最好不要安装新版本，但是上次新电脑配置Python环境的时候安装的最新版也没啥问题，不过也有可能因电脑而异，可以先试下最新版本，如果有问题的话再尝试安装老版本吧。 下载请认准[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/),版本请选择 Anaconda3-XXX-Windows-x86_64.exe，XXX代表版本号，最新版的话就是 5.3.1（新电脑安装的就是这个版本，没发生任何问题）。 
下载之后，安装之前一定要确认安装路径**不包含中文，不包含空格**，否则以后写代码的时候会出现各种奇怪的 bug 。。当然了如果很不幸你的 windows 账户名是中文或者包含空格，那就比较麻烦了。。这种情况下，如果你是 win 10，可以开启超级管理员权限，注销当前账户进入管理员账户，然后修改C盘下账户文件夹的名称，之后修改注册表即可，具体操作百度就有。 接下来点安装，一直选择 next 就行，但是不要点太快，要注意安装时候有个界面会提示你 "add path xxxx" 具体记不清了，一定要勾选上。

----
windows10 64bit 安装 Anaconda3-5.0.1-Windows-x86_64 出现的问题：failed to create anaconda menus 尝试了很多办法：

* 试过从C盘换到D盘，不行
* 有人说路径太长，改短一点，这个说法也不靠谱，没有试过。
* 也试过从just me换到all users，依然不行。

终极解决方案，**将JAVA的环境变量JAVA_HOME和PATH先删掉**，就可以顺利安装了。 这次虽然没有出现failed to create anaconda menus，但是安装成功之后开始菜单只有一个anaconda prompt，别的IPython和Spyder都没有，命令行也无法使用conda，反复尝试了几次之后终于意识到可能是版本太新的原因，于是换了5.0.0，果然解决了！ 总结一下要注意的地方： 
1.安装之前首先**将JAVA的环境变量JAVA_HOME和PATH先删掉（如果没有配置过java环境可以忽略这条）；** 
2.尽量选择安装程序自动选择的安装路径； 
3.选择just me即可； 
4.尽量不要安装最新版本！（2018.11.26装的最新的5.3.1没出现任何问题）

## Pandas matplotlib无法显示中文
*   github的帖子,pandas无法显示中文的问题[https://github.com/mwaskom/seaborn/issues/1009](https://github.com/mwaskom/seaborn/issues/1009)
*   CSDN，[http://blog.csdn.net/FontThrone/article/details/75042659](http://blog.csdn.net/FontThrone/article/details/75042659)

## Jupyter notebook更改起始目录
网上试了各种方法都没用，我的解决办法： 在Anconda3\\Scripts下面找到jupyter-notebook.exe，用它新建快捷方式，Jupyter的图标在Anaconda3\\Menu下面(`%USERPROFILE%\Anaconda3\Menu\jupyter.ico`)，取代原来在开始目录的那个用jupyter-notebook-script.py建立的快捷方式，然后起始目录改成你想要的目录就OK了，原来的快捷方式你如何改都是不行的。

## Jupyter notebook更换主题
Jupyter notebook的默认主题太丑了，可以利用jupyterthemes更换主题，直接pip安装即可。
但是安装的时候报错：
```
Cannot uninstall 'notebook'. It is a distutils installed project and thus we cannot accurately determine which files belong to it which would lead to only a partial uninstall.
```
根据报错信息来看应该是notebook的版本过低不支持jupyterthemes插件，所以在安装jupyterthemes之前需要更新notebook，但是由于无法卸载旧版本的notebook以至于无法更新。
经百度，发现解决办法：`pip install --ignore-installed notebook`，可还是报错：
```
Could not install packages due to an EnvironmentError: [WinError 5] 拒绝访问。: 'c:\\users\\wang\\anaconda3\\Lib\\site-packages\\markupsafe\\_speedups.cp36-win_amd64.pyd'
Consider using the `--user` option or check the permissions.
```
终极解决方案：
```
pip install --user --ignore-installed notebook
```


## matplotlib绘图窗口
今天画图的时候发现没有出现绘图窗口直接在终端显示，图片太小看着很不舒服，百度了下， 
```
终端显示图片: In [1]: %matplotlib inline 
图片窗口显示图片: In [2]: %matplotlib qt 
```
执行`%matplotlib qt`之后报错提示我没有PyQt4这个包，那就装呗。注意要安装的是PyQt4，而不是PyQt5。为什么要强调这个，是因为大家如果用过Python的第三方绘图库matplotlib和seaborn时，就会发现这两个库都是依赖PyQt4的（先不管PyQt5是干什么的，反正这里需要的是PyQt4，而不是PyQt5如果你安装了PyQt5但是缺少PyQt4,还是用不了）。 一般来说，如果是使用Anaconda3作为Python的解释器的话，它里面的包含的Python版本是包含PyQt4的，可以使用conda list查看（本人使用时自带的Python3.6的版本）。如果因为某些意外，导致PyQt4不小心被卸载的话，你在使用上面说的两个库时，它是报错说是`No module named PyQt4_`，或者缺少PyQt4.GUI、PyQt4.Core等等。网上解决这类问题的常见方法主要有以下几种： 
* 在官网直接下载PyQt4的windows installers版本，也就是exe文件，直接安装即可。但是不幸，貌似官网改版了后我反正没有找到现成的针对Python3.6的、windows ×32或者×64的版本。 现在官网发布的window的版本下载后是一个解压版，但不是直接可以用的，而且需要重新make安装，比较麻烦。 
* 常用的pip或者conda自动安装，并不会发现有针对windows平台的现成的资源存在。 
* 直接下载.whl。

这里选择第三种方法，下载地址在[这里](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyqt4)， 这里可以选择不同的Python版本、windows 64bit或则32bit,很方便。下载后，可以将该文件放到Python的安装目录下，然后在cmd或者anaconda prompt下cd 进入到该目录，输入命令,例如：`pip install PyQt4-4.11.4-cp36-cp36m-win_amd64.whl`，等待安装完成即可。然后执行：`import seaborn as sns` 或者`import matplotlib.pyplot as plt`。执行`pip install PyQt4-4.11.4-cp36-cp36m-win_amd64.whl`，如果报错：
```
PermissionError: \[Errno 13\] Permission denied: ‘c:\\anaconda3\\Lib\\site-packages\\xxxx.pyd’，
```
即在操作某 xxxx.pyd 文件时发生权限问题。 打开windows的任务管理器（task manager），关闭一切与 python 相关的进程，重新下载安装。 此时还会报错：
```
Requirement already satisfied: PyQt4==4.11.4 from file
```
这是因为你上一次虽然没成功但是anconda里面里面已经有了关于pyqt4的文件夹，去这个路径下面`c:\\users\\wang\\anaconda3\\lib\\site-packages`，然后把名称里面带有pyqt4的文件夹都给删了就行了。
## 
今天用Spyder画图的时候发现图片只能显示在终端，之前查到的解决办法是：
```
 终端显示图片: In \[1\]: %matplotlib inline 
 图片窗口显示图片: In \[2\]: %matplotlib qt 
```
可是这次输入`%matplotlib qt`之后再运行画图程序就一直在运行中，根本停不下来。。。重新打开再试还是不行。 于是又打开了IPython，运行画图程序，画图窗口正常打开，白痴的我输入了`%matplotlib inline`，然后报错：
```
UnknownBackend: No event loop integration for 'inline'. Supported event loops are: qt, qt4, qt5, gtk, gtk2, gtk3, tk, wx, pyglet, glut, osx 
```
接着我又输入了`%matplotlib qt`，提示Warning: 
```
Cannot change to a different GUI toolkit: qt. 
Using qt5 instead. 
```
换成`%matplotlib qt5`之后可以了，Spyder这个问题是解决不了了，是在懒得重装了，以后需要输出图片的时候就在IPython里面运行好了，但是！！！ 在用IPython绘图之前一定要先运行`%matplotlib qt5`，不然运行之后啥也没有，图片根本出不来。