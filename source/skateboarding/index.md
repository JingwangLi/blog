---
# title: skateboard
date: 2019-12-20 17:31:38
comments: false
---

## 我的滑板生涯
* 2019年11月15日，滑得太快不小心劈叉导致髋关节扭伤，休息了两个月。
* 2019年10月26日，过一立了！[[video]](https://www.bilibili.com/video/av83092484)
* 2019年10月8日，可以上一阶台阶了（华中科技大学电气学院新大楼门前广场）！成了之后得意忘形然后平地做Ollie失误摔到后脑勺了，但无大碍。
* 2019年5月，换了双翘，开始磕招。
* 2019年3月，重新开始玩滑板，不过是大鱼板，因为一开始只准备代步而不准备磕招。
* 2015年12月，在室友的鼓励下接触双翘，但在一个月（或者不到一个月）后因为种种原因中止。 

## 滑板地图
本人去过的一些玩滑板的地方，点击地图中的滑板图标可以看到对应场地的照片，不过目前有个bug尚未解决，所以如果有的照片点击之后显示不完全的话可能需要再点击一下。同时非常希望你能把你知道的不错的地形（位置和照片，任何地方都可以）分享给我，我会标记到地图上分享给大家，谢谢！
<!-- * **武汉** -->
### 武汉
<br>
{% raw %}
<div style="min-height: 500px; width: 100%; overflow: hidden; margin:10; font-family:" 微软雅黑";"="" id="map">
</div>

<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=x2V7KanMxVA2GuK7oFHPOiGytFSXWoyN" ></script>
<script type="text/javascript" defer=true>
    // 百度地图API功能
    var data = [[114.419895, 30.513445, '华科南大门', 1, 'http://storage.jingwang.site/img/HUST-South-Gate-Square.jpg'],
                [114.364555, 30.480067, '华农狮子山广场', 2, 'http://storage.jingwang.site/img/HZAU-Shizi-Mountain-Square.jpg'],
                [114.417597, 30.497472, '保利广场', 3, 'http://storage.jingwang.site/img/Wuhan-Poly-Square.jpg']];
    var map = new BMap.Map("map",  {enableMapClick:false});
    var point = new BMap.Point(114.419895,30.513445);
    map.centerAndZoom(point, 12)
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var myIcon = new BMap.Icon("http://storage.jingwang.site/img/Skateboarding-Logo-48.png", new BMap.Size(40, 40), );
    var opts = {
                width : 0,     // 信息窗口宽度
                height: 0,     // 信息窗口高度
               };
    for(var i = 0; i < data.length; i++){
        //var marker = new BMap.Marker(point); // , {icon: myIcon}
        var marker = new BMap.Marker(new BMap.Point(data[i][0], data[i][1]), {    icon: myIcon,
                offset : new BMap.Size(0, 0),
                title : data[i][3],
            });
        // var img = new Image(); //预加载无法解决onload null问题
        // img.src = data[i][4];
        // console.log(typeof img);
        var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + data[i][2] + "</h4>" + "<img style='float:down;margin:4px' id=" + String(data[i][3]) + " src=" + String(data[i][4]) + " />" + "</div>";
/*        console.log(content)
        var label = new BMap.Label(data[i][3], {
                offset : new BMap.Size(0, 0)
            }); 
        label.setStyle({
        background:'none',color:'#fff',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
         });
        marker.setLabel(label);//显示地理名称*/

        map.addOverlay(marker);
        addClickHandler(content,marker);

    }

    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){
            openInfo(content,e)}
        );
    }

    function openInfo(content,e){
        var p = e.target;
        // console.log(typeof p.z['title']);
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point);
        //图片加载完毕重绘infowindow
        // console.log(document);
        // console.log(document.getElementById(p.z['title']));
        document.getElementById(p.z['title']).onload = function (){
        // document.getElementsById('img#1').onload = function (){
           infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    }

</script>
{% endraw %}


## 滑板视频
* **01**
{% raw %}
<iframe width="100%" height="600" src="//player.bilibili.com/player.html?aid=70196408&cid=121600183" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
{% endraw %}


