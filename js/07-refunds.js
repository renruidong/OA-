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
	let id = window.location.search
	let cid = id.slice(5)
	// console.log(cid)
	$.ajax({
		type: "get",
		url: `http://www.jiangguangcan.top/School2/?cid=${cid}`,
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			var inner = ''
			for (let i in data.data) {
				let list = data.data[i]
				var cid = list.cid * 1
				inner +=
					`
              <tr>
                <td>${i}</td>
                <td>${list.name}</td>
                <td>${list.stime}</td>
                <td>${list.rtime}</td>
                <td>${list.amount}</td>
                <td>${list.status}</td>
                <td>${list.confirmor}</td>
                <td><span class="badge bg-green bianji" id="${list.id}">编辑</span><span class="badge bg-red shanchu" id="${list.id}">删除</span></td>
              </tr>
            `
			}
			$(".table tbody").append(inner)

			$(".shanchu").click(function(e) {
				let id = e.currentTarget.id * 1
				$(".mengban").css("display", "block")
				console.log(id)
				$(".query").click(function() {
					$.ajax({
						type: "get",
						url: `http://www.jiangguangcan.top/School2/?id=${id}`,
						async: true,
						dataType: 'json',
						success: function(data) {
							console.log(data)
							if (data.code == 200) {
								alert("删除成功")
								window.location.reload(); 
							}
						},
						error: function() {
							alert("删除失败，请重新操作")
						}
					})
				})
				$(".closed").click(function() {
					$(".mengban").css("display", "none")
				})
			})

			$(".bianji").click(function(e) {
				let id = e.currentTarget.id
				let that = this
				$.ajax({
					type: "get",
					url: `http://www.jiangguangcan.top/School2/?id=${id}`,
					async: true,
					dataType: 'json',
					success: function(data) {
						console.log(data.data[0])
						let lista = data.data[0]
						console.log($(this).parent().parent())
						$(that).parent().parent().replaceWith(
							`
                <td><input style="width:100%;" class="id" type="text" value="${lista.id}"></td>
                <td><input style="width:100%;" name="title" class="name" type="text" placeholder="合作企业名称" value="${lista.name}"></td>
                <td><input style="width:100%;" type="text" class="stime" placeholder="返款时间" value="${lista.stime}"></td>
                <td><input style="width:100%;" type="text" class="rtime" placeholder="返款确认时间" value="${lista.rtime}"></td>
                <td><input style="width:100%;" type="text" class="amount" placeholder="金额" value="${lista.amount}"></td>
                <td><input style="width:100%;" type="text" class="status" placeholder="账单状态" value="${lista.status}"></td>
                <td><input style="width:100%;" type="text" class="confirmor" placeholder="收款人" value="${lista.confirmor}"></td>
                <td style="width:100px;"><span class="badge bg-green baocun2">保存</span><span class="badge bg-green quxiao2">取消</span></td>
              `
						)
						$(".baocun2").click(function() {
							let id = $(".id").val() * 1
							let rtime = $(".rtime").val()
							let stime = $(".stime").val()
							let amount = $(".amount").val()
							let status = $(".status").val() * 1
							let confirmor = $(".confirmor").val()
							objr = {
								id,
								cid,
								stime,
								rtime,
								amount,
								status,
								confirmor
							}
							console.log(objr)
							$.ajax({
								type: "post",
								url: "http://api.marsen.club/cp/alterrebate",
								async: true,
								dataType: 'json',
								data: objr,
								success: function(data) {
									console.log(data)
									if (data.code == 200) {
										alert("企业信息修改成功")
										window.location.href = document.referrer; 
									} else {
										alert("保存失败")
									}
								},
								error: function() {
									alert("保存失败，请重新输入")
								}
							})
						})
						$(".quxiao2").click(function() {
							window.location.reload(); 
						})
					}
				})


			})
		}
	})


	var html = "";
	$(".bread").click(function() {
		html =
			`
    <tr class="into">
      <td><input style="width:100%;" class="id" type="text"></td>
      <td><input style="width:100%;" name="title" class="name" type="text" placeholder="合作企业名称"></td>
      <td><input style="width:100%;" type="text" class="stime" placeholder="返款时间"></td>
      <td><input style="width:100%;" type="text" class="rtime" placeholder="返款确认时间"></td>
      <td><input style="width:100%;" type="text" class="amount" placeholder="金额"></td>
      <td><input style="width:100%;" type="text" class="status" placeholder="账单状态"></td>
      <td><input style="width:100%;" type="text" class="confirmor" placeholder="收款人"></td>
      <td style="width:100px;"><span class="badge bg-green baocun2">保存</span><span class="badge bg-blue quxiao2">取消</span></td>
    </tr>
    `
		$(".table tbody").append(html)
		$(".into .quxiao2").click(function() {
			$(this).parent().parent().empty()
		})

		$(".into .baocun2").click(function() {
			let rtime = $(".rtime").val()
			let stime = $(".stime").val()
			let amount = $(".amount").val()
			let status = $(".status").val() * 1
			let confirmor = $(".confirmor").val()
			let objs = {
				cid,
				stime,
				rtime,
				amount,
				status,
				confirmor
			}
			console.log(objs)
			$.ajax({
				type: "post",
				url: "http://api.marsen.club/cp/addrebate/",
				async: true,
				dataType: 'json',
				data: objs,
				success: function(data) {
					console.log(data)
					if (data.code == 200) {
						alert("保存成功")
						window.location.reload()
					}
				},
				error: function() {
					alert("保存失败，请重新输入")
				}
			})
		})

	})

})
