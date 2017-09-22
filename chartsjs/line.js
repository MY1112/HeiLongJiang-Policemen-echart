var option = {
    grid: {
        top: '5%',
        right: '10%',
        bottom: '2%',
        left: '0%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line'
        }
    },
    legend: {
        icon: 'rect', //设置图例的图形形状，circle为圆，rect为矩形
        itemWidth: 14, //图例标记的图形宽度[ default: 25 ]
        itemHeight: 5, //图例标记的图形高度。[ default: 14 ]
        itemGap: 13, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
        data: [],
        right: '4%', //图例组件离容器右侧的距离
        textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
        },
        selectedMode: false

    },

    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            interval: 0,
            // rotate:'-30',
            textStyle: {
                color: '#fff',
                fontSize:12
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "rgba(31,38,46,0.8)",
                type: "dashed"
            }
        }

    }],
    yAxis: [{
        type: 'value',
        boundaryGap: [0, 0.1],
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#fff',
                fontSize:12
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "rgba(31,38,46,0.8)",
                type: "dashed"
            }
        }

    }],
    series: []
};
var color = ['#00FFC5','#0067F0','#F7AB4B','#E85E6D','#FF3030','#FFA500','#00FFFF','#7FFF00'];

function Line(chart,chartDatas) {
    var myChart = echarts.init(chart);
    var xAxisData = chartDatas.xAxis;
    var showData = chartDatas.showData;
    var Item = function(){
        return {
            name:'',
            type:'line',
            smooth: true,
            showSymbol: false,
            areaStyle: {normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'red' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)', //阴影颜色。支持的格式同color

            }},
            itemStyle: { //折线拐点标志的样式
                normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)', //图形的描边颜色。支持的格式同 color
                    borderWidth: 12 //描边线宽。为 0 时无描边。[ default: 0 ]

                }
            },
            data:[]
        }
    };// series中的每一项为一个item,所有的属性均可以在此处定义
    var legends = [];// 准备存放图例数据
    var Series = []; // 准备存放图表数据
    for(var i in showData){
        var it = new Item();
        it.name = i;// 先将每一项填充数据
        legends.push(i);// 将每一项的图例名称也放到图例的数组中
        it.data = showData[i];
        Series.push(it);// 将item放在series中
    }
    option.legend.data = legends;// 设置图例
    option.series = Series; // 设置图表
    option.xAxis[0].data = xAxisData;
    for(i=0;i<option.legend.data.length;i++) {
        option.series[i].itemStyle.normal.color = color[i];
        option.series[i].areaStyle.normal.color.colorStops[0].color = color[i];
    }
    myChart.setOption(option)

}
