---
title: Hexo
categories: Tools
abbrlink: hexo
date: 2019-04-17 20:08:31
tags: 
    - Hexo
---

## 设置新建文章的默认信息
新建文章的默认信息可以在D:\blog\scaffolds路径下的post文件中进行修改，注意：一定要在blog路径下的scaffolds中的post文件中修改才有效，在node_moudules目录下同样有scaffolds，但是在其中修改是无效的。

## 添加图床
本来打算用七牛云，然而七牛云的测试域名的有效期变成了一个月，除非你用备案过的域名，所以选择用Github和PicGo(图床管理工具)，其实就是新建一个github repository用于存储图片。
设置完PicGo后死活无法上传，一直提示服务端错误，最后发现还是设置的问题，仓库名一栏应该填“Github用户名/仓库名”而不是仅仅一个仓库名。还有自定义域名是没有意义的，如果你真的自定义了那么图片的外链链接就是404，能定义的域名据我目前所知只有两种:`http://github.com/JingwangLi/Repository/raw/master/`和`https://raw.githubusercontent.com/JingwangLi/Repository/master/`。

一直有一个想法，就是利用类似图片的方法生成pdf的外链，我所希望的效果是若点击链接浏览器会打开一个新的空白页面展示该pdf。如果直接利用Github里面的[链接](https://github.com/JingwangLi/Repository/blob/master/pdf/OLFieeetac04.pdf)，所打开的界面类似Github的代码界面只是内容换成了pdf而已，而利用类似图床的[链接](http://github.com/JingwangLi/Repository/raw/master/pdf/OLFieeetac04.pdf)的话则点击链接会直接下载而不会打开新界面，暂时未找到能达到我所希望的效果的方法，只得选择点击下载这种效果。

更新：已找到解决办法，可使用gh-pages实现，是看到[该博客](http://egrcc.github.io/resources/)后请教博客作者知道的。注意，新建库的库名最好小写，因为虽然在github中直接访问的话不区分路径的大小写(即字母大小写都可以正常访问)，但在博客中引用的时候是区分大小写的，如果大小写不对将无法访问资源，而网址中有大写又有些丑，所以新建库库名最好大写。

## 来必力评论bug
在不改变作者本身的代码当中使用的livere_shortname也就是来比力的uid的情况下评论是可以正常显示的，但是由于是作者的uid所以我们无法收到评论提醒。那么我就想改成自己的uid，但是改了之后发现你在某个界面评论之后再刷新会发现评论不见了，然而来比力的系统后台上面显示是有评论的，之后我又注册了新的来比力账号试了试也不行，又试了试有些可以正常显示评论的博主的来比力的uid(网页源代码中有)也不行，只有使用作者的uid才行。后来想到作者在来必力后台里面的域名是他自己的而不是我的域名，所以尝试将我自己的来比力后台里的域名改成了其他试了试还是不行，其实很正常，因为前面说了其他博主的uid也不行，而他们的域名也不同于我，这就彻底懵逼了，在该主题的github上提issue作者也一直没回复。

但是，我测试了所有的文章页面，发现只有[一个页面](file:///D:/blog/public/posts/f082c70.html)存在这种问题，这个页面也是我最先测试的页面。10个月之后，我想到了可以把这个页面删了再新建一个内容相同的页面看看新页面是否可以正常评论(之前怎么没想到呢)，结果真的可以，这算是一个好消息，但是这并不能说明以后的文章页面都不会出现这种问题(虽然我猜测大概率是这样)。没搞清楚真实原因还是挺难受的，也不可能以后每次发新文章的时候都要测试下评论是否正常吧?不过也没办法先这样吧。

注意，如果评论者使用来必力评论的时候如果登录的不是来必力账号而是第三方账号，那么你的回复评论者不会被通知到(也无法被通知到，因为第三方平台仅仅只给了一次登录授权)，所以评论者只能通过查看文章页面才能得知是否被回复。

## 新建page名首字母大写
新建page名若是英文，则需要在`D:\blog\themes\hiker\languages\default.yml`中添加一条`skateboard: Skateboard`，方能实现首页显示的page名首字母为大写，否则即使`D:\blog\source`路径下的page文件夹名为大写，首页仍然会显示小写。

## 新建page下放多篇文章
参考该答主的[回答](https://www.zhihu.com/question/33324071/answer/247195699)即可，注意，高赞答主的方法不可行，其实非常简单，不想高赞答主说的那么麻烦，只需在主题的_config.yml文件中的menu下面增加一条`PageName: /categories/PageName/`，便会自动多出一个PageName页面，其内容便是所有category为PageName的文章的目录，类似Archives页面，而无需手动新建一个页面。 

## 实时预览
可参考[此文章](https://blog.mutoe.com/2016/hexo-post-livereload-edit/)，安装hexo-browsersync插件即可。

更新：该插件用着用着就失效了，不知道什么时候又好了，时好时坏，不过hexo更新到4.2.0(原来是3.8.0)版本之后又可以用了，就是不知道是不是还是时好时坏。

更新：发现即使升级到4.2.0仍然时好时坏，其实是部分页面可以用而部分页面用不了，更奇怪的是有的页面刚刚还可以用编辑了一会儿就不行了，尚待解决。

>https://kleshwong.com/blog/2018/11/21/How-to-make-hexo-browsersync-working-by-solving-hexo-server-rendering-incomplete-page/

## 网站上出现了两篇一样的文章
因为修改了一篇文章的标题却忘了将原来的文章删去。

## 预览
修改主题及source内的文件可以不用重新`hexo s`即可预览，如果修改了其他地方的文件要重新`hexo s`才能预览。

## default_category
`default_category`参数仅在`permalink`中含有`:category`时起作用：`如果文章没有分类，则是 default_category 配置信息`。而不是说在`Categories`页面中多出来一个`default_categor`类别包含所有未分类的文章。

## 中英空格参数没用

>https://hexo.io/zh-cn/docs/permalinks.html

## 部分实体无法显示
可参考该[issue](https://github.com/hexojs/hexo/issues/4053)中的解决办法。

## LaTeX公式无法正常换行

## url中的分类名和标签名映射为小写
默认情况下url中的分类名和标签名与原始名字一致，而不会转化为小写。url中包含大写字母我是无法接受的，但是如果为了url小写而将分类名和标签名改为小写是我更无法接受的。这可以通过在`category_map`和`tag_map`中添加原始名字到小写的映射来解决，但每增加一个分类或者标签都要手动添加映射是在太过麻烦，准备有时间提交个PR增加`category_case`和`tag_case`参数自动将大写映射为小写。

