---
title: Java学习笔记
abbrlink: java
date: 2019-07-21 19:20:04
tags:
    - Java
    - Notes
categories:
    - Java
---

## 更换Eclipse控制台语言
在利用eclipse编写java程序时，发现控制台的所输出的报错提示为中文，这令人很不习惯。其实，控制台的显示语言和你用什么IDE并没有关系，而和jdk或jre有关系，因为java代码的编译和执行都是通过jdk或者jre来完成的（jre相当于jdk的一个子集），所以更改控制台语言，其实就是更改jdk的显示语言。
google后得知，jdk的显示语言是根据电脑所装系统的语言而自动选择的，你自己无法进行设置。于是我尝试在控制面板中更改电脑语言、区域等，然而并没有达到期望的效果，反而是原来显示的中文字符都变成了乱码，而英文字符还和以前一样，因此该方法不可行(后来得知，这是由于我的操作系统是win10家庭中文单语言版，语言只能选择中文，即使你更改了区域等设置也不行。我猜测如果是家庭版或者专业版的话修改操作系统语言可能是可行的)。
第二种方法是:
```git
在命令行下，进入你的jdk安装目录下的bin目录下输入命令 
比如d:\jdk150\bin ,输入以下命令： 
javac -J-Duser.language=en 为英文 
javac -J-Duser.language=zh 为中文了 
如果还不行，用暴力方法。 
请打开 \lib\tools.jar包,删除下面两个类：com\sun\tools\javac\resources\compiler_zh_CN.class 
和com\sun\tools\javac\resources\javac_zh_CN.class
```
使用该方法后，在命令行执行javac命令时可以显示英文，然而在命令行执行java命令或者控制台显示的仍然是中文。原因很简单，该方法只是删除了javac的中文类，自然对其他方法（如java、javaw）没有影响，而eclipse执行java代码的时候使用的便是javaw.exe，因此该方法也不可行。
第三种方法是添加一个环境变量:
```git
JAVA_TOOL_OPTIONS: -Duser.language=en
```
该方法可以解决此问题，然而又带来了一个新的问题，就是在每次执行java代码之后后面总会跟一句：
```git
Picked up JAVA_TOOL_OPTIONS: -Duser.language=en
```
而这让我一个强迫症真的受不了，也没其他办法了，中文就中文吧。