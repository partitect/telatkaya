var TekaChart = echarts.init(document.getElementById("tekaCharts"));
//var LiquidChart = echarts.init(document.getElementById("navbarBrand"));

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
	series: [{
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
		zlevel: 10
	}, {
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
		zlevel: 10
	}, {
		name: "1990",
		type: "effectScatter",
		data: [[3, 5, 12, "Turkey"]],
		itemStyle: {
			color: "#fca311"
		},
		symbol: "circle",
		rippleEffect: {},
		symbolKeepAspect: true,
		symbolSize: function symbolSize(data) {
			return Math.sqrt(data[2]) * 20;
		},
		zlevel: 11
	}, {
		type: "pie",
		radius: "5%",
		center: ["50%", "60%"],
		avoidLabelOverlap: false,
		zlevel: 11,
		itemStyle: {
			color: "transparent"
		},
		labelLine: {
			show: true,
			length: 50,
			length2: 100,
			smooth: 0.3,

			lineStyle: {
				width: 3,
				color: "#fca311",
				lineStyle: "dotted"
			}
		},
		label: {
			color: "#fca311",
			fontSize: 30,
			fontFamily: "Comfortaa, cursive",
			fontWeight: 700
		},
		data: [{ value: 335, name: "creative" }, { value: 310, name: "open for improvement" }, { value: 234, name: "experienced" }]
	}]
});

/* LiquidChart.setOption({
	series: [
		{
			waveAnimation: false,
			type: "liquidFill",
			data: [1, 0.48, 0.4],
			radius: "100%",
			outline: {
				show: false
			},

			color: ["#F25F5C", "#FFF", "#247BA0"],
			backgroundStyle: {
				borderColor: "#50514F",
				borderWidth: 1,
				shadowColor: "rgba(0, 0, 0, 0.4)",
				shadowBlur: 20
			},
			shape:
				"path://M 52.801 145.801 L 52.801 0.001 L 73.601 0.001 L 73.601 145.801 A 10.638 10.638 0 0 1 72.803 149.966 A 10.081 10.081 0 0 1 70.601 153.201 A 10.033 10.033 0 0 1 63.338 156.2 A 12.812 12.812 0 0 1 63.201 156.201 A 10.638 10.638 0 0 1 59.035 155.403 A 10.081 10.081 0 0 1 55.801 153.201 A 10.033 10.033 0 0 1 52.801 145.938 A 12.812 12.812 0 0 1 52.801 145.801 Z M 116.601 19.201 L 9.601 19.201 A 10.672 10.672 0 0 1 6.24 18.693 A 8.881 8.881 0 0 1 2.701 16.501 A 9.11 9.11 0 0 1 0.043 10.627 A 12.246 12.246 0 0 1 0.001 9.601 A 10.672 10.672 0 0 1 0.508 6.241 A 8.881 8.881 0 0 1 2.701 2.701 A 9.11 9.11 0 0 1 8.574 0.043 A 12.246 12.246 0 0 1 9.601 0.001 L 116.601 0.001 A 10.672 10.672 0 0 1 119.961 0.508 A 8.881 8.881 0 0 1 123.501 2.701 A 9.11 9.11 0 0 1 126.158 8.574 A 12.246 12.246 0 0 1 126.201 9.601 A 10.672 10.672 0 0 1 125.693 12.961 A 8.881 8.881 0 0 1 123.501 16.501 A 9.11 9.11 0 0 1 117.627 19.159 A 12.246 12.246 0 0 1 116.601 19.201 Z",
			label: {
				show:false
			}
		}
	]
}); */