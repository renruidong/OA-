$.ajax({
	type:"get",
	url:"http：//www.jiangguangcan.top/finance1/",
	async:true,
	datatype:'json',
	success:function (data) {
		console.log('请求成功')
	},
	error:function(error){
		console.log('请求失败')
	}
})