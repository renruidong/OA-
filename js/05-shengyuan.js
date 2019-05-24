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
		url: "http://www.jiangguangcan.top/statistics1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			let list = data.ab
			for (var i in list) {
				let stuInfo = list[i].teacher_intr
				let rstuInfo = list[i].trainess_intr
				let refsInfo = list[i].agent_intr

				$(".needPeople tbody").append(
					` <tr>
              <td>${stuInfo}</td>
              <td>${rstuInfo}</td>
              <td>${refsInfo}</td>
              <td><span class="badge bg-green" id="${stuInfo.id}">查看</span></td>
            </tr>
          `
				)
			}
			$(".badge").click(function(e) {
				id = e.currentTarget.id
				location.href = "05-IntroductionDetail.html?id"
			})
		}

	})
	// $.ajax({
	// 		type: "get",
	// 		url: "http://www.jiangguangcan.top/statistics1/",
	// 		async: true,
	// 		dataType: 'json',
	// 		success: function(data) {
	// 			// console.log(data.classes.classList)
	// 			let list = data.classes.classList
	// 			for (var i in list) {
	// 				$(".xiala select").append(
	// 					`
	//            <option value="${list[i].id}">${list[i].title}</option>
	//          `
	// 				)
	// 			}
	// 			$(".xiala select").change(function() {
	// 				console.log($(this).val())
	// 				let cid = $(this).val()
	// 				$(".needPeople tbody").empty()
	// 				$.ajax({
	// 					type: "get",
	// 					url: `http://www.jiangguangcan.top/statistics2/?cid=${cid}`,
	// 					async: true,
	// 					dataType: 'json',
	// 					success: function(data) {
	// 						console.log(data.stus.stuList)
	// 						let list = data.stus.stuList
	// 						let html = ''
	// 						for (var i in list) {
	// 							let sid = list[i].id
	// 							html +=
	// 								` 
	// 								  <tr>
	// 									<td>${list[i].name}</td>
	// 									<td>${list[i].gender}</td>
	// 									<td>${list[i].source}</td>
	// 									<td>${list[i].IDNO}</td>
	// 									<td>${list[i].address}</td>
	// 									<td>${list[i].mobile}</td>
	// 									<td>${list[i].mobile}</td>
	// 									<td><span class="badge bg-green" id="${sid}">查看</span></td>
	// 								  </tr>
	// 								`
	// 						}
	// 						$(".needPeople tbody").append(
	// 							`
	// 							<tr>
	// 							  <th style="min-width:60px">姓名</th>
	// 							  <th style="min-width:50px">性别</th>
	// 							  <th style="min-width:80px">来源</th>
	// 							  <th>身份证</th>
	// 							  <th>地址</th>
	// 							  <th>手机号</th>
	// 							  <th>微信号</th>
	// 							  <th style="width: 55px">查看</th>
	// 							</tr>
	// 							`
	// 						)
	// 						$(".needPeople tbody").append(html)
	// 						$(".badge").click(function(e) {
	// 							id = e.currentTarget.id
	// 							location.href = "02-addtra.html?sid=" + id
	// 						})
	// 					}
	// 				})
	// 			})
	// 		}
	// 	})

})
