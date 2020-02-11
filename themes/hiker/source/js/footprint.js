var myChart = echarts.init(document.getElementById('myMap'));

var data = [
    {name: 'Tanghe', value: ['forever', 10]}, //Tanghe
    {name: 'Nanyang', value: ['2011.08', 3]},
    {name: 'Nanjing', value: ['2015.06, 2019.09', 2]},
    {name: 'Rui\'an', value: ['2015.07-08', 2]},
    {name: 'Wuhan', value: ['2015.09-now', 8]},
    {name: 'Xi\'an', value: ['2016.08', 2]},
    {name: 'Pucheng', value: ['2016.07', 1]},
    {name: 'Xunyang', value: ['2016.07-08', 1]},
    {name: 'Changsha', value: ['2016.10', 1]},
    {name: 'Beijing', value: ['2017.10', 1]},
    {name: 'Guangzhou', value: ['2018.07', 1]},
    {name: 'Shanghai', value: ['2019.09', 1]}
];

var geoCoordMap = {
    'Tanghe': [112.705114,32.552725], //Tanghe
    'Nanyang': [112.585969,33.011693],
    'Nanjing': [118.803859,32.094513],
    'Rui\'an': [120.589005,27.773327],
    'Wuhan': [114.362466,30.481018],
    'Xi\'an': [108.9663,34.283821],
    'Pucheng': [109.605723,34.94648],
    'Xunyang': [109.368341,32.838331],
    'Changsha':[113.019455,28.200103],
    'Beijing': [116.402176,39.91668],
    'Guangzhou': [113.396833,23.071725],
    'Shanghai': [121.508532,31.289027]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
            //console.log(res)
        }
    }
    return res;
};

option = {
    // backgroundColor: '#404a59',
    title: {
    },
    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (params) {
            name = params.name
            time = params.value[2]
            // describe = params.value[3]
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + name
                + '</div>'
                + time
                + '<br>';
                // + describe;
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#e6e6e6',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#cccccc'
            }
        }
    },
    series : [
        {
            name: 'footmarks',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,

            symbolSize:  function (val) {
                return 5 + 0.5*val[3];
            },
            // symbolSize: 8,

            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#FF0000',
                    shadowBlur: 1,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

myChart.setOption(option);