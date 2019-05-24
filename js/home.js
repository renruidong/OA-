let users = JSON.parse(localStorage.getItem('users'))
// if (users == null) {
// 	window.location.href = "login.html"
// } else {
// 	$(".users").html(users)
// 	let meunlist = JSON.parse(localStorage.getItem('meunlist'))
// 	for (let i in meunlist) {
// 		$(".sidebar-menu").append(
// 			`
//         <li><a href="${meunlist[i].purl}"><i class="fa fa-link"></i> <span>${meunlist[i].ptitle}</span></a></li>
//       `
// 		)
// 	}
// }
$(".outt").click(function() {
	localStorage.clear()
})
var myChart1 = echarts.init(document.getElementById('into'));
var option = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [0, 2.6, 1.6, 3, 1.9, 3.4],
		type: 'line',
		smooth: true
	}]
};
myChart1.setOption(option);
var myChart2 = echarts.init(document.getElementById('outo'));
var option = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [0.3, 0.93, 1.90, 2.93, 1.29, 1.33, 1.32],
		type: 'line',
		smooth: true
	}]
};
myChart2.setOption(option);

var myChart3 = echarts.init(document.getElementById('bing'));
var option3 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['浠ｇ悊', '骞垮憡', '浼佷笟']
	},
	series: [{
		name: '璁块棶鏉ユ簮',
		type: 'pie',
		radius: '70%',
		center: ['50%', '60%'],
		data: [],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};
// myChart3.setOption(option);
myChart3.showLoading();
$.ajax({
	type: "get",
	url: "http://api.marsen.club/stu/stus/source/",
	async: true,
	dataType: "json",
	success: function(data) {
		myChart3.hideLoading();
		option3.legend.data = data.legendData;
		option3.series[0].data = data.seriesData;
		myChart3.setOption(option3);
	}
})

var myChart4 = echarts.init(document.getElementById('home'));
var option4 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		top: '2%',
		left: '0',
		right: '4%',
		bottom: '2%',
		containLabel: true
	},
	xAxis: {
		type: 'value'
	},
	yAxis: {
		type: 'category',
		data: []
	},
	series: [{
		name: '浜烘暟',
		type: 'bar',
		stack: '鎬婚噺',
		label: {
			normal: {
				show: true,
				position: 'insideRight'
			}
		},
		data: []
	}]
};
myChart4.showLoading();
$.ajax({
	type: "get",
	url: "http://api.marsen.club/stu/stus/city/",
	async: true,
	dataType: "json",
	success: function(data) {
		myChart4.hideLoading();
		option4.yAxis.data = data.categories;
		option4.series[0].data = data.data;
		myChart4.setOption(option4);
	}
})
// myChart4.setOption(option);

var myChart5 = echarts.init(document.getElementById('age'));
var option5 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		top: '2%',
		left: '0',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value'
	},
	yAxis: {
		type: 'category',
		data: []
	},
	series: [{
		name: '浜烘暟',
		type: 'bar',
		stack: '鎬婚噺',
		label: {
			normal: {
				show: true,
				position: 'insideRight'
			}
		},
		data: []
	}]
};
myChart5.showLoading();
$.ajax({
	type: "get",
	url: " http://www.jhaobo.work/age/",
	async: true,
	dataType: "json",
	success: function(data) {
		console.log(data)
		myChart5.hideLoading();
		option5.yAxis.data = data.categories;
		option5.series[0].data = data.data;
		myChart5.setOption(option5);
	}
})

// $.ajax({
// 	type:"get",
// 	url:"http://api.marsen.club/stu/search?cid=1",
// 	async:true,
// 	dataType:'json',
// 	success:function(data){
// 		console.log(data)
// 	}
// })
