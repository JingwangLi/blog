---
title: Sort
tags:
  - Algorithm
  - Data Structure
url: 241.html
id: 241
categories:
  - Algorithm
keywords: 'Algorithm,Data Structure'
abbrlink: a444b428
date: 2018-03-02 14:37:08
---

```cpp
#include<iostream>
#include<vector>
#include<cmath>
using namespace std;
const int cutoff = 10000;
int Incre[3] = {4,2,1};
void SimpleSelectSort(int A[],int n)
{
    int i,j,min,temp;
    for(i=0;i<n-1;i++){
        min = i;
        for(j=i+1;j<n;j++){
            if(A[j] < A[min]) min = j;
        }
        if(min != i){
            temp = A[i];
            A[i] = A[min];
            A[min] = temp;
        }
    }
}
//HeapSort
void Adjust(int A[],int i,int n)
{
    int child,temp;
    for(temp=A[i];(2*i+1)<n;i=child){
        child = 2*i + 1;
        if(child != n-1 && A[child + 1] > A[child])
            child++;
        if(temp < A[child]) A[i] = A[child];
        else break;
    }
    A[i] = temp;
}
void HeapSort(int A[],int n)
{
    int i,temp;
    for(i=(n-1)/2;i>=0;i--){
        Adjust(A,i,n);
    }
    for(i=n-1;i>0;i--){
        temp = A[0];
        A[0] = A[i];
        A[i] = temp;
        Adjust(A,0,i);
    }
}

void InsertSort(int A[],int n)
{
    int i,j,temp;
    for(i=1;i<n;i++){
        temp = A[i];
        for(j=i;j>0 && temp<A[j-1];j--){
            A[j] = A[j-1];
        }
        A[j] = temp;
    }
}
void ShellSort(int A[],int n,int Incre[],int m)
{
    int i,j,k,Increment,temp;
    for(i=0;i<m;i++){
        Increment = Incre[i];
        for(j=Increment;j<n;j++){
            temp = A[j];
            for(k=j;k-Increment>=0 && temp<A[k-Increment];k-=Increment){
                A[k] = A[k-Increment];
            }
            A[k] = temp;
        }
    }
}
void BubbleSort(int A[],int n)
{
    int i,j,flag,temp;
    for(i=n-1;i>=0;i--){
        flag = 0;
        for(j=0;j<i;j++){
            if(A[j] > A[j+1]){
                temp = A[j];
                A[j] = A[j+1];
                A[j+1] = temp;
                flag = 1;
            }
        }
        if(!flag) break;
    }
}
//MergeSort Recurrence
void Merge(int A[],int tmpA[],int l,int r,int rightEnd)
{
    int leftEnd = r - 1,tmp = l;
    int num = rightEnd - l + 1;
    while(l <= leftEnd && r <= rightEnd){
        if(A[l] <= A[r]) tmpA[tmp++] = A[l++];
        else tmpA[tmp++] = A[r++];
    }
    while(l <= leftEnd) tmpA[tmp++] = A[l++];
    while(r <= rightEnd) tmpA[tmp++] = A[r++];
    for(int i=0;i<num;i++,rightEnd--) A[rightEnd] = tmpA[rightEnd];
}
void Msort(int A[],int tmpA[],int l,int rightEnd)
{
    if(l < rightEnd){
        int center = (l + rightEnd)/2;
        Msort(A,tmpA,l,center);
        Msort(A,tmpA,center + 1,rightEnd);
        Merge(A,tmpA,l,center + 1,rightEnd);
    }
}
void MergeSort(int A[],int n)
{
    int *tmpA = new int[n];
    if(tmpA != NULL){
        Msort(A,tmpA,0,n-1);
        delete [] tmpA;
    }
    else throw "NO space";
}
//Non Recurrence
void Merge1(int A[],int tmpA[],int l,int r,int rightEnd)
{
    int leftEnd = r - 1,tmp = l;
    int num = rightEnd - l + 1;
    while(l <= leftEnd && r <= rightEnd){
        if(A[l] <= A[r]) tmpA[tmp++] = A[l++];
        else tmpA[tmp++] = A[r++];
    }
    while(l <= leftEnd) tmpA[tmp++] = A[l++];
    while(r <= rightEnd) tmpA[tmp++] = A[r++];
}
void Merge_pass(int A[],int tmpA[],int n,int len)
{
    int i = 0;
    for(;i <= n - 2*len;i += 2*len)
        Merge1(A,tmpA,i,i + len,i + 2*len - 1);
    if(i + len < n) Merge1(A,tmpA,i,i + len,n-1);
    else
        for(int j = i;j < n;j++) tmpA[j] = A[j];
}
void Merge_sort(int A[],int n)
{
    int *tmpA = new int[n];
    int len = 1;
    if(tmpA != NULL){
        while(len < n){
            Merge_pass(A,tmpA,n,len);
            len *= 2;
            Merge_pass(tmpA,A,n,len);
            len *= 2;
        }
        delete [] tmpA;
    }
    else throw "NO space";
}
//QuickSort
void Swap(int *a,int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
int Median3(int A[],int left,int right)
{
    int center = (left + right)/2;
    if(A[left] > A[center]) Swap(&A[left],&A[center]);
    if(A[left] > A[right]) Swap(&A[left],&A[right]);
    if(A[center] > A[right]) Swap(&A[center],&A[right]);
    Swap(&A[center],&A[right - 1]);
    return A[right - 1];
}
void Qsort(int A[],int left,int right)
{
    if(cutoff <= right - left){
        int pivot = Median3(A,left,right);
        int i = left,j = right - 1;
        while(1){
            while(A[++i] < pivot) {}
            while(A[--j] > pivot) {}
            if(i < j) Swap(&A[i],&A[j]);
            else break;
        }
        Swap(&A[i],&A[right - 1]);
        Qsort(A,left,i-1);
        Qsort(A,i+1,right);
    }
    else InsertSort(A+left,right-left+1);
}
void QuickSort(int A[],int n)
{
    Qsort(A,0,n-1);
}
//RadixSort myself
void RadixSort(int A[],int n)
{
    int i,j,k,radix,R = 1,cnt = 0;
    vector<int>v1[10],v2[10];
    for(i=0;i<n;i++){
        while(A[i]/(int)pow(10,R)) R++;
        v1[A[i] % 10].push_back(A[i]);
    }
    for(k=1;k<R;k++){
        radix = (int)pow(10,k);
        for(i=0;i<10;i++){
            for(j=0;j<v1[i].size();j++){
                v2[(v1[i][j]/radix)%10].push_back(v1[i][j]);
            }
        }
        for(i=0;i<10;i++){
            v1[i].clear();
            v1[i].swap(v2[i]);
        }
    }
    for(i=0;i<10;i++){
        for(j=0;j<v1[i].size();j++){
            A[cnt++] = v1[i][j];
        }
    }
}
//others
int maxbit(int data[], int n)
{
    int d = 1; //保存最大的位数
    int p = 10;
    for(int i = 0; i < n; ++i)
    {
        while(data[i] >= p)
        {
            p *= 10;
            ++d;
        }
    }
    return d;
}
void radixsort(int data[], int n) //基数排序
{
    int d = maxbit(data, n);
    int tmp[n];
    int count[10]; //计数器
    int i, j, k;
    int radix = 1;
    for(i = 1; i <= d; i++) //进行d次排序
    {
        for(j = 0; j < 10; j++)
            count[j] = 0; //每次分配前清空计数器
        for(j = 0; j < n; j++)
        {
            k = (data[j] / radix) % 10; //统计每个桶中的记录数
            count[k]++;
        }
        for(j = 1; j < 10; j++)
            count[j] = count[j - 1] + count[j]; //将tmp中的位置依次分配给每个桶
        for(j = n - 1; j >= 0; j--) //将所有桶中记录依次收集到tmp中
        {
            k = (data[j] / radix) % 10;
            tmp[count[k] - 1] = data[j];
            count[k]--;
        }
        for(j = 0; j < n; j++) //将临时数组的内容复制到data中
            data[j] = tmp[j];
        radix = radix * 10;
    }
}
int main(){
    int n;
    cin>>n;
    int A[n];
    for(int i=0;i<n;i++) cin>>A[i];
    RadixSort(A,n);
    for(int i=0;i<n-1;i++) cout<<A[i]<<" ";
    cout<<A[n-1];

    return 0;
}
```