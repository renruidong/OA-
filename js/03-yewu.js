$(function() {

	let users = JSON.parse(localStorage.getItem('users'))
	// if (users == null) {
	// 	window.location.href = "login.html"
	// } else {
	// 	$(".users").html(users)
	// 	let meunlist = JSON.parse(localStorage.getItem('meunlist'))
	// 	for (let i in meunlist) {
	// 		$(".sidebar-menu").append(
	// 			`
 //        <li><a href="${meunlist[i].purl}"><i class="fa fa-link"></i> <span>${meunlist[i].ptitle}</span></a></li>
 //      `
	// 		)
	// 	}
	// }
	$(".outt").click(function() {
		localStorage.clear()
	})
	$.ajax({
		type: "get",
		url: "http://www.jiangguangcan.top/textual1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			let list = data.textual

			for (var i in list) {
				let sid = list[i].id
				$(".needPeople tbody").append(
					` <tr>
              <td>${list[i].name}</td>
              <td>${list[i].sex}</td>
              <td>${list[i].laiyuan}</td>
              <td>${list[i].id_card}</td>
              <td>${list[i].local}</td>
              <td>${list[i].phone}</td>
              <td>${list[i].wechat}</td>
              <td><span class="badge bg-green" id="${sid}">查看</span></td>
            </tr>
          `
				)
			}
			$(".badge").click(function(e) {
				id = e.currentTarget.id
				location.href = "stuInfoDetail.html?sid=" + id

			})
		}
	})
	//搜索
	$(".searchRes").click(function() {
			$(".box-body").empty()
			$(".box-body").append(
				`
	     <table class="table table-bordered">
	       <tbody>
	        <tr>
	          <th style="min-width:60px">姓名</th>
	          <th style="min-width:50px">性别</th>
	          <th style="min-width:80px">来源</th>
	          <th>身份证</th>
	          <th>地址</th>
	          <th>手机号</th>
	          <th>微信号</th>
	          <th style="width: 55px">查看</th>
	        </tr>
	       </tbody>
	     </table>
	   `
			)
			let name = $(".search").val()
			$.ajax({
				type: "get",
				url: `http://api.marsen.club/cp/showrebate/?name=${name}`,
				async: true,
				dataType: 'json',
				success: function(data) {
					console.log(data)
					if (data.data == 0) {
						alert("没有找到相关信息")
						window.location.reload()
					} else {
						appends(data)
						$(".badge").click(function(e) {
							id = e.currentTarget.id
							location.href = "cooperationDetail.html?cid=" + id
						})
					}
				}
			})
		})
	//添加
	$(".bread").click(function() {
		location.href = "addTrainees11.html"
	})
	// $.ajax({
	// 	type: "get",
	// 	url: "http://api.marsen.club/stu/search/cls/",
	// 	async: true,
	// 	dataType: 'json',
	// 	success: function(data) {
	// 		console.log(data.classes.classList)
	// 		let list = data.classes.classList
	// 		for (var i in list) {
	// 			$(".xiala select").append(
	// 				`
    //         <option value="${list[i].id}">${list[i].title}</option>
    //       `
	// 			)
	// 			//根据日期查询数据
				
	// 			if(list[i].sDate.indexOf('05')>-1){
	// 				console.log(list[i])
	// 			}
	// 		}
	// 		$(".xiala select").change(function() {
	// 			console.log($(this).val())
	// 			let cid = $(this).val()
	// 			$(".needPeople tbody").empty()
	// 			$.ajax({
	// 				type: "get",
	// 				url: `http://api.marsen.club/stu/search/stu/baseinfo/?cid=${cid}`,
	// 				async: true,
	// 				dataType: 'json',
	// 				success: function(data) {
	// 					console.log(data.stus.stuList)
	// 					let list = data.stus.stuList
	// 					let html = ''
	// 					for (var i in list) {
	// 						let sid = list[i].id
	// 						html +=
	// 							` 
    //               <tr>
    //                 <td>${list[i].name}</td>
    //                 <td>${list[i].gender}</td>
    //                 <td>${list[i].source}</td>
    //                 <td>${list[i].IDNO}</td>
    //                 <td>${list[i].address}</td>
    //                 <td>${list[i].mobile}</td>
    //                 <td>${list[i].mobile}</td>
    //                 <td><span class="badge bg-green" id="${sid}">查看</span></td>
    //               </tr>
    //             `
	// 					}
	// 					$(".needPeople tbody").append(
	// 						`
	// 						<tr>
	// 						  <th style="min-width:60px">姓名</th>
	// 						  <th style="min-width:50px">性别</th>
	// 						  <th style="min-width:80px">来源</th>
	// 						  <th>身份证</th>
	// 						  <th>地址</th>
	// 						  <th>手机号</th>
	// 						  <th>微信号</th>
	// 						  <th style="width: 55px">查看</th>
	// 						</tr>
	// 						`
	// 					)
	// 					$(".needPeople tbody").append(html)
	// 					$(".badge").click(function(e) {
	// 						id = e.currentTarget.id
	// 						location.href = "stuInfoDetail.html?sid=" + id
	// 					})
	// 				}
	// 			})
	// 		})
	// 	}
	// })
})

