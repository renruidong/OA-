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
		url: "http://api.marsen.club/rbac/listrole/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data.rolelist)
			let list = data.rolelist
			for (let i in list) {
				let pList = list[i].pList
				$(".table tbody").append(
					`
        <tr>
          <td>${i}</td>
          <td>${list[i].title}</td>
          <td class="pList"><ul></ul></td>
          <td><span class="badge bg-green bianji" id="${list.id}">编辑</span><span class="badge bg-red shanchu" id="${list.id}">删除</span></td>
        </tr>
        `
				)
				for (let j in pList) {
					$(".pList ul:last").append(`
         
         <li>${pList[j].title} </li>
         `)
				}
			}

			$(".shanchu").click(function(e) {
				let id = e.currentTarget.id * 1
				$(".mengban").css("display", "block")
				console.log(id)
				$(".query").click(function() {
					$.ajax({
						type: "post",
						url: "http://api.marsen.club/cp/detrebate",
						async: true,
						dataType: 'json',
						data: id,
						success: function(data) {
							console.log(data)
							if (data.code == 200) {
								$(".mengban").css("display", "none")
								window.location.href = document.referrer;
							}
						}
					})
				})
				$(".closed").click(function() {
					$(".mengban").css("display", "none")
				})
			})



			$(".bianji").click(function() {
				$.ajax({
					type: "get",
					url: `http://api.marsen.club/cp/checkrebate?id=${id}`,
					async: true,
					dataType: 'json',
					success: function(data) {
						console.log(data)
					}
				})
				// $(this).parent().parent().replaceWith(
				//   `
				//     <td><input style="width:100%;" class="id" type="text" value="${id}"></td>
				//     <td><input style="width:100%;" name="title" class="name" type="text" placeholder="鍚堜綔浼佷笟" value="${name}"></td>
				//     <td><input style="width:100%;" type="text" class="stime" placeholder="杩旀鏃堕棿" value="${stime}"></td>
				//     <td><input style="width:100%;" type="text" class="rtime" placeholder="杩旀纭鏃堕棿" value="${rtime}"></td>
				//     <td><input style="width:100%;" type="text" class="amount" placeholder="閲戦" value="${amount}"></td>
				//     <td><input style="width:100%;" type="text" class="status" placeholder="璐﹀崟鐘舵€�" value="${status}"></td>
				//     <td><input style="width:100%;" type="text" class="confirmor" placeholder="鏀舵浜�" value="${confirmor}"></td>
				//     <td style="width:100px;"><span class="badge bg-green baocun2">淇濆瓨</span><span class="badge bg-green quxiao2">鍙栨秷</span></td>
				//   `
				// )
				// $(".baocun2").click(function(){
				//   let id = $(".id").val()*1
				//   let name = $(".name").val()
				//   let rtime = $(".rtime").val()
				//   let stime = $(".stime").val()
				//   let amount = $(".amount").val()
				//   let status = $(".status").val()
				//   let confirmor = $(".confirmor").val()
				//   objr={id,cid,name,stime,rtime,amount,status,confirmor}
				//   console.log(objr)
				//   $.ajax({
				//     type:"post",
				//     url:"http://api.marsen.club/cp/alterrebate",
				//     async:true,
				//     dataType:'json',
				//     data:objr,
				//     success:function(data){
				//       console.log(data)
				//       // if(data.code==200){
				//       //   alert("淇敼鎴愬姛")
				//       //   window.location.href=document.referrer;
				//       // }else{
				//       //   alert("淇敼澶辫触")
				//       // }
				//     }
				//   })
				// })
				$(".quxiao2").click(function() {
					window.location.href = document.referrer; 
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
      <td><input style="width:100%;" name="title" class="name" type="text" placeholder="角色名称"></td>
      <td><input style="width:100%;" type="text" class="stime" placeholder="权限描述"></td>
      <td style="width:100px;"><span class="badge bg-green baocun2">保存</span><span class="badge bg-green quxiao2">取消</span></td>
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
						alert("成功获取到数据")
						window.location.reload()
					}
				},
				error: function() {
					alert("没有找到数据")
				}
			})
		})

	})

})
