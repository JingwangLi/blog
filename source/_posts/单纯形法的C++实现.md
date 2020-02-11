---
title: 单纯形法的C++实现
tags:
  - C++
  - Opreations Research
url: 327.html
id: 327
categories:
  - Opreations Research
keywords: 'C++,Opreations Research'
abbrlink: 117b8ddb
date: 2018-05-07 12:24:04
---

大M法代码如下：
```cpp
// Input data:
// 3 5 2
// -3 0 1 0 0
// 1 1 1 1 0 0 0 4
// -2 1 -1 0 -1 1 0 1
// 0 3 1 0 0 0 1 9
#include<bits/stdc++.h>
using namespace std;
const int M = 1<<20;
const int maxn = 10000;
//m:num of constraints
//n:num of varibles of the standard form
//n2:num of artifical varibles
int m,n,n2;
int x,y; //the location of the main element
double w[maxn]; //each varible's weight
int bv[maxn]; //the base varibles
double C[maxn][maxn]; //the coefficient matrix
double check[maxn]; //the check numbers
bool optimum_check(){
    bool mark = true;
    double Max = -1,Min = maxn;
    for(int i = 0;i < n;i++){
        int t = w[i];
        for(int j = 0;j < m;j++) t -= w[bv[j]]*C[j][i];
        check[i] = t;
        if(check[i] > 0){
            mark = false;
            if(check[i] > Max){
                Max = check[i];
                y = i;
            }
        }
    }
    for(int i = 0;i < m;i++){
        if(C[i][y] < 0 || abs(C[i][y] - 0) < 1e-10) continue;
        if(C[i][n]/C[i][y] <= Min){
            Min = C[i][n]/C[i][y];
            x = i;
        }
    }
    return mark;
}
int main(){
    freopen("data.in","r",stdin);
    freopen("data.out","w",stdout);
    cin>>m>>n>>n2;
    for(int i = 0;i < n;i++) cin>>w[i];
    for(int i = n;i < n + n2;i++) w[i] = -M;
    n += n2;
    for(int i = 0;i < m;i++){
        for(int j = 0;j < n + 1;j++) cin>>C[i][j];
    }
    int cnt = 0; //the num of base varibles that had been found
    memset(bv,-1,sizeof(bv));
    for(int i = 0;i < n && cnt < m;i++){
        if(C[cnt][i] != 1) continue;
        int mark = 1;
        for(int j = 0;j < m;j++){
            if(j == cnt) continue;
            if(C[i][j] != 0) mark = 0;
        }
        if(mark) bv[cnt++] = i;
    }
    while(!optimum_check()){
        double e = C[x][y];
        for(int i = 0;i < n + 1;i++) C[x][i] /= e;
        for(int i = 0;i < m;i++){
            if(i == x || !C[i][y]) continue;
            double t = C[i][y]/C[x][y];
            for(int j = 0;j < n + 1;j++) C[i][j] -= C[x][j]*t;
        }
        bv[x] = y;
    }
    double optimum_value = 0,solu[n] = {0};
    for(int i = 0;i < m;i++) solu[bv[i]] = C[i][n];
    for(int i = 0;i < n;i++) optimum_value += solu[i]*w[i];
    printf("The optimum value is %.2lf\n",optimum_value);
    printf("The solution is :\n");
    for(int i = 0;i < n;i++){
        printf("x%d = %.2lf\n",i+1,solu[i]);
    }
    return 0;
}
```
