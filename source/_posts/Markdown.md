---
title: Markdown
abbrlink: markdown
date: 2019-12-15 15:03:44
tags: Markdown
categories: Tools
---

## reveal.js和Markdown Preview的冲突
上个部分提过，reveal-md渲染md时长公式无法显示的问题可以通过将字体改小解决。然而，在设置sublime的Markdown预览插件&mdash;Markdown Preview的时候却发现在reveal-md中显示正常的md文件出现了奇怪的斜线和括号：
![](http://storage.jingwang.site/img/20191217135319.png)

md文件如下：
```
## Chapter 1
<font face="TimesNewRoman" size=5>
$${f(x)=a_nx^n+a_{n-1}x^{n-1}+a_{n-2}x^{n-1}}$$
$$^{C}_{t_0}D^{\alpha}_tf(t)=\frac{1}{\Gamma(n-\alpha)}{\int_{t_0}^{t}{\frac{f^{(n)}(\tau)}{(t-\tau)^{\alpha-n+1}}}d{\tau}}$$

</font>

[<](#/)
```
通过一番调整，发现如下代码可以正常显示：
```
## Chapter 1
<font face="TimesNewRoman" size=5>

$${f(x)=a_nx^n+a_{n-1}x^{n-1}+a_{n-2}x^{n-1}}$$

$$^{C}_{t_0}D^{\alpha}_tf(t)=\frac{1}{\Gamma(n-\alpha)}{\int_{t_0}^{t}{\frac{f^{(n)}(\tau)}{(t-\tau)^{\alpha-n+1}}}d{\tau}}$$

</font>

[<](#/)
```
但上边的代码在reveal-md中公式又以源代码的形式显示，无论将字体改再小也不行。

最后总结了如下规律：对于reaveal-md，`<font face="TimesNewRoman" size=5>`后面一定要紧跟内容而不能空行，同时两个行间公式之间也不能有空行。若是行内公式，`<font face="TimesNewRoman" size=5>`后面以及公式之间则允许有空格。`</font>`如何放无所谓。此外，`</font>`
和`[<](#/)`之间要有空行，否则跳转符将无法正常显示。对于Markdown Preview，`<font face="TimesNewRoman" size=5>`后面，行间公式之间以及`</font>`前面均不能有空行。

## 添加空白行
```
半方大的空白用&ensp;或&#8194;
全方大的空白用&emsp;或&#8195;或<br>或</br>
不断行的空白格用&nbsp;或&#160;
```
注意html中`<br>`没有结束标签。
其实不同的Markdown编辑器或者博客都不同，有的回车不可以添加空白行，有的却可以，但只能添加一行，也就是无论你打多少个回车(大于1)显示效果总是空一行，hexo-hiker就是这样。

## 在Markdown中使用html语法
注意，一旦在Markdown中使用html语法，那么html中的内容则完全受html语法作用而不受Markdown语法作用。 其实可以不用结束标签，带有html标签的内容后只需空一行便可回归Markdown语法。

## 居中
`<center>要居中的内容</center>`

## 多行公式单行显示
在latex里面，使用`\\`便可将公式分为多行，然而`\\`在reveal.js中不起作用，查看源码发现`\\`均被转义为`\`，可以通过`\\\\`解决，也可以像上文所说的那样公式显示一出问题就在公式两端加上"`"，但是总觉得有些不爽。发现sublime的Markdown预览插件MarkdownPreview的预览文件中公式换行是正常的，又想到了之前不是通过修改reveal.js中调用mathjax的相关设置成功解决了公式无法自动编号的问题，就尝试用MarkdownPreview中有关mathjax的设置去替换reveal中的设置，MarkdownPreview中设置如下：
```
MathJax.Hub.Config({
  config: ["MMLorHTML.js"],
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    processEscapes: true,
    processEnvironments: true,
    ignoreClass: ".*|",
    processClass: "arithmatex"
  },
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js"],
    TagSide: "right",
    TagIndent: ".8em",
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "AMS",
    },
    unicode: {
      fonts: "STIXGeneral,'Arial Unicode MS'"
    }
  },
  showProcessingMessages: false,
  messageStyle: 'none'
});
```
然而还是无效，之后发现了这篇[文章](http://kubicode.me/2016/03/18/Hexo/The-Trick-about-Hexo-Support-MutliLine-Equation-using-Mathjax/)，里面提到在hexo中遇到了同样的问题，猜测是maked.js中将反斜杠转义所致。试了下我的hexo，同样无法显示。这样看来应该不是reveal.js的问题，而是marked.js或者Markdown.js的问题，博主说若去掉反斜杠转义可能会造成其他问题，所以现在要么`\\\\`要么两端加```(注意这种方法只使用于reveal.js而不适用于hexo)。

## 添加图片标题
`<center>图片标题</center>`

## 标题的写法
Markdown的标题有Setext和Atx两种写法：`===`相当于`#`，`---`相当于`##`。hexo里面`=`和`-`的数量要大于等于2才有效果，我习惯用3个。

另外，注意在md文件中不能用一级标题`#`，因为文章标题即一级标题，已经占用了`h1`再使用一级标题页面中便会出现多个`h1`标签，而这并不规范，也不利于SEO优化。

更新：自从知道自己之前用的`---`写法比较小众之后就开始用`##`了，但是对于一个强迫症来说一篇文章中标题的写法却不统一是难以忍受的，于是便写了个Python脚本将`---`全部转换为了`##`，代码可在[此处](https://gist.github.com/JingwangLi/cbddb820b3a728ae4cd8fd392042b3f2)获取。

>[Markdown 标题](https://www.w3cschool.cn/markdownyfsm/ryj1e2.html)
>https://www.metinfo.cn/faq/2447.html

## Markdown Preview换行问题
发现Markdown Preview需要两个回车才可以换行，应该是个bug。

更新：与Markdown Preview的维护者交流后得知这并不是bug，而是Markdown的标准语法，我之前所认为正确的语法其实是不规范的，当然，这也说明很多渲染引擎的Markdown语法都不尽相同。Markdown的标准语法中，段落之间通过一个或多个空白行分开，段内换行需要在行末添加两个或多个空格，更具体的Markdown语法可参考[这里](https://daringfireball.net/projects/markdown/syntax)。因此我之前通过两个回车换行其实是换段，间距自然比正常大了不少。

同时Markdown Preview的维护者也给了我一些解决该问题(即回车换行)的建议，在其建议下，我最终利用[nl2br](https://python-markdown.github.io/extensions/nl2br/)成功实现回车换行，具体步骤可参考[另一篇文章](https://jingwang.site/posts/sublime-text.html#Markdown-Preview)。
