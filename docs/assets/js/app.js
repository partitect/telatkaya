$(document).ready(function () {
	"use strict";

	function chartResize() {
		var allCharts = $('.teka-charts');
		for (var i = 0; i < allCharts.length; i++) {
			var $item = $(allCharts[i]);
			echarts.getInstanceById($item.attr('_echarts_instance_')).resize();
		}
	}
	setTimeout(chartResize, 300);

	$(window).on('load', function () {
		setTimeout(chartResize, 300);
	});

	window.onresize = function () {
		setTimeout(chartResize, 300);
		console.log("resize");
	};
});