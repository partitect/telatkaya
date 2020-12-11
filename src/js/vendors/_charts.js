var TekaChart = echarts.init(document.getElementById("tekaCharts"));
var _normal;

var sportsIcon = {
	a: "assets/img/galatasaray.png"
};
var richTextStyle = {
	width: 100,
	height: 150,
	lineHeight: 50,
	shadowColor: "#fff",
	shadowBlur: 0,
	shadowOffsetX: 0.5,
	shadowOffsetY: 0.5,
	backgroundColor: {
		image: sportsIcon.a
	}
};
var _normal;
TekaChart.setOption({
	grid: {
		top: 300,
		bottom: 0,
		left: 0,
		right: 0
	},
	xAxis: {
		show: false,
		type: "category",
		boundaryGap: false,
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	},
	yAxis: {
		show: false,
		type: "value"
	},
	series: [
		{
			data: [4, 6, 4, 4, 2, 2, 0],
			type: "line",
			symbolSize: 0,
			smooth: true,
			areaStyle: {
				color: ["#3D4657"]
			},
			lineStyle: {
				width: 0
			},
			zlevel:10
		},
		{
			data: [4, 6, 5, 5, 3, 2, 0],
			type: "line",
			symbolSize: 0,
			smooth: true,
			areaStyle: {
				color: ["#475266"]
			},
			lineStyle: {
				width: 0
			},
			zlevel:10
		},
		{
			name: "1990",
			type: "effectScatter",
			data: [[3,5, 12, "Turkey"]],
			itemStyle: {
				color: "#fca311"
			},
			symbol: "circle",
			rippleEffect:{

			},
			symbolKeepAspect: true,
			symbolSize: function(data) {
				return Math.sqrt(data[2]) * 20;
			},
			zlevel:11
		},
		{
			type: "pie",
			radius: '5%',
			center: ['50%', '50%'],
			avoidLabelOverlap: false,
			zlevel:11,
			itemStyle:{
				color:'transparent'
			},
			labelLine: {
				show: true,
				length: 50,
				length2:100,
				smooth: 0.3,

				lineStyle:{
					width:3,
					color: "#fca311",
					lineStyle:'dotted',
				},
			},
			label:{
				color: "#fca311",
				fontSize:30,
				fontFamily: "Comfortaa, cursive",
				fontWeight:700
			},
			data: [
                {value: 335, name: 'creative'},
                {value: 310, name: 'open for improvement'},
                {value: 234, name: 'experienced'},
            ]
		}
	]
});
