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
 //          <li><a href="${meunlist[i].purl}"><i class="fa fa-link"></i> <span>${meunlist[i].ptitle}</span></a></li>
 //        `
	// 		)
	// 	}
	// }
	$(".outt").click(function() {
		localStorage.clear()
	})
	$.ajax({
		type: "get",
		url: "http://api.marsen.club/rbac/users/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data.userList)
			let list = data.userList
			for (var i in list) {
				let rlist = list[i].rList
				$(".content").append(
					` <div class="manage">
                <div class="manage-top">
                  <h4>${list[i].name}</h4>
                  <button class="toTxt" id="${list[i].id}">编辑</button>
                </div>
                <ul class="manage-content">
                  <li><span>职务</span><span class="rlis"></span></li>
                  <li><span>性别</span><span>${list[i].gender}</span></li>
                  <li><span>权限</span><span><ul class="pInfo"></ul></span></li>
                  <li><span>账号</span><span>${list[i].username}</span></li>
                  <li><span>密码</span><span>${list[i].password}</span></li>
                </ul>
              </div>
            `
				)
				for (var j in rlist) {
					$(".rlis:last").append(`<span>${rlist[j].rtitle}</span>`)
					let pInfoList = rlist[j].pInfoList

					for (var k in pInfoList) {
						$(".pInfo:last").append(`<li>${pInfoList[k].ptitle}</li>`)
					}
				}
			}

			$(".toTxt").click(function(e) {
				uid = e.currentTarget.id
				console.log(uid)
				$(".txt-tanchuang").slideToggle("show")
				$.ajax({
					type: "get",
					url: `http://api.marsen.club/rbac/users/?uid=${uid}`,
					async: true,
					dataType: 'json',
					success: function(data) {
						console.log(data.userList)
						let list = data.userList
						for (let i in list) {
							let rlist = list[i].rList
							$(".txt-tanchuang").append(
								` <div class="manage">
									<div class="manage-top">
										<h4>添加管理员</h4>
									</div>
									<p style="text-indent:15px">*密码请设置6位以上</p>
									<ul class="manage-content">
									<li><span>姓名</span><span><input class="names" type="text" value="${list[i].name}"></span></li>
									<li><span>性别</span><span><input class="check1" type="button" value="男"/><input  class="check2" type="button" value="女"/></span></li>
									<li><span>账号</span><span><input class="usernames" type="text" value="${list[i].username}" /></span></li>
									<li><span>密码</span><span><input class="passwords" type="text" value="${list[i].password}" /></span></li>
									<li>
									<span>职务</span>
										<span>
											<ul id="zhiwu">
												<li id="1">超级管理员</li>
												<li id="2">管理员</li>
												<li id="3">行政</li>
												<li id="4">财务</li>
												<li id="5">学员信息录入</li>
											</ul>
										</span>
									</li>
									<li>
										<span>权限</span>
										<span>
											<ul class="quanxian">
												
											</ul>
										</span>
									</li>
								  </ul>
								  <div class="manage-foot">
									  <button class="keep2">保存</button>
									  <button class="cancel2">取消</button>
									  <button class="deletes2">删除</button>
								  </div>
								</div>
							  `
							)
							for (let j in rlist) {
								let pInfoList = rlist[j].pInfoList
								for (let k in pInfoList) {
									$(".quanxian").append(`<li>${pInfoList[k].ptitle}</li>`)
								}
							}

						}
						$("#zhiwu li").click(function() {
							// $(this).siblings().removeClass()
							$(this).toggleClass('checked1')
						})
						$(".check1").click(function() {
							if ($(".check2").hasClass('checked')) {
								$(".check2").removeClass('checked')
								$(this).toggleClass('checked')
							} else {
								$(".check1").toggleClass('checked')
							}
						})
						$(".check2").click(function() {
							if ($(".check1").hasClass('checked')) {
								$(".check1").removeClass('checked')
								$(this).toggleClass('checked')
							} else {
								$(".check2").toggleClass('checked')
							}
						})
						$(".keep2").click(function() {
							let name = $(".names").val()
							let gender = $(".checked").val()
							let username = $(".usernames").val()
							let password = $(".passwords").val()
							let roles = ''
							let check = $(".checked1")
							for (var i = 0; i < check.length; i++) {
								console.log(check[i].id)
								roles += check[i].id + "#"
							}
							console.log(name, gender, username, password, roles)
							obj = {
								uid,
								name,
								gender,
								username,
								password,
								roles
							}
							$.ajax({
								type: "post",
								url: "http://api.marsen.club/rbac/edituser/",
								async: true,
								data: obj,
								dataType: 'json',
								success: function(data) {
									console.log(data)
									if (data.msg == "成功") {
										alert("保存成功")
										window.location.reload()
										$(".txt-tanchuang").slideToggle("show")
									}
									
								},
								error: function() {
									alert("濮撳悕閲嶅锛岃鐢ㄦ埛宸插瓨鍦�")
								}
							})
						})
						$(".cancel2").click(function() {
							$(".txt-tanchuang").slideToggle("show")
						})
						$(".deletes2").click(function() {
							$.ajax({
								type: "get",
								url: `http://api.marsen.club/rbac/deluser/?uid=${uid}`,
								async: true,
								dataType: 'json',
								success: function(data) {
									console.log(data)
									alert(data.msg)
									window.location.reload()
								}
							})
						})

					}
				})
			})

			$(".bread").click(function() {
				$(".add-tanchuang").slideToggle("show")
			})
			$(".check1").click(function() {
				if ($(".check2").hasClass('checked')) {
					$(".check2").removeClass('checked')
					$(this).toggleClass('checked')
				} else {
					$(".check1").toggleClass('checked')
				}
			})
			$(".check2").click(function() {
				if ($(".check1").hasClass('checked')) {
					$(".check1").removeClass('checked')
					$(this).toggleClass('checked')
				} else {
					$(".check2").toggleClass('checked')
				}
			})
			$("#zhiwu li").click(function() {
				// $(this).siblings().removeClass()
				$(this).toggleClass('checked1')
			})

			$(".keep").click(function() {
				let name = $(".name").val()
				let gender = $(".checked").val()
				let username = $(".username").val()
				let password = $(".password").val()
				let roles = ''
				let check = $(".checked1")
				for (var i = 0; i < check.length; i++) {
					console.log(check[i].id)
					roles += check[i].id + "#"
				}
				console.log(name, gender, username, password, roles)
				obj = {
					name,
					gender,
					username,
					password,
					roles
				}
				$.ajax({
					type: "post",
					url: "http://api.marsen.club/rbac/adduser/",
					async: true,
					data: obj,
					dataType: 'json',
					success: function(data) {
						console.log(data)
						if (data.msg == "成功") {
							alert("保存成功")
							window.location.reload()
							$(".txt-tanchuang").slideToggle("show")
						}
					}
				})

			})
			$(".cancel").click(function() {
				$(".add-tanchuang").slideToggle("show")
			})
		}
	})

})
