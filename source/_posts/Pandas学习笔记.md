---
title: Pandas学习笔记
tags:
  - Data Mining
  - Python
  - Notes
url: 247.html
id: 247
categories:
  - Data Mining
keywords: 'Machine Learning,Python'
abbrlink: pandas
date: 2018-03-31 00:43:18
---

## groupby
groupby 之后得到的groupby.size() 其实是一个Series，如果是根据多个键进行groupby 的话，那么 groupby.size() 的索引就会是 turple，也就是多重索引，这样的话我们就可以将其转化为 list 进行使用。 比如在阿里妈妈大赛中:
* 对于某个instance，我想确定某个user之前是否购买过对应的 item，刚开始想的是对于每一个 user，分别找出其购买过的所有item，存放在 list 里面，最后建个 dataframe，开始想到的是利用groupby根据 user\_id 及 item\_id 对 traded\_data 进行分组，将groupby.size() reset\_index 转化为dataframe ，然后将有相同user\_id的行合并并将这些相同user\_id的行的item\_id 合并为一个 list ,但是在将item\_id 转化为 list 的时候遇到了问题：
```python
a['l'] = a['item'].apply(lambda x:[x])
a['l'] = a['item'].apply(lambda x:list([x]))
```
  上面两条语句都会报错，现在仍然没找到解决办法。 最后想到了这样做，将groupby.size() 的索引转化为 list，然后对于每个instance，只需要判断turple(user\_id,item\_id)是否在 list 里面即可。 
* 对于某个instance，我想确定某个user之前有多少次浏览过该item，刚开始我是这样写的：
```python
def num_user_see_item(x):
    return data[(data['user_id'] == x['user_id']) & (data['item_id'] == x['item_id']) 
            & (data['context_timestamp'] < x['context_timestamp'])].shape[0]
    
data['num_user_see_item'] = data.apply(num_user_see_item,axis = 1)
```
  就是很直接的找 user\_id 和 item\_id 相同 并且 timestamp 比它小的instance 的数量，没想到运行了好久都出不来结果。 后来我想到还是可以利用多重索引来提高效率，代码如下：
```python
user_item = data.groupby(['user_id','item_id','context_timestamp'])['context_timestamp'].size()
def num_user_see_item(data):
     x = data['user_id']
     y = data['item_id']
     time = data['context_timestamp']
     sees = user_item[(x,y,)]
     return sees[sees.index < time].size
data['num_user_see_item'] = data.apply(num_user_see_item,axis = 1)
```
  groupby之后得到是这样一个具有三重索引的series:
```git
user\_id              item\_id              context_timestamp
24779788309075       3429903120089063586  1537366714           1
                     5649087492658319596  1537364387           1
                                          1537368731           1
36134987234568       914111419274964265   1537589083           1
59341486148291       2454479696539099260  1537615002           1
179317972644611      61914655744894283    1537621994           1
                     223133888358826014   1537621854           1
                     557883074900282934   1537707167           1
                     665259028224229466   1537622270           1
```
  所以我们就可以利用这样一个series，对于每个instance，利用它的 user\_id 和 item\_id 就可以直接得到 user\_item\[(x,y,)\]，即所有浏览时间点组成的一个series，再找出里面index 小于该instance 的timestamp 的数量就行了，这样的话每次查找时相当于是直接在 user\_id 和 item_id 都相同的 Instance 里面进行查找，而不是像之前那样每次都在所有的Instance 里面查找，因此效率会得到极大的提高，基本上5分钟之内就可以出结果。
* DataFrame按多列groupby分组后在组内按某列值排序
```python
page_time = data[['user_id','item_id','context_page_id','context_timestamp']].sort_values(by = 'context_timestamp').groupby(['user_id','item_id']).size().reset_index()
```

## Merge
在地铁流量预测大赛中，其原始数据是如下的地铁刷卡数据，其中入站记录与出站记录分开的，所以需要从中提取trips信息，即将入站记录与相对应的出站记录整合到一起。
```git
  time  lineID  stationID deviceID  status  userID  payType
0 2019-01-01 02:00:05 B 27  1354  0 D13f76f42c9a677c4add94d9e480fb5c5 3
1 2019-01-01 02:01:40 B 5 200 1 D9a337d37d9512184b8e3fd477934b293 3
2 2019-01-01 02:01:53 B 5 247 0 Dc9e179298617f40b782490c1f3e2346c 3
3 2019-01-01 02:02:38 B 5 235 0 D9a337d37d9512184b8e3fd477934b293 3
4 2019-01-01 02:03:42 B 23  1198  0 Dd1cde61886c23fdb7ef1fdb76c9b1234 3
5 2019-01-01 02:04:11 B 3 109 0 D7a8fc96cbc11e5df389aa45a62870a48 3
```
我开始的想法是，将数据按useID与时间排序，之后在没有缺失或错误数据的情况下，表中每两条相邻数据即使一条trip。但在DataFrame中使用循环速度是极慢的，何况数据如此之大，执行完恐怕要到猴年马月去了，因此此路不通。很容易可以想到，是否可以使用merge?即将原表中的入站信息和出站信息分成两张表，分别排序，然后利用userID进行merge。乍一看似乎没问题，但是仔细一想其实是不对的，因为不可能所有人每天都只乘坐一次地铁，那么userID就是有重复项的，那么利用有重复项的列进行merge会出现什么情况呢？其中一张表中重复的useID会与另外一张表中的重复的userID分别连接一次！也就是说如果useID有三条重复记录，那么最后生成的此user的trip一共有3*3=9条。
那么这里merge真的就不能用了吗？当然可以，只不过要进行去重操作。首先对原表排序，重新生成index并将index作为一列，再将此表分为入站和出站两张表进行merge，之后利用之前所生成的index对merge结果进行过滤，只留下入站index + 1 = 出站index的记录即可。

## Apply
```python
def is_user_buy_item(data):
    return (data['user_id'],data['item_id']) in traded_user_item_list
    
data['is_user_buy_item'] = data.apply(is_user_buy_item,axis = 1)
```

## 编码问题
to_csv默认是'utf-8'编码，如果含有非拉丁语系的文字输出之后可能会出现乱码。中文的话编码改为'GBK'或者'ANSI'都可以，注意，'ANSI'并不特指某种具体的编码，`每个国家（非拉丁语系国家）自己制定自己的文字的编码规则，并得到了ANSI认可，符合ANSI的标准，全世界在表示对应国家文字的时候都通用这种编码就叫ANSI编码。换句话说，中国的ANSI编码和在日本的ANSI的意思是不一样的，因为都代表自己国家的文字编码标准。比如中国的ANSI对应就是GB2312标准，日本就是JIT标准，香港，台湾对应的是BIG5标准等等`。更具体而言，在简体中文Windows系统中ANSI等价于GBK。
可是有些时候编码设置为'GBK'可能会报错：`unicodeencodeerror: 'mbcs' codec can't encode characters in position 0--1: invalid character`。我认为可能是由于文件里面包含了除中文之外的非拉丁文字(日文)，后来发现有人通过将编码设置为'utf_8_sig'解决了乱码问题的同时也不会报错。后来查了一下'utf_8_sig'，发现都是跟读取文件乱码相关的，因为文件头含有BOM(Byte Order Mark)，但是写入文件的时候又为何会和BOM有关呢？尚未搞清楚。
另外，发现'utf_8_sig'和'utf-8-sig'都可以。
>[彻底搞懂字符编码](https://blog.csdn.net/softman11/article/details/6124345)
>[pd.read_csv()中encoding='utf-8'和'utf-8-sig'的区别](https://blog.csdn.net/weixin_43184252/article/details/90202608)
