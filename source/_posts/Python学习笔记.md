---
title: Python学习笔记
tags:
  - Python
  - Notes
url: 124.html
id: 124
categories:
  - Python
keywords: Python
abbrlink: python
date: 2017-10-27 21:55:16
---

## Python中is和==的区别
Python中的对象包含三要素：id、type、value。其中id用来唯一标识一个对象，type标识对象的类型，value是对象的值。

is判断的是a对象是否就是b对象，是通过id来判断的，==判断的是a对象的值是否和b对象的值相等，是通过value来判断的。所以如果你要比较两个值是否相同就用==,如果比较是否是同一个对象就用is，其实python中的is比较的对象很像C语言中的指针,只有地址相同的指针才是同一个指针。

## enumerate函数
当需要同时遍历索引和元素的时候，使用enumerate函数比较方便。
```Python
a=['this','is','stupid'];
for i,j in enumerate(a,1):
    print(i,j)
```
第二个参数是自定义索引初始值。

## 字符串转化为List
```Python
print(list('Life is short, you need Python.').count('Li'))
// 0
```
python中字符串转化为list时list内元素是单个字符而不是按空格划分的单词。

## 判断Series/dataFrame中是否存在某个元素
```Python
from pandas import Series, DataFrame
data = {'language': ['Java', 'PHP', 'Python', 'R', 'C#'],
            'year': [ 1995 ,  1995 , 1991   ,1993, 2000]}
frame = DataFrame(data)
frame['IDE'] = Series(['Intellij', 'Notepad', 'IPython', 'R studio', 'VS'])
'VS' in frame['IDE']
frame['year'][2]
```

## Python中的sys.argv
今天晚上被sys.argv[]搞懵逼了，一直报错list index out of range,还觉得奇怪代码里面N = int(sys.argv[1])到底是干嘛的，原来是在命令行执行师输入参数N用的。。在命令行执行时输入python *.py 参数1，带参数执行即可，不能在解释器里面执行。

## lambda函数
lambda函数一般是在函数式编程中使用的。通常学习的C/C++/Java等等都是过程式编程，所以不常接触lambda函数。 其实这货在C++中已经有所运用了，如果对stl的迭代器比较熟悉的话，就会知道里头的foreach等函数，需要给一个函数，这对于C/C++这种古老的语言来说比较痛苦，一般是在主函数外再写一个函数，然后传入函数指针，看起来非常不直观。boosts用一些特殊的语法技巧实现了C++的lambda。 举个栗子，对于这样一个list L，求L中大于3的元素集合：
L = [1, 2, 3, 4, 5]

对于过程式编程，通常会这么写
```python
L3 = []
for i in L:
    if i > 3:
        L3.append(i)
```
而对于函数式变成，只需要给filter函数一个判断函数就行了
```python
def greater_than_3(x):
    return x > 3
L3 = filter(greater_than_3, L)
```
由于这个判断函数非常简单，用def写起来太累赘了，所以用lambda来实现就非常简洁、易懂
```python
L3 = filter(lambda x: x > 3, L)
```
这是个很简单的例子，可以看出lambda的好处。lambda函数更常用在map和reduce两个函数中。 当然，lambda函数也不见得都好，它也可以被用得很复杂，比如这个问题 [http://segmentfault.com/q/10100000001...](http://segmentfault.com/q/1010000000131575 "http://segmentfault.com/q/10100000001...")的答案，可以用python这样一句解决，这个lambda函数看起来那的确是挺辛苦的。
```python
from itertools import product
map(lambda p: ''.join(i + j for i, j in zip('abcd', p)) + 'e', product(\['.', ''\], repeat = 4))
```

## Python读取文件时的相对路径
```python
## wrong: 首个文件夹前面不用加斜号
with open('\\rewards\\hs.txt', "r") as f:
    s = f.read()
    
## right:
with open(r'rewards\hs.txt', "r") as f:
    s = f.read()
    
## right:
with open(r'rewards\hs.txt', "r") as f:
    s = f.read()
with open('rewards\\hs.txt', "r") as f:
    s = f.read()
with open('rewards/hs.txt', "r") as f:
    s = f.read()
```

## Python文本读写
Python在读取文本文件时的默认编码似乎是`ANSI`，因为今天读取一个md文件时(未指定编码)提示`gbk`解码错误，如果遇到解码错误的话将编码指定为'utf-8'即可。
读取一般用`r+`，写入`w+`，无论文件是何种格式均无影响。
>https://www.cnblogs.com/xiugeng/p/8635862.html#_label2
>https://www.yiibai.com/python/file_write.html
>https://blog.csdn.net/ztf312/article/details/47259805