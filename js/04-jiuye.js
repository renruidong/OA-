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
		url: "http://www.jiangguangcan.top/employment1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			let list = data.employment
			console.log(list)
			for (var i in list) {
				$(".needPeople tbody").append(
					` 
            <tr>
              <td>${list[i].name}</td>
              <td>${list[i].phone}</td>
              <td>${list[i].wechat}</td>
              <td>${list[i].salary}</td>
			  <td>${list[i].company}</td>
			  <td>${list[i].place}</td>
			  <td>${list[i].gradu_time}</td>
			  <td>${list[i].work_time}</td>
              <td><span class="badge bg-green" id=${list[i].id}>查看</span></td>
            </tr>
          `
				)
			}
			$(".badge").click(function(e) {
				id = e.currentTarget.id
				location.href = "04-person.html?id=" + id

			})
		}
	})
	var html = "";
	// $(".bread").click(function() {
	// 	html =
	// 		`
  // <tr>
  //   <td><input type="text" class="sid" placeholder="姓名"></td>
	// <td><input class="phone" type="text" placeholder="电话"></td>
	// <td><input class="phone" type="text" placeholder="微信"></td>
	// <td><input class="salary" type="text" placeholder="薪资"></td>
	// <td><input class="cid" type="text" placeholder="公司"></td>
  //   <td><input class="address" type="text" placeholder="地址"></td>
  //   <td><input class="gdates" type="text" placeholder="毕业时间"></td>
  //   <td><input class="entry_date" type="text" placeholder="入职时间"></td>
  //   <td style="width:100px;"><span class="badge bg-green baocun">保存</span><span class="badge bg-blue quxiao">取消</span></td>
  // </tr>
  // `
	// 	$(".box-body tbody").append(html)
	// 	$(".quxiao").click(function() {
	// 		window.location.reload()
	// 	})
	// 	var name = ''
	// 	var sids = ''
	// 	var cids = ''
	// 	var address = ''
	
	// 	$(".cid").click(function() {
	// 		$(".mengban4").slideToggle("show")
	// 		$(".mengban4 .jieshao").empty()
	// 		$(".mengban4 .jieshao").append(
	// 			` <div class="jieshao-top">
  //         <h4>选择公司</h4>
  //         <input type="text" class="search" placeholder="搜索信息"><i class="fa fa-search searchBox"></i>
  //       </div>
  //       <table class="table detailTable">
  //         <tbody>
  //           <tr>
  //             <th>选择</th>
  //             <th>公司名称</th>
  //             <th>公司地址</th>
  //             <th>联系方式</th>
  //           </tr>
  //         </tbody>
  //       </table>
  //       <div class="jieshao-foot">
  //         <button class="keep4">保存</button>
  //         <button class="cance4">取消</button>
  //       </div>
  //     `
	// 		)
	// 		$.ajax({
	// 			type: "get",
	// 			url: "http://www.jiangguangcan.top/employment1/",
	// 			async: true,
	// 			dataType: 'json',
	// 			success: function(data) {
	// 				// console.log(data)
	// 				let liss = data.data
	// 				for (let i in liss) {
	// 					$(".mengban4 tbody").append(
	// 						`<tr>
	// 							<td><input type="radio" id="${liss[i].id}" name="people" class="check1"></td>
	// 							<td class="name">${liss[i].name}</td>
	// 							<td>${liss[i].place}</td>
	// 							<td>${liss[i].phone}</td>
	// 						  </tr>
	// 						`
	// 					)
	// 				}
	// 			}
	// 		})
	// 		$(".searchBox").click(function() {
	// 			let name = $(".search").val()
	// 			$.ajax({
	// 				type: "get",
	// 				url: `http://www.jiangguangcan.top/employment2/${name}`,
	// 				async: true,
	// 				dataType: 'json',
	// 				success: function(data) {
	// 					console.log(data.data)
	// 					let List = data.data
	// 					$(".mengban4 tbody").empty()
	// 					$(".mengban4 tbody").append(
	// 						`
	// 						<tr>
	// 						  <th>选择</th>
	// 						  <th>公司名称</th>
	// 						  <th>公司地址</th>
	// 						  <th>联系方式</th>
	// 						</tr>
	// 					  `
	// 					)
	// 					for (let i in List) {
	// 						$(".mengban4 tbody").append(
	// 							` <tr>
  //                 <td><input type="radio" id="${List[i].id}" name="people" class="check1"></td>
  //                 <td class="name">${List[i].name}</td>
  //                 <td>${List[i].address}</td>
  //                 <td>${List[i].phone}</td>
  //               </tr>
  //             `
	// 						)
	// 					}
	// 				}
	// 			})
	// 		})
	// 		$('.keep4').click(function() {
	// 			let radio2 = $(".check1")
	// 			for (let i = 0; i < radio2.length; i++) {
	// 				if (radio2[i].checked == true) {
	// 					cids = radio2[i].id
	// 					cname = radio2[i].parentNode.nextSibling.nextSibling.innerHTML
	// 					address = radio2[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML
	// 					phone = radio2[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML
	// 				}
	// 			}
	// 			$(".cid").val(cname)
	// 			$(".address").val(address)
	// 			$(".phone").val(phone)
	// 			$('.mengban4').css("display", "none")
	// 		})

	// 		$('.cance4').click(function() {
	// 			$('.mengban4').css("display", "none")
	// 		})
	// 	})
	// 	$(".baocun").click(function() {
	// 		let entry_date = $(".entry_date").val()
	// 		let salary = $(".salary").val()
	// 		let obj = {
	// 			entry_date,
	// 			salary
	// 		}
	// 		// console.log(obj)
	// 		$.ajax({
	// 			type: "post",
	// 			url: "http://www.jiangguangcan.top/employment1/",
	// 			async: true,
	// 			dataType: 'json',
	// 			contentType:"application/json;charset=utf-8",
	// 			data:JSON.stringify(obj),
	// 			success: function(data) {
	// 				if (data.code == 200) {
	// 					alert("添加信息成功")
	// 					window.location.reload()
	// 				}

	// 			}
	// 		})
	// 		console.log(obj)
	// 	})

	// })

})
