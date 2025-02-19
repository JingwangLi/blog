---
title: win10问题汇总
url: 379.html
id: 379
categories:
  - Tools
abbrlink: windows-10
date: 2018-11-17 23:26:36
tags:
---

## 知网下载文献文件名乱码
win10 1803系统,使用chrome和Edge在知网下载的文献文件名都是乱码，应该是中文编码问题，解决方法在[这儿](https://sspai.com/post/44360)。 
改了下代码，可以一次性修改目录下的所有文件。
```python
import sys, os

path = "D:\\graduate\\Mobike" # 路径改为你存放文献的路径
for file_name in os.listdir(path):
    name = os.path.join(path, file_name)
    print(name)
    try:
        os.rename(name, name.encode('latin1').decode('gbk'))
    except:
        continue
```

## win10连接蓝牙耳机后无声音
我的一个蓝牙耳机一直存在这样一个问题：通过蓝牙与电脑连接后耳机没有声音，音视频的播放仍然是通过电脑的扬声器。之所以之前没有关注这个问题是因为只有其中老电脑存在这个问题，而新电脑则没有这个问题，也就将就用了。
今天又试了一下，仍然不行。但是这个耳机和新电脑连接时正常，而我的另一个蓝牙耳机和老电脑连接时也是正常的，这说明这个蓝牙耳机和老电脑的硬件均没有问题。
在连接该蓝牙耳机后，电脑的蓝牙界面显示的有时候是“已连接”，有时候是“已连接的语音”，而正常状态下应该是“已连接的语音、音乐”。在显示“已连接”时，可选的播放设备（点击小喇叭按钮）仅有电脑扬声器，在显示“已连接的语音”时，可选的播放设备有电脑扬声器和耳机（XXX Hands-Free）。如果选择耳机（XXX Hands-Free）作为播放设备，虽然耳机确实有了声音，但声音特别刺耳。 
然而在正常状态下，电脑的蓝牙界面应该显示的是“已连接的语音、音乐”，可选的播放设备应该有电脑扬声器、耳机（XXX Stereo）和耳机（XXX Hands-Free）。其中，Stereo代表立体声，平常播放音视频便应该选择该模式，Hands-Free代表免提，为通话模式。所以，如果你选择Hands-Free模式的话，声音就会特别大且粗糙。
因此，猜测可能是电脑的蓝牙驱动有些问题，更新了蓝牙驱动还是不行。最终通过重装蓝牙驱动解决了问题，其中蓝牙驱动是在该电脑厂商的官网获得，具体的蓝牙驱动程序有三个：Intel、Broadcom和Atheros，他们的具体功能不是很清楚，不过在重装完第二个驱动之后问题便解决了。

## 新建reg文件
不要使用sublime新建reg文件，编码有些问题，直接用记事本，最后选择**保存为所有文件**，文件名为xx.reg即可，为避免注册表项乱码乱码最后要选择uft-16LE(即unicode)编码。
另外，右键菜单在注册表中的路径为：
```
计算机\HKEY_CLASSES_ROOT\Directory\Background\shell
```

## win10截图快捷方法
可参考此[文章](https://zhuanlan.zhihu.com/p/33831541)。
推荐其中的`Win+Shift+S`方法，保存路径为`C:\Users\用户名\AppData\Local\Packages\Microsoft.Windows.ShellExperienceHost_cw5n1h2txyewy\TempState\ScreenClip`。

## win10邮件应用配置
发件箱和已发送邮件的区别：发件箱中是在发送中的邮件，而已发送邮件是已经发送成功的邮件。发现只有客服端才有发件箱这种东西，而网页版邮箱都没有，可能是由于网页版邮箱会显示是否发送成功的状态，而客户端没有，所以加个发件箱来告诉你发送状态吧。

起初发现win10邮件应用发送outlook邮件但qq邮箱却收不到，最后发现是进垃圾箱了，太坑了实在是。至于添加其他邮箱，比如foxmail，首先要注意的是，填的密码不是邮箱密码而是邮箱服务商给你的POP3或者IMAP协议的授权密码。其次，如果按照qq邮箱官方的设置方法(只有foxmail和outlook客户端的设置方法，需要选择收发服务器和端口号什么的，我起初就是仿照其设置win10邮件的，结果不行）或者网上说的方法，在“高级设置”中添加，不但需要填一大堆东西，而且最后会提示你“账户设置过期，需要更新密码或授权账户登录到此设备的权限”，任你怎么输入密码都不行。我自己摸索出来的方法是：在“其他账户”中添加。只需要填邮件地址和授权密码即可，也不用选择协议类型或者设置端口号什么的，它会自动设置。我很好奇它是怎么确定到底是POP3或者IMAP协议的，反正你什么也不用设置就可以正常收发邮件。最后发现，即使你输入的POP3协议的密码，它的接受服务器和端口仍然是对应于IMAP，但是竟然可以正常收发邮件。。。不过我用的IMAP协议，所以也无所谓。

还有一个问题是，outlook邮箱非常令人无语，你无法随意设置发件名称，只能修改用户名，而且，它会根据你选择的语言类型自动显示姓在前或在后，所以如果你想安装英语习惯使发件名中姓在前的话，要么选择语言为英文，要么在个人信息中将姓填在名字一栏，名字填在姓一栏。。。不仅如此，无论是你改用户名或更改语言，它都会延迟好久(据说一个小时以上)才会更新过来，我以为我忘了保存，重新设置了好几遍。。。而且第一种方法我不确定是否管用，因为即使你将网页版邮箱的语言改为英文，但是系统是中文版的话，极有有可能win10邮件(该应用中并无切换语言的设置)中的发件名还是姓在前，除非你将系统语言切换为英文。

更新：发现不论在任何语言、任何输入法下输入的标点符号全是中文符号，无法输入英文标点符号。在标题栏是可以正常输入英文标点符号的，但正文中就不行。我尝试了我的两台电脑，均是一样的情况，在任何输入法的英文输入模式下输入的标点符号都是中文的，包括单引号和双引号。

更新：突然发现Foxmail账户中之前的邮件都没了，无论是发件箱还是收件箱都是空空如也，但是收发邮件也正常，在网页版邮箱中邮件也还在，推测可能是由于客户端会定期清理微软之外的邮箱账户中的邮件，因为在`设置->邮件列表->轻扫操作`一栏中有如下提示：
```
以下账户不允许你存档：
Foxmail
这些账户的电子邮件将被删除。
```

## win10设置开机自启动

将需要设置自启动的应用的快捷方式复制到`C:\Users\Wang\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`，注意上述方式适用于我的两台电脑，而`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`则只适用于其中一台电脑。

## 无法修改hosts文件
尝试了以管理员身份运行sublime然后再把hosts文件拖进去，不知道为什么sublime打不开(具体而言，是拖过去圆圈转一会儿就什么反应都没了，右键打开也是这样)。又试了管理员身份运行记事本保存不了，记得之前明明可以的。
最后，在hosts所在位置以管理员身份打开PowerShell，运行`notepad hosts`，然后会自动用记事本打开hosts文件，再进行修改就可以保存了。

>[解决在Windows10没有修改hosts文件权限](https://blog.csdn.net/QQ724949275/article/details/80343445)

## 右键新建md文件
网上很多教程都是这样，建立如下的.reg文件，然后执行，重启即可：
```git
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\.md\ShellNew]
"NullFile"=""
"FileName"="temp.md"
```
但是我执行重启了好几次仍然无效，最后发现[这位博主](https://www.brothereye.cn/windows/479/)的方法是有效的，如下：
```git
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\.md]
@=".md"

[HKEY_CLASSES_ROOT\.md\ShellNew]
"NullFile"=""
"FileName"="temp.md"
```
其实只改动了一处，.md项的值应该设置为.md，如下图所示：
![](http://storage.jingwangli.com/img/20191215151236.png)
而别的教程中对此项的数值并无设置所以导致失败，一般来说其初始值是“数值未设置”或者".md_auto_file"。右键建立其他类型文件的方法也是一样的，只需把.md改为.xx即可，注意，其实**不需要重启**即可生效。

## 无法修改默认输入法
由于搜狗输入法的流氓行为使得设置始终无法生效，卸载搜狗输入法即可。

>https://sspai.com/post/56697
>https://51.ruyo.net/15984.html