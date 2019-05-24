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
	let sid = id.slice(5)
	console.log(sid)
	$.ajax({
		type: "get",
		url: `http://www.jiangguangcan.top/statistics2//?sid=${sid}`,
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data.stuList[0])
			let list = data.stuList[0]
			var sname = list.stuInfo.name
			var sclass = list.stuInfo.clsName
			$(".title").append(
				` 
                <p>由谁介绍入学</p><span>${list.rstuInfo.clsName}-${list.rstuInfo.name}</span>
            `
			)
			for (let i in list.refInfo.rStuList) {
				let rStuList = list.refInfo.rStuList[i]
				console.log(rStuList)
				$(".jieshao .toLi").append(
					` 
             <li>${rStuList.clsName}-${rStuList.name}</li>
            `
				)
			}
			$(".box-title").append(sclass + '-' + sname)
		}
	})
	$(".add").click(function() {
		$(".mengban4").slideToggle('show')
		$(".mengban4 tbody").empty()
		$(".mengban4 tbody").append(
			` <tr>
            <th>选择</th>
            <th>姓名</th>
            <th>性别</th>
            <th>班级</th>
            <th>转介绍人数</th>
          </tr>
        `
		)
		$.ajax({
			type: "get",
			url: `http://www.jiangguangcan.top/statistics2/?sid=${sid}`,
			async: true,
			dataType: 'json',
			success: function(data) {
				console.log(data.stuList)
				let list = data.stuList
				for (var i in list) {
					let stuInfo = list[i]
					$(".mengban4 tbody").append(
						` <tr class="trs">
						  <td><input type="checkbox" name="people" class="check1" value=${stuInfo.id}></td>
						  <td class="ref-name">${stuInfo.name}</td>
						  <td>${stuInfo.gender}</td>
						  <td class="ref-class">${stuInfo.clsName}</td>
						  <td>${stuInfo.refNumber}</td>
						</tr>
					  `
					)
				}
				$(".searchBox").click(function() {
					$(".mengban4 tbody").empty()
					$(".mengban4 tbody").append(
						` <tr>
							  <th>选择</th>
							  <th>姓名</th>
							  <th>性别</th>
							  <th>班级</th>
							  <th>转介绍人数</th>
							</tr>
						  `
					)
					let stuName = $(this).siblings("input").val()
					console.log(stuName)
					$.ajax({
						type: "get",
						url: `http://www.jiangguangcan.top/statistics2/?sid=${sid}&stuName=${stuName}`,
						async: true,
						dataType: 'json',
						success: function(data) {
							console.log(data.stuList)
							let list = data.stuList
							for (var i in list) {
								let stuInfo = list[i]
								$(".mengban4 tbody").append(
									` <tr class="trs">
										<td><input type="checkbox" name="people" class="check1" value=${stuInfo.id}></td>
										<td class="ref-name">${stuInfo.name}</td>
										<td>${stuInfo.gender}</td>
										<td class="ref-class">${stuInfo.clsName}</td>
										<td>${stuInfo.refNumber}</td>
									  </tr>
									`
								)
							}

							// $('.query').click(function(){
							//   let radio = $(".check1")
							//   for(var i in radio){
							//     console.log(radio[i].checked)
							//     if(radio[i].checked == true){
							//       let stus = radio[i].value
							//       let rstu = sid
							//       let rad = radio[i]
							//       let refernal=$(rad).parent().siblings(".ref-class").html()+'-'+$(rad).parent().siblings(".ref-name").html()
							//       $.ajax({
							//           type:"post",
							//           url:"http://10.8.152.55:8001/stu/add/ref/",
							//           async:true,
							//           data:{stus,rstu},
							//           dataType:'json',
							//           success:function(data){
							//             console.log(data)
							//           }
							//       })
							//       $(".jieshao .toLi").append(
							//         `<li>${refernal}</li>`
							//       ) 
							//       $('.mengban4').css("display","none")
							//     }
							//   }

							// })
							// $('.closed').click(function(){
							//   $('.mengban4').css("display","none")
							// })
						}
					})
				})
				$('.query').click(function() {
					let radio = $(".check1")
					let rstu = sid
					let stus = ''
					for (var i in radio) {
						console.log(radio[i].checked)
						if (radio[i].checked == true) {
							stus += (radio[i].value + '#')
							// let rad = radio[i]
							// let refernal=$(rad).parent().siblings(".ref-class").html()+'-'+$(rad).parent().siblings(".ref-name").html()

							// $(".jieshao .toLi").append(
							//   `<li>${refernal}</li>`
							// ) 

						}IntroductionDetail
						$.ajax({
							type: "post",
							url: "http://api.marsen.club/stu/add/ref/",
							async: true,
							data: {
								stus,
								rstu
							},
							dataType: 'json',
							success: function(data) {
								console.log(data)
								$('.mengban4').css("display", "none")
								window.location.href = document.referrer; 
							}
						})
					}

				})

				$('.closed').click(function() {
					$('.mengban4').css("display", "none")
				})

			}
		})

	})

})
