---
title: C++学习笔记
tags:
  - C++
  - Notes
categories:
  - C++
keywords: C++
abbrlink: cpp
date: 2017-10-29 15:37:07
---

## 各种弱智bug
* return a++

## C++中的引用
北大C++MOOC的两道作业题，感觉挺有意思，如下：
```cpp
#include <iostream>
using namespace std;
void a(int a,int b){
	c = a + b;
}
class A
{
	public:
	int x;
	int getX() { return x; }	
};
void swap(A &a,A &b){
	int  tmp = a.x;
	a.x = b.x;
	b.x = tmp;
}
int main()
{
	A a,b;
	a.x = 3;
	b.x = 5;
	swap(a,b);
	cout << a.getX() << "," << b.getX();
	return 0;
}

```
这个很简单，就是引用最基本的应用，直接引用a,b，交换类的x变量即可，难一点的是下面这个：
```cpp
#include <iostream>
using namespace std;
void swap(int *& a,int *& b)
{
 	int * tmp = a;
	a = b;
	b = tmp;
}
int main()
{
	int a = 3,b = 5;
	int * pa = & a;
	int * pb = & b;
	swap(pa,pb);
	cout << *pa << "," << * pb;
	return 0;
} 
```
这个题刚开始我觉得swap函数是交换指针变量pa,pb中存放的地址，然后写的是int *a,int *b，可是结果没变，后来一看这不是傻B了吗，如果要用指针交换变量的值的话主函数里面应该是swap(&pa,&pb)，因此swap交换的应该还是a,b的地址，那么swap(int *& a,int *& b)就相当于形参a,b引用了a,b变量的地址，然后在函数里面直接交换变量a,b的地址，个人是这么理解的。

## C/C++数组初始化
之前听老师讲C语言的时候学会了一种数组初始化的方法如下：
```cpp
int a[4]={0};
```
超级方便是不是，可以把a中的元素全部赋值为0，但是！！！如果是这样：
```cpp
int a[4]={-1};
```
我的本意是想将数组内元素全部初始化为-1，并且一直以来都想当然的以为的确如此，可是今天晚上刷题时一直Segment Fault，找了半天原来问题出在这里。。这条语句并不能把数组内元素全部初始化为-1，而是-1,0,0,0！！！ 全部初始化为0的那行代码确实是没问题的，可以正常工作。问题就出在想把数组全部初始化成一个非0的数，即非默认值，是行不通的。这倒不是因为编译器对初始化为0给了个后门，而是因为一条基本语法规则： **数组初始化列表中的元素个数小于指定的数组长度时，不足的元素补以默认值。** 对于基本类型int来说，当然就是补int()即0了。

## C++中的二维数组传递
```cpp
#include <iostream>
using namespace std;

/*传二维数组*/

//第1种方式：传数组,第二维必须标明
/*void display(int arr[][4])*/
void display1(int arr[][4],const int irows)
{
    for (int i=0;i<irows;++i)
    {
        for(int j=0;j<4;++j)
        {
            cout<<arr[i][j]<<" ";     //可以采用parr[i][j]
        }
        cout<<endl;
    }
    cout<<endl;
}

//第2种方式：一重指针，传数组指针,第二维必须标明
/*void display(int (*parr)[4])*/
void display2(int (*parr)[4],const int irows)
{
    for (int i=0;i<irows;++i)
    {
        for(int j=0;j<4;++j)
        {
            cout<<parr[i][j]<<" ";    //可以采用parr[i][j]
        }
        cout<<endl;
    }
    cout<<endl;
}
//注意：parr[i]等价于*(parr+i)，一维数组和二维数组都适用

//第3种方式：传指针,不管是几维数组都把他看成是指针
/*void display3(int *arr)*/
void display3(int *arr,const int irows,const int icols)
{
    for(int i=0;i<irows;++i)
    {
        for(int j=0;j<icols;++j)
        {
            cout<<*(arr+i*icols+j)<<" ";   //注意:(arr+i*icols+j),不是(arr+i*irows+j)
        }
        cout<<endl;
    }
    cout<<endl;
}

/***************************************************************************/
/*
//第2种方式：一重指针，传数组指针void display(int (*parr)[4])
//缺陷：需要指出第二维大小
typedef int parr[4];
void display(parr *p)
{
    int *q=*p;        //q指向arr的首元素
    cout<<*q<<endl;   //输出0
}

typedef int (*parr1)[4];
void display1(parr1 p)
{
    cout<<(*p)[1]<<endl;  //输出1
    cout<<*p[1]<<endl;    //输出4,[]运算符优先级高
}
//第3种方式：
void display2(int **p)
{
    cout<<*p<<endl;           //输出0
    cout<<*((int*)p+1+1)<<endl; //输出2
}
*/

int main()
{
    int arr[][4]={0,1,2,3,4,5,6,7,8,9,10,11};
    int irows=3;
    int icols=4;
    display1(arr,irows);
    display2(arr,irows);

    //注意(int*)强制转换.个人理解：相当于将a拉成了一维数组处理。
    display3((int*)arr,irows,icols);
    return 0;
}
```