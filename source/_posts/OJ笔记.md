---
title: OJ笔记
url: 269.html
id: 269
categories: Uncategorized
abbrlink: online-judge
date: 2018-04-06 19:50:30
tags:
    - OJ
    - C++
    - Notes
---

1. 没有仔细看题目输出格式要求
2. 多次操作时忘记初始化数组
3. 多个逻辑表达式并列时漏加括号
4. 偷懒把逻辑表达式放在for循环头部，如下：
```cpp
//我想的是对每一步判断 i != p，为真时执行操作
//放这儿的话一旦不满足循环直接结束了，不能偷懒啊!!!
for(int i = 0;i < 5 && i != p;i++){
```
5. 边界条件考虑不充分
6. maxn 定义错误，看清题目说明
7. 个别字母打错，一定要仔细仔细再仔细
8. 漏掉 &
9. 二维数组列标超出导致下一行值改变
10. 如果 putchar 里面错误的放多个字符则会输出最后一个
11. 读取大量字符（例如地图、棋盘等）应使用 scanf("%s",s) 或 getchar()
12. 将二进制转化为十进制：
```cpp
v = v*2 + reaadchar() - '0'
```
是 “=”,不要写成“+=”了！
13. 不要使用index，STL里面有定义，换成idx吧
14. if 分支下多条语句忘加大括号
15. 数据读取：
```cpp
abcfbc         abfcab
programming    contest 
abcd           mnp

while(scanf("%s %s",a,b) == 2)
```
