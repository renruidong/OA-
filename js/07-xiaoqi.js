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
		url: "http://www.jiangguangcan.top/School1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			appends(data.am)
			$(".badge").click(function(e) {
				id = e.currentTarget.id
				location.href = "07-person.html?cid=" + id
			})
		}
	})
	// $(".searchRes").click(function() {
	// 	$(".box-body").empty()
	// 	$(".box-body").append(
	// 		`
 //      <table class="table table-bordered">
 //        <tbody>
 //          <tr>
 //            <th>鍏徃鍚嶇О</th>
 //            <th>鑱旂郴浜�</th>
 //            <th>鑱旂郴鏂瑰紡</th>
 //            <th>灏变笟瀛﹀憳</th>
 //            <th>杩旀鍚堣</th>
 //            <th>鏀舵淇℃伅</th>
 //            <th style="width: 55px">鎿嶄綔</th>
 //          </tr>
 //        </tbody>
 //      </table>
 //    `
	// 	)
	// 	let name = $(".search").val()
	// 	$.ajax({
	// 		type: "get",
	// 		url: `http://api.marsen.club/cp/showrebate/?name=${name}`,
	// 		async: true,
	// 		dataType: 'json',
	// 		success: function(data) {
	// 			console.log(data)
	// 			if (data.data == 0) {
	// 				alert("没有找到相关信息")
	// 				window.location.reload()
	// 			} else {
	// 				appends(data)
	// 				$(".badge").click(function(e) {
	// 					id = e.currentTarget.id
	// 					location.href = "cooperationDetail.html?cid=" + id
	// 				})
	// 			}
	// 		}
	// 	})
	// })
	$(".addRes").click(function() {
		$(".content .text").slideToggle("show")
		$(".percase").click(function() {
			let etype = $(".etype").val()
			let name = $(".name").val()
			let contact = $(".contact").val()
			let phone = $(".phone").val()
			let title = $(".title").val()
			let number = $(".number").val()
			let address = $(".address").val()
			let account = $(".account").val()
			let payee = $(".payee").val()
			let obj2 = {
				etype,
				name,
				contact,
				phone,
				title,
				number,
				address,
				account,
				payee
			}
			console.log(obj2)
			$.ajax({
				type: "post",
				url: "http://www.jiangguangcan.top/School1/",
				async: true,
				data: obj2,
				dataType: 'json',
				success: function(data) {
					console.log(data)
					alert(data.msg)
					window.location.reload()
				}
			})

		})
		$(".uppercase").click(function() {
			$(".content .text").slideToggle("show")
		})
	})

	function appends(data) {
		let datas = data
		console.log(datas)
		for (let i in datas) {
			$(".table tbody").append(
				`
        <tr>
          <td>${datas[i].enterprise_name}</td>
          <td>${datas[i].contact_person}</td>
          <td>${datas[i].telephone_number}</td>
          <td>${datas[i].graduation_people}人</td>
          <td>￥${datas[i].return_money}</td>
          <td>${datas[i].receipt_day}</td>
          <td><span class="badge bg-green" id="${datas[i].id}">查看</span></td>
        </tr>
      `
			)
		}
	}

})
