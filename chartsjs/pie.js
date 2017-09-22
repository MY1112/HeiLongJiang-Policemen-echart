
var grid = {
    left:'10%',
    right:'0%',
    bottom:'1%',
    top:'0%',
    containLabel:true
};
var colors = ['rgb(4,122,254)','rgb(3,201,246)','rgb(255,255,255)','rgb(158,254,250)','rgb(36,0,197)','rgb(57,65,254)'];

var option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : <br/>{c} ({d}%)"
    },
    legend: {
        //orient: 'horizontal'
        //x: 'center',
        //y:'bottom',
        //textStyle:{
        //    color:'#fff'
        //},
        //itemWidth:15,
        //itemHeight:3,
        //data: []
    },
    grid:grid,
    series : [
        {
            color: colors,
            type:'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],

            roseType: false,
            label: {
                normal: {
                    formatter: function(params){
                        return params.name + '\n' + params.value + '万' + '\n' + parseInt(params.percent).toLocaleString() + '%';
                    },
                    backgroundColor: 'rgb(1,47,98)',
                    borderWidth: 0,
                    padding: [3, 4, 5, 6],
                    textStyle: {
                        color:'#fff',
                        fontFamily:'Microsft yahei',
                        fontSize:'12'
                    }
                }
            },
            labelLine: {
                normal: {
                    // show:false,
                    smooth: 0.2,
                    length: 2,
                    lineStyle: {
                        color:"rgb(1,109,173)"
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: 'rgba(12, 18, 39, 0.4)'
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            },
            data:[]
        }
    ]
};

function Pie(myChart,chartDatas,seriesType) {
    // let {roseType = false, radius = ['0','40%']} = seriesType;
    if(seriesType) {
        var radius = [];
        if(seriesType.radius) {
            radius = seriesType.radius;
        } else {
            radius = ['0','40%'];
        }
        if(seriesType.roseType) {
            var roseType = seriesType.roseType;
        } else {
            var roseType = false;
        }
    } else {
        var roseType = false,
            radius = ['0','40%'];
    }
    var chartData = chartDatas;
    //var lengend = [];
    for(var item in chartData) {
        var arrs= item;
        //lengend.push(arrs);
    }
    //option.legend.data = lengend;
    option.series[0].roseType = roseType;
    option.series[0].radius = radius;
    option.series[0].data = Object.keys(chartData).map(function (key) {
        return {
            // name: key + '(' + chartData[key] + ')',
            name: key,
            value: chartData[key],
        }
    }).sort(function (a, b) { return a.value - b.value; });

    myChart.setOption(option);

}
