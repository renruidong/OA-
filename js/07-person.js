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
	console.log(window.location.search)
	let id = window.location.search
	let cid = id.slice(5)
	$.ajax({
		type: "get",
		url: `http://www.jiangguangcan.top/School2/${cid}/`,
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data.aj)
			let datas = data.aj
			let title = datas.enterprise_name
			$(".box-title").html(title)
			$(".cont").append(
				`
				  <ul>
					<li><span>公司名称</span><span>${title}</span></li>
					<li><span>联系人</span><span>${datas.contact_person}</span></li>
					<li><span>联系方式</span><span>${datas.telephone_number}</span></li>
					<li><span>就业人数</span><span>${datas.graduation_people}</span></li>
					<li><span>返款金额</span><span>${datas.return_money}</span></li>
					<li><span>收款日期</span><span>${datas.receipt_day}</span></li>
				  </ul>
				  `
			)
			// $(".mon").click(function(e) {
			// 	id = e.currentTarget.id
			// 	location.href = "07-refunds.html?id"
			// })
			// $(".stu").click(function(e) {
			// 	id = e.currentTarget.id
			// 	location.href = "07-studentlist.html?id"
			// })
		}
	})
	$(".txtTo").click(function() {
		$(".mengban2").slideToggle("show")
		$(".mengban2 .txt-list").empty()
		$.ajax({
			type: "get",
			url: `http://www.jiangguangcan.top/School2/${cid}/`,
			async: true,
			dataType: 'json',
			success: function(data) {
				console.log(data.aj)
				let datas = data.aj
				$(".txt-list").append(
					`
					<li><span>公司名称</span><span><input type="text" class="names" value="${datas.enterprise_name}"></span></li>
					<li><span>联系人</span><span><input type="text" class="contacts" value="${datas.contact_person}"></span></li>
					<li><span>联系方式</span><span><input type="text" class="phones" value="${datas.telephone_number}"></span></li>
					<li><span>就业人数</span><span><input type="text" class="payees" value="${datas.graduation_people}"></span></li>
					<li><span>返款金额</span><span><input type="text" class="accounts" value="${datas.return_money}"></span></li>
					<li><span>收款日期</span><span><input type="text" class="titles" value="${datas.receipt_day}"></span></li>
				  `
				)
			}
		})
		$(".keep").click(function() {
			let enterprise_name = $(".names").val()
			let contact_person = $(".contacts").val()
			let telephone_number = $(".phones").val()
			let graduation_people = $(".payees").val()
			let return_money = $(".accounts").val()
			let receipt_day = $(".titles").val()
			let objt = {
				cid,
				enterprise_name,
				contact_person,
				telephone_number,
				graduation_people,
				return_money,
				receipt_day
			}
			console.log(objt)
			$.ajax({
				type: "post",
				url: "http://www.jiangguangcan.top/School/",
				async: true,
				dataType: 'json',
				data: objt,
				success: function(data) {
					console.log(data)
					alert(data.status)
					window.location.reload()
				}
			})

		})
		$(".cancel").click(function() {
			$(".mengban2").css("display", "none")
		})
		$(".deletes").click(function() {
			alert("删除成功")
			window.location.reload()
		})
	})
	$(".detTo").click(function() {
		$(".mengban").css("display", "block")
	})
	$(".query").click(function() {
		alert("鍒犻櫎鎴愬姛")
		$(".mengban").css("display", "none")
	})
	$(".closed").click(function() {
		$(".mengban").css("display", "none")
	})

})
