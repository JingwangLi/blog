---
title: reveal.js
abbrlink: reveal-js
date: 2019-12-25 13:39:47
tags: 
  - JavaScript
  - css
categories: Tools
---

## 长公式无法显示
发现某个公式latex上正常执行但是reveal-md却显示为源代码，且将此公式拆成两部分，两部分均可以正常显示，最后发现是由于公式较长且字体较大，由于无法显示完全故显示为源代码，将字体改小即可。
更新：发现不是由于字体改小而是由于改小字体所用的是html语法，如果公式被html标签包围，则无论字体多大都可以正常显示，如果通过主题css文件将字体改再小还是源代码。总的来说，若出现公式显示的问题便可尝试将公式用html标签包围。
再次更新：公式显示问题可能是由于markdown和latex发生冲突，可按照reveal.js官方文档中的办法，在公式两端加上"`"，如下所示：
```
`$$ J(\theta_0,\theta_1) = \sum_{i=0} $$`
```

## 左对齐
reveal.js默认是所有内容均居中，对于有些presentation肯定是不合适的。
```
<style type="text/css">
  .reveal p {
    text-align: left;
  }
  .reveal ul {
    display: block;
  }
  .reveal ol {
    display: block;
  }
</style>
```
将其加入md文件中的效果是正文(除了行间公式)左对齐，但正文中的标题居中显然更好，
```
* 标题1
* 标题2
```
如果在所使用主题的css文件中加入如下代码便可实现上述效果(正文中除了行间公式和文中标题以外左对齐)。
```
  .reveal p {
    text-align: left;
  }
```

## 公式自动编号
reveal.js无法对公式进行自动编号，同时`Reveal.initialize`也没有是否打开公式自动编号的选项，可在`\reveal.js-3.8.0\plugin\math\math.js`中加入如下代码以实现自动编号：
```
    var defaultOptions = {
        messageStyle: 'none',
        tex2jax: {
            inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ] ],
            skipTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
        },
        skipStartupTypeset: true,
        TeX: { equationNumbers: { autoNumber: "AMS" } } //我自己加的 公式自动编号
    };
```
后期准备提交个PR加个自动编号的选项。

## 引用公式时多出指向第一页的链接
尚未解决。

## 行内公式无法显示
只要出现公式显示的问题均可以用加"\`"解决，如果是行内公式出问题加无法解决，则可以考虑给他周围的行内公式加"`"，若其上边有行间公式，也可考虑空一行，一般是可以解决的。

## `x^{*}`经常会报错
尚未解决。

## 图片居中显示
修改主题css文件，如下：
```
.reveal section img {

  /*margin: 15px 0px;*/
  /*下面两行是图片居中显示*/
  display: block;
  margin:0 auto;
  background: rgba(255, 255, 255, 0.12);
  border: 4px solid #222;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }
```

## 无法输出PDF
试试`DEBUG=reveal-md reveal-md slides.md --print`，注意这是Linux命令，需要在git bash中运行。一般而言是puppeteer的问题，可能是chromium版本的问题，可以在别处新安装一个puppeteer，然后取代reveal-md中的puppeteer，注意，仅取代eveal-md中的puppeteer中的chromium是不行的，这可能是因为puppeteer中有些设置和chromium的版本是对应的。