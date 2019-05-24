$(function() {
	let users = JSON.parse(localStorage.getItem('users'))
	// if (users == null){
	//   window.location.href = "login.html"
	// } else{
	//   $(".users").html(users)
	//   let meunlist = JSON.parse(localStorage.getItem('meunlist'))
	//   for(let i in meunlist){
	//     $(".sidebar-menu").append(`
	//       <li><a href="${meunlist[i].purl}"><i class="fa fa-link"></i> <span>${meunlist[i].ptitle}</span></a></li>
	//     `)
	//   }
	// }
	$(".outt").click(function() {
		localStorage.clear()
	})
	$.ajax({
		type: "get",
		url: "http://www.jiangguangcan.top/Procurement1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			let list = data.an
			let index =list.id
			for (var i in list) {
				$(".table tbody").append(
					`
					  <tr>
						<td>${list[i].id+1}</td>
						<td>${list[i].name}</td>
						<td>${list[i].number}</td>
						<td>${list[i].time}</td>
						<td>${list[i].company}</td>
						<td>${list[i].contact_person}</td>
						<td>${list[i].telephone_number}</td>
						<td>应付${list[i].amount_payable}</td>
						<td>实付${list[i].paid_amount}</td>
						<td><span class="badge bg-green look">操作</span></td>
					  </tr>
					`
				)
			}
		}
	})
	$(".look").click(function() {
		location.href = "purchaseDetail.html"
	})
	// $(".addAfter").slideToggle("hide")
	$(".bread").click(function() {
		$(".addAfter").slideToggle("show")
		let name = $(".addAfter .name").val()
		let number = $(".addAfter .number").val()
		let price = $(".addAfter .price").val()
		let net = $(".addAfter .net").val()
		let pdate = $(".addAfter .pdate").val()
		let compname = $(".addAfter .compname").val()
		let contact = $(".addAfter .contact").val()
		let phone = $(".addAfter .phone").val()
		let objt = {
			name,
			number,
			price,
			net,
			pdate
		}
		$("#baoc").click(function() {
			$.ajax({
				type: "post",
				url: "http://www.jiangguangcan.top/Procurement1/",
				async: true,
				data: objt,
				dataType: 'json',
				success: function(data) {
					console.log(data)
				}
			})
		})
	})




	// console.log(obj)
	// alert("")
	// window.location.reload()

	$("#quxiao").click(function() {
		window.location.reload()
	})
})
