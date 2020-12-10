var TekaChart = echarts.init(document.getElementById("tekaCharts"));
var _normal;

var sportsIcon = {
	'a':'assets/img/galatasaray.png',
}
var richTextStyle={
	width: 100,
	height: 150,
	lineHeight: 50,
	shadowColor: '#fff',
	shadowBlur: 0,
	shadowOffsetX: .5,
	shadowOffsetY: .5,
	backgroundColor: {
		image: sportsIcon.a
	},
};
TekaChart.setOption({
	title: {
		text: "Telat KAYA",
		textStyle: {
			fontSize: 40,
			fontFamily: "Concert One, cursive",
			color: "#fca311",
			align: "center"
		},
		left: "center",
		top: 20
	},
	xAxis: {
		show: false
	},
	yAxis: {
		show: false,
		scale: true
	},

	series: [
		{
			type: "pie",
			radius: ["46%", "70%"],
			avoidLabelOverlap: true,
			hoverAnimation: false,
			rroseType: "radius",
			data: [
				{ name: "Skills", value: 1 },
				{ name: "Abilities", value: 1 },
				{ name: "Test", value: 1 }
			],
			label: {
                normal: {
                    formatter: function(params) {
                        var str = '';
                        switch (params.name) {
                            case 'Skills':
                                str = '{a|}';
                                break;
                            case 'Abilities':
                                str = '{b|}';
                                break;
                            case 'Test':
                                str = '{c|}';
                                break;
                        }
                        return str
                    },
                    rich: {
                        a: richTextStyle,
                        b: richTextStyle,
                        c: richTextStyle,
                        nameStyle: {
                            fontSize: 16,
                            color: "#f24156",
                        },
                        rate: {
                            fontSize: 20,
                            lineHeight: 30,
                            color: "#000",
                        }
                    }
                }
            },
			labelLine: {
                normal: {
                    show: true,
                    length: 90,
                    length2: 45,
                    smooth: true,
                    lineStyle: {
                        type: 'dashed',
                        width: 1.5,
                        color: '#979691',
                        shadowColor: '#fff',
                        shadowBlur: 0,
                        shadowOffsetX: .5,
                        shadowOffsetY: .5,
                    }
                },
                emphasis: {
                    lineStyle: {
                        type: 'dashed',
                        width: 2,
                    }
                }
            },
			itemStyle: {
				normal: {
					color:'#fca311',
					shadowBlur: 5,
					shadowColor: "rgba(255, 255, 255, 0.1)"
				}
			},

			animationType: "scale",
			animationEasing: "elasticOut",
			animationDelay: function animationDelay(idx) {
				return Math.random() * 200;
			}
		},{
			name: "1990",
			type: "effectScatter",
			data: [
			  [0, 1, 10, "Turkey", 1990],
			  [10, 2, 20, "United Kingdom", 1990],
			  [0, 3, 3, "United States", 1990]
			],
			itemStyle:{
				color:'#fca311'
			},
			symbol:'image://assets/img/partitect-logo.svg',
			symbolKeepAspect:true,
			symbolSize: function(data) {
			  return Math.sqrt(data[2]) * 20;
			}
		  }
	]
});
