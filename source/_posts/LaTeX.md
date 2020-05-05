---
title: LaTeX
tags: LaTeX
categories: Tools
abbrlink: latex
date: 2019-04-17 19:53:32
---

## 编译BibTex时报错
如果要编译BibTex，需要更改LaTeXTools默认的编译方式，具体操作请参考[此博客](https://blog.csdn.net/Galoa/article/details/79587751)。
但是按上文设置好编译方式之后，在文中引用文献时一直报错：Package natbib Warning: There were undefined citations. 
最后发现是BibTex文件命名的问题，文件名称中间一定不能出现空格，否则就会出现上文中的情况。

## LaTeX-cwl无法使用
LaTeX-cwl是一个用于代码提示的插件，但是安装之后却并未出现代码提示界面，尝试过remove后重新安装、disenable后重新enable、重启sublime均未解决此问题，更换其他电脑仍是如此，尚待解决。

更新：LaTeX-cwl需要配合LaTeXing使用，所以需要安装LaTeXing。
>https://packagecontrol.io/packages/LaTeX-cwl

## LaTeXTools无法通过Package Control安装
两台电脑均无法通过Package Control插件安装LaTeXTools，只能手动安装，手动安装的具体步骤按照[官网文档](https://github.com/SublimeText/LaTeXTools)即可。其实，如果你之前安装过LaTeXTools，需要重装的话只需要将从官网下载的压缩包解压后放入指定文件夹中即可，因为卸载LaTeXTools之后相关设置并不会被清除。

按理说如果输入类似'\begin{equation}'这样的命令，应该自动补一个'\end{equation}'，但LaTeX似乎没有该功能，有时间加一个吧。

## 公式无法实时预览
今天发现公式突然无法实时预览了，鼠标放在公式末尾时报错：
ERROR: Failed to run 'pdfLaTeX' to create pdf to preview.
以为是LaTeXTools插件的问题，重装之后发现问题还是没有解决，最后发现不是插件的问题，而是公式语法错误，之前由于批量替换\alpha使得一些正确的部分被替换成错误的了，所以无法预览。

## equation, align and aligned
LaTeX代码及对应的效果如下(LaTeX中两个反斜杠即可实现换行，Markdown中四个反斜杠是因为marked.js中将反斜杠转义)：
1
```
\begin{equation}
\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}
\end{equation}
```

\begin{equation}
\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}
\end{equation}

2
```
\begin{align}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{align}
```

\begin{align}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{align}

3
```
nothing to write.$\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}$
```

nothing to write.$\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}$

4
```
\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}
```

\begin{aligned}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{aligned}

5
```
\begin{equation}
\begin{align}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{align}
\end{equation}
```

\begin{equation}
\begin{align}
x_i^{\alpha}(t) &= Ax_i(t) + Bu_i(t),\\\\ y_i(t) &= Cx_i(t).
\end{align}
\end{equation}

其中4和5在LaTeX中会报错。从上可以看出，在aligned外面套上equation会给整体编号，而仅用align会给里面的每个公式分别编号，仅用aligned(两端加上`$`)不会自动编号。在仅用aligned(两端加上`$`)的时候可以将方程组作为行内公式，若不加`$`或equation则会报错；align则相反，只能作为行间公式，若加`$`或equation均会报错。总的来说，equation只能用于单行公式，align和aligned可用于多行公式，aligned可将多行公式用于行内公式，在外面套上equation还可给公式整体编号。

## label的放置位置
```
\begin{equation} 1
\begin{aligned} 2
p^{*} =&\min _{x \in \mathbb{R}^{n}} f(x) 3 \\ \text { s.t. } \quad & A x=b 4
\end{aligned} 5
\end{equation}

\begin{align} 6
p^{*} =&\min _{x \in \mathbb{R}^{n}} f(x) 7 \\ \text { s.t. } \quad & A x=b 8
\end{align}
```
在LaTeX中，label放在8个位置都可以，而在Markdown中，label只能放在5 6 7 8，因此放在公式末尾是怎么着都没有问题的，而且我个人认为放到末尾非常规范。

## `\nonumber`放置位置
LaTeX中`\nonumber`放在`\end{equation}`前后均可，但是在Markddown中若放在`\end{equation}`后则需多加`$$`，所以最好养成放在`\end{equation}`前的好习惯。

## 多行公式对齐
注意`&`只能在align或aligned中使用。

如果