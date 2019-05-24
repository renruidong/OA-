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
	console.log("支出")
	$(".outt").click(function() {
		localStorage.clear()
	})
	$.ajax({
		type: "get",
		url: "http://www.jiangguangcan.top/School_Income1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			let list = data.msg
			for (var i in list) {
				$(".table tbody").append(
					`
              <tr>
                <td>${index+1}</td>
                <td>${list[i].time}</td>
                <td>${list[i].number}</td>
                <td>${list[i].pdate}</td>
                <td>${list[i].comp}</td>
                <td>${list[i].contact}</td>
                <td>${list[i].phone}</td>
                <td>应付${list[i].price}</td>
                <td>实付${list[i].net}</td>
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
				url: "http://api.marsen.club/cp/puradd/",
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
