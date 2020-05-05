---
title: Sublime Text
url: 317.html
id: 317
categories: Tools
abbrlink: sublime-text
date: 2018-05-06 12:15:20
tags:
    - Sublime Text
    - Markdown
    - LaTeX
---

## 编译运行C++
具体参考这位博主的[教程](https://blog.csdn.net/shenwanjiang111/article/details/53728941)，其实Sublime自带的也能用，不过这位博主的配置可以使用cmd进行输入，更加灵活一些。 昨天晚上配置完以后用freopoen一直无法输出结果，刚刚才发现忘了把输入文件跟cpp放一起，之前一直用cb用习惯了都忘了这回事儿。

配置Sublime的cpp编译环境之后，编译时一直报错，命令行出现了大量奇怪的path，且报错界面和原始cpp编译配置一模一样，最后猜测可能是  gcc 的环境变量设置的有问题，和老电脑对照发现环境变量设置的没问题，最后看到一篇博客（之前忘了记下来刚刚找没找到）里面提到说是Sublime找不到gcc的路径，以管理员身份运行即可，果然可以了！ 这是我的cpp编译环境的配置：
```git
{
    // "shell_cmd": "make"
    "encoding": "utf-8",//如果命令行出现乱码可以采取gbk编码
    "working_dir": "$file_path",
    "shell_cmd": "g++ -Wall -std=c++0x \"$file_name\" -o \"$file_base_name\"",
    "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
    "selector": "source.cpp",

    "variants":
    [
        {
        "name": "Run",
            "shell_cmd": "g++ -Wall -std=c++0x  \"$file\" -o \"$file_base_name\" && \"${file_path}/${file_base_name}\""
        },
        {
        "name": "RunInCmd",
            "shell_cmd": "g++ -Wall -std=c++0x  \"$file\" -o \"$file_base_name\" && start cmd /c \"\"${file_path}/${file_base_name}\" & pause \""
        }
    ]
}
```

## 配置LaTeX写作环境
参考这位博主的[教程](https://blog.csdn.net/crazy_scott/article/details/79401421)即可，不过有几个问题需要注意：
* 安装mikTex的时候选择其默认安装路径即可，如果自己选择路径会出现"windows API error 5"的问题，以至于无法安装；
* 因为之前只用Sublime编译cpp一种语言，编译设置就是上边的设置，然后编译laTex的时候就报错，因为使用的是cpp的编译器，build system选择LaTeX就行了。但是回头一想这样我每次使用Sublime写不同的语言的时候岂不是都要重新选择编译器？？？就不可以根据文件类型自动选择编译器吗？当然可以了，build system选择Automatic即可，但是要注意，如果选择Automatic的话，你回头编译cpp的时候就会选择系统默认的cpp编译器，而不是你自己的个性设置。

不得不说，使用Sublime编译laTex的速度真的比mikTex自带的Texworks快多了，高亮什么的也特别好看!

## Package Control
### 安装相关包时报错
有时候使用Package Control安装相关包时会报错：There are no packages available for installation。

看了看网上的各种解决方案，根本没用，最后发现其实是网络的问题，比如我用校园网的话就会报错，但是换成手机热点就可以，于是猜测是网络的问题。然后我试了试连校园网的同时打开翻墙软件，果然可以了！但是即使Package Control可以用，也有一些包是安装不了的，恰好需要的laTex tools就安装不了，等老半天一直显示installing。。这时候就需要手动安装了，手动安装的具体步骤按照[官网文档](https://github.com/SublimeText/LaTeXTools)即可。

实际上，这是因为安装包时会用到 http://packagecontrol.io//channel_v3.json 这个文件，但是packagecontrol.io这个网址有时候无法打开，即使翻墙也不行，所以就会出现上面的问题。我们可以将这个json文件事先下载下来，然后修改设置使得原先通过网络请求文件变为直接调用本地文件，那么这个问题就可以解决了。
```git
"channels": [
    "https://packagecontrol.io/channel_v3.json" //修改前
],

"channels":
[
    "D:\\channel_v3.json" //修改后
],
```

### install package不起作用
之前说过，无法使用Package Control安装LaTexTools，但是即使无法成功安装，左下角还是会出现installing LaTexTools的提示，这次安装的时候在点击LaTexTools时却是一点反应都没有，试了下发现安装别的其他包也不行。Google后看见有人说要在setting里面将`ignored_packages`中的LaTexTools去掉，可是我的setting里面的`ignored_packages`中根本没有LaTexTools，无论是default或是user。于是我把user中`ignored_packages`这个值给注释掉了，最后重启发现install package还真的可以用了，具体原因还是没搞明白。

## 多文件内查找替换
之前听说过这个功能但是没用过，今天发现太方便了，如果之前用这个功能修改hiker主题简直省太多功夫了，快捷键`Ctrl + Shift + F`，具体可参考这篇文章`https://blog.csdn.net/weixin_42872302/article/details/81387302`。
此外，发现Sublime还支持正则表达式，使用`Alt + R`切换正则匹配模式的开启/关闭。

更新：在输入法为微软拼音时会出现查找框无法调出的问题，切换输入法即可。

更新：原来还可以搜索非文本文件内的内容，比如PDF文件，但只能确定文件中是否有搜索的内容而无法确定其在文件中的位置。

## 开启侧边栏
`View->Side Bar->Show Side Bar`或者`Ctrl+K+B`。
注意，开启侧边栏显示目录的前提是你已经在当前项目中加入了目录，否则无法开启侧边栏，除非你选择`Show Open Files`。为当前项目添加目录的步骤为`Project->Add Folders To Project`。

## 代码模板
可利用SulimeTmpl。

>https://xhl.me/archives/Sublime-template-engine-Sublimetmpl/

## Markdown Preview
### 配置文件
```

{
    "enable_mathjax": true,
    "js": [
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js",
            "res://MarkdownPreview/js/math_config.js",
    ],
    "markdown_extensions": [
        // Python Markdown Extra with SuperFences.
        // You can't include "extra" and "superfences"
        // as "fenced_code" can not be included with "superfences",
        // so we include the pieces separately.
        "markdown.extensions.footnotes",
        "markdown.extensions.attr_list",
        "markdown.extensions.def_list",
        "markdown.extensions.tables",
        "markdown.extensions.abbr",
        "pymdownx.betterem",
        {
            "markdown.extensions.codehilite": {
                "guess_lang": false
            }
        },
        // Extra's Markdown parsing in raw HTML cannot be
        // included by itself, but "pymdownx" exposes it so we can.

        "nl2br",
        // "pymdownx.escapeall",
        // {
        //     "pymdownx.escapeall": {
        //         "hardbreak": false
        //     }
        // },

        "pymdownx.extrarawhtml",

        // More default Python Markdown extensions
        {
            "markdown.extensions.toc":
            {
                "permalink": "\ue157"
            }
        },
        "markdown.extensions.meta",
        "markdown.extensions.sane_lists",
        "markdown.extensions.smarty",
        "markdown.extensions.wikilinks",
        "markdown.extensions.admonition",

        // PyMdown extensions that help give a GitHub-ish feel
        {
            "pymdownx.superfences": { // Nested fences and UML support
                "custom_fences": [
                    {
                        "name": "flow",
                        "class": "uml-flowchart",
                        "format": {"!!python/name": "pymdownx.superfences.fence_code_format"}
                    },
                    {
                        "name": "sequence",
                        "class": "uml-sequence-diagram",
                        "format": {"!!python/name": "pymdownx.superfences.fence_code_format"}
                    }
                ]
            }
        },
        {
            "pymdownx.magiclink": {   // Auto linkify URLs and email addresses
                "repo_url_shortener": true,
                "repo_url_shorthand": true
            }
        },
        "pymdownx.tasklist",     // Task lists
        {
            "pymdownx.tilde": {  // Provide ~~delete~~
                "subscript": false
            }
        },
        {
            "pymdownx.emoji": {  // Provide GitHub's emojis
                "emoji_index": {"!!python/name": "pymdownx.emoji.gemoji"},
                "emoji_generator": {"!!python/name": "pymdownx.emoji.to_png"},
                "alt": "short",
                "options": {
                    "attributes": {
                        "align": "absmiddle",
                        "height": "20px",
                        "width": "20px"
                    },
                    "image_path": "https://assets-cdn.github.com/images/icons/emoji/unicode/",
                    "non_standard_image_path": "https://assets-cdn.github.com/images/icons/emoji/"
                }
            }
        },
        {
            "pymdownx.arithmatex": {
                "generic": true
            }
        }
    ],
}
```

>https://blog.csdn.net/aiynmimi/article/details/86622567

### 自动生成目录
可在希望插入目录的地方添加`[TOC]`。

### 回车换行
Makdown Preview默认是[Markdown标准语法](https://daringfireball.net/projects/markdown/syntax)，即在行末添加两个及以上空格实现段内换行。如果希望回车换行，可利用[nl2br](https://python-markdown.github.io/extensions/nl2br/)实现，非常简单，只需在MarkdownPreview.Sublime-setting-User中的`"markdown_extensions"`中加入`"nl2br",`，而无需修改Markdown Preview的源代码。

```python
def get_config_extensions(self):
    """Get the extensions to include from the settings."""
    ext_config = self.settings.get('markdown_extensions')
    return self.process_extensions(ext_config)
```
从Markdown Preview的源代码可以看出，它是把`markdown_extensions`中的参数直接引入，所以如果要添加新的extension只需将其加入`markdown_extensions`，而无需在源代码中`import`。正由于其特殊性，所以可以在user-setting加入default-setting中不存在的内容，而对于一般的Sublime库而言，只能在user-setting加入default-setting中已经存在的内容。

在引入`nl2br`之后，发现在md文件修改后html需连续保存或刷新两次才会发生变化，重装Mardown Preview后恢复正常，目前尚不清楚是否是不小心修改了default-setting所致。

另外还有一个[EscapeAll](https://facelessuser.github.io/pymdown-extensions/extensions/escapeall/#options)可以通过在行末添加`\`实现断行。

如有其它问题还可参考Markdown Preview的维护者给我的[回复](https://github.com/facelessuser/MarkdownPreview/issues/102)。

### 行间公式前后必须有空白行
Markdown Preview中的行间公式前后必须有空白行，否则就会出错(多出奇怪的斜线(对于`$`)或者以TeX代码形式显示(对于`\begin`))，而这让我很不习惯，且有个问题是你无法把公式当做标题(其实标题中写成行内公式就好了，但是Python-Markdown目录中包含公式的标题中的公式会以TeX代码形式显示)。然而作者说这是Markdown的标准语法而不是bug，如果我要非要改变的话可以添加预处理操作或者修改Python Markdown，有时间解决一下。

更新：发现标题下方的公式不加空白行也可以正常显示。

>https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/#input-format
>https://github.com/facelessuser/MarkdownPreview/issues/103

## setting文件
Sublime中的setting文件均是JSON文件，注意JSON值可以是数字、字符串、逻辑值、数组以及对象，数组在`[]`中，对象在`{}`中。

>https://www.runoob.com/json/json-syntax.html

## 修改插件的源代码
Sublime中部分插件是只读的`.sublime-package`文件，但可以通过在`Packages`文件夹下建立同名文件夹覆盖插件源代码来间接修改。

>https://sublime-text-unofficial-documentation.readthedocs.io/en/latest/extensibility/packages.html#overriding-packages


## 部分md文件LiveReload无效
在LiveReload的user-setting里面加入如下即可：
```
{
    "enabled_plugins": [
        "SimpleReloadPlugin",
        "SimpleRefresh"
    ]
}
```

## 关闭显示编译运行信息的方框
注意这种方框和Console并不是同一种东西，Console是可以交互的。
* 按两次`ctrl + ~`。这种方法是通过打开关闭Console来"以毒攻毒"。
* 按Esc。

按Esc可以关闭大多数原本没有的弹框，如搜索框等。

>https://blog.csdn.net/o_victorain/article/details/52529473


## Markdown Editing
### 无法自动补全$
尚待解决。
Markdown Editing的github上并未发现自动补全的代码，而且发现sublime中安装的插件均是编译成二进制文件无法进行更改，这就麻烦了。

### LaTex代码显示问题
`\left<a-b, a-b\right>`中的逗号为白色，看不清楚。

## 配置JavaScript运行环境

>https://blog.csdn.net/tangxiujiang/article/details/78757468

