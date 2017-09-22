var colorList = [
    '#3A5FCD','#436EEE','#4876FF','#0000FF','#0000EE','#0000CD'
];
var option = {
    grid: {
        top: '5%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line'
        }
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        data: [],
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine:{
            show:false
        }

    }],
    yAxis: [{
        type: 'value',
        boundaryGap: [0, 0.1],
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine:{
            show:false
        }

    }],
    series: [{
        name: '',
        type: 'bar',
        barCategoryGap: '50%',
        data: [],
        barGap: 0
        //name: '',
        //type: 'bar',
        //stack: 'sum',
        //barCategoryGap: '60%',
        //itemStyle: {
        //    normal: {
        //        //color: 'red'
        //    }
        //},
        //data: []
    }]
};
function chartLine(chart,chartDatas) {
    var chartData = chartDatas;
    var xAxisData = [];
    option.series[0].data = Object.keys(chartData).map(function (key) {
        return {
            name: key,
            value: chartData[key],
            itemStyle:{
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#A1FEF9'  },
                        {
                            offset: 1, color: '#00FEEF'
                        }], false)
                }
            }
        }
    }).sort(function(a,b){
		if(new Date(a.name)) {
			return new Date(a.name) - new Date(b.name);
		}else {
			return a.name - b.name;
		}
	});
    for(var i=0;i<option.series[0].data.length;i++) {
        xAxisData.push(option.series[0].data[i].name)
    }
    option.xAxis[0].data = xAxisData;
    chart.setOption(option);

}
