var colorList = [
     //'#00FFC5','#0067F0','#F7AB4B','#E85E6D','#FF3030','#FFA500','#00FFFF','#7FFF00'
    '#3A5FCD','#436EEE','#4876FF','#0000FF','#0000EE','#0000CD'
     //'#f26522', '#f7941e', '#f9d132', '#709c34', '#006cae'
];
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        }
    },
    grid: {
        top: '5%',
        right: '5%',
        bottom: '0%',
        left: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'value',
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#fff',
                    fontSize:12
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    fontSize:20
                }
            },
            splitLine: {
                show:false
            }

        }
    ],
    yAxis: [
        {
            type: 'category',
            data:[],
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#fff',
                    fontSize:'12'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }

        }
    ],
    series: [{
        type: 'bar',
        barCategoryGap: '50%',
        itemStyle: {
            normal: {
                color: function (value) {
                    return colorList[value.dataIndex];
                },
                opacity:'0.5'
            }
        },
        data:[]
    }]
};
function yBar(myChart,chartDatas) {
    var chartData = chartDatas;
    var xAxisData = [];
    option.series[0].data = Object.keys(chartData).map(function (key) {
        return {
            name: key,
            value: chartData[key],
        }
    }).sort(function (a,b) {return a.value - b.value;});
    for(var i=0;i<option.series[0].data.length;i++) {
        xAxisData.push(option.series[0].data[i].name)
    }
    option.yAxis[0].data = xAxisData;
    myChart.setOption(option);

}
