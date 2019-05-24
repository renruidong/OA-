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
		url: "http://www.jiangguangcan.top/Enterprise1/",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			appends(data)
			all()
		}
	})
	// $(".searchRes").click(function() {
	// 	$(".content").empty()
	// 	$(".content").append(
	// 		`
 //      <div class="mengban3"></div>
 //      <div class="box text">
 //        <div class="box-header with-border">
 //        <p>备注：1.考证企业的企业类型type为2.增加考证信息的时候必带参数etype=2； 2.收款账号和收款人信息如果没有，传入空的字符串即可</p>
 //          <h3 class="box-title"><input type="text" class="name" placeholder="公司名称"></h3>
 //          <ul>
 //            <li><span>联系人</span><span><input class="contact" type="text"></span></li>
 //            <li><span>联系方式</span><span><input class="phone" type="text"></span></li>
 //            <li><span>发票抬头</span><span><input class="title" type="text"></span></li>
 //            <li><span>税号</span><span><input class="number" type="text"></span></li>
 //            <li><span>企业地址</span><span><input class="address" type="text"></span></li>
 //            <li><span>收款账号</span><span><input class="account" type="text"></span></li>
 //            <li><span>收款人</span><span><input class="payee" type="text"></span></li>
 //            <li><span>企业类型</span><span><input class="etype" type="text" value="2"></span></li>
 //          </ul>
 //          <div class="box-tools pull-right">
 //            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
 //            </button>
 //            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
 //          </div>
 //        </div>
 //        <div class="box-footer text-center">
 //          <a href="javascript:void(0)" class="percase">保存</a>
 //          <a href="javascript:void(0)" class="uppercase">取消</a>
 //        </div>
 //      </div>
 //    `
	// 	)
	// 	let name = $(".search").val()
	// 	$.ajax({
	// 		type: "get",
	// 		url: `http://api.marsen.club/cp/texshow/?name=${name}`,
	// 		async: true,
	// 		dataType: 'json',
	// 		success: function(data) {
	// 			console.log(data)
	// 			if (data.list == 0) {
	// 				alert("没有找到相关企业")
	// 			} else {
	// 				appends(data)
	// 				all()
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
				url: "http://www.jiangguangcan.top/Enterprise1/",
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
			$(".content .text").slideToggle("hide")
		})
	})

	function appends(data) {
		let list = data
		for (var i in list) {
			$(".content").append(
				` <div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">${list[i].name}</h3>
						<ul class="title-content">
							<li><span>联系人</span><span>${list[i].contact}</span></li>
							<li><span>联系方式</span><span>${list[i].phone}</span></li>
							<li><span>发票抬头</span><span>${list[i].invoice_title}</span></li>
							<li><span>税号</span><span>${list[i].tax_number}</span></li>
						</ul>
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-box-tool add" id="${list[i].cid}">添加
							</button>
							<button type="button" class="btn btn-box-tool txt" id="${list[i].cid}">编辑
							</button>
							<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
							</button>
							<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
						</div>
					</div>
					<div class="box-body">
						<div class="table-responsive">
							<table class="table no-margin">
								<thead>
									<tr>
										<th>证件</th>
										<th>部门</th>
										<th>人数</th>
										<th>价格</th>
										<th>回馈</th>
										<th>考证时间</th>
										<th>备注</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody class="home-tbody">
								
								</tbody>
							</table>
						</div>
					</div>
				</div>
			`
			)
			let cardList = list[i]
			console.log(cardList)
			for (let j = 0; j < cardList.length; j++) {
				console.log(cardList[j])
				$(".home-tbody:last").append(
					`  <tr>
                <td>${cardList[j].certificate}</td>
                <td>${cardList[j].department}</td>
                <td>${cardList[j].number}</td>
                <td>￥${cardList[j].price}</td>
                <td>￥${cardList[j].profit}</td>
                <td>${cardList[j].cdate}</td>
                <td>${cardList[j].remark}</td>
                <td><span class="badge bg-green bianji" id="${cardList[j].sid}" dataid="${list[i].cid}">编辑</span><span id="${cardList[j].sid}" class="badge bg-red shanchu">删除</span></td>
              </tr>
            `
				)
			}
		}
	}

	function all() {
		$(".bianji").click(function(e) {
			id = e.currentTarget.id
			// sid = id.slice('-',2)
			// cid = id.slice('-',1)
			// console.log(sid,cid)
			$.ajax({
				type: "get",
				url: `http://www.jiangguangcan.top/Enterprise2/?sid=${id}`,
				async: true,
				dataType: 'json',
				success: function(data) {
					console.log(data.data)
					let datas = data.data
					$(".content .mengban3").slideToggle("show")
					$(".content .mengban3").append(
						`
            <div class="cont-text">
              <h3>编辑考证信息</h3>
              <table class="table no-margin">
                <thead>
                  <tr>
                    <th>什么证件</th>
                    <th>什么部门</th>
                    <th>多少人</th>
                    <th>价格</th>
                    <th>回馈</th>
                    <th>考证时间</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input class="cname" type="text" value="${datas.certificate}" /></td>
                    <td><input class="department" type="text" value="${datas.department}" /></td>
                    <td><input class="cnumber" type="text" value="${datas.number}" /></td>
                    <td>￥<input class="price" type="text" value="${datas.price}" /></td>
                    <td>￥<input class="profit" type="text" value="${datas.profit}" /></td>
                    <td><input class="cdate" type="text" value="${datas.cdate}" /></td>
                    <td><input class="remark" type="text" value="${datas.remark}" /></td>
                  </tr>
                </tbody>
              </table>
              <div class="foot">
                <button class="keep_bj">保存</button>
                <button class="cancel">取消</button>
              </div>
            </div>
          `
					)
					$(".keep_bj").click(function() {
						let cname = $(".cname").val()
						let department = $(".department").val()
						let cnumber = $(".cnumber").val()
						let price = $(".price").val()
						let profit = $(".profit").val()
						let cdate = $(".cdate").val()
						let remark = $(".remark").val()
						obj3 = {
							id,
							cname,
							department,
							cnumber,
							price,
							profit,
							cdate,
							remark
						}
						console.log(obj3)
						$.ajax({
							type: "post",
							url: "http://www.jiangguangcan.top/Enterprise1/",
							async: true,
							data: obj3,
							dataType: 'json',
							success: function(data) {
								console.log(data)
								alert(data.status)
								window.location.reload()
							}
						})
					})
					$(".cancel").click(function() {
						$(".mengban3").slideToggle("show")
					})
				}
			})

		})
		$(".box-primary .add").click(function(e) {
			cid = e.currentTarget.id
			console.log(cid)
			$(".content .mengban3").slideToggle("show")
			$(".content .mengban3").append(
				`
        <div class="cont-text">
          <h3>添加考证信息</h3>
          <table class="table no-margin">
            <thead>
              <tr>
                <th>什么证件</th>
                <th>什么部门</th>
                <th>多少人</th>
                <th>价格</th>
                <th>回馈</th>
                <th>考证时间</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input class="cnames" type="text"></td>
                <td><input class="departments" type="text"></td>
                <td><input class="cnumbers" type="text"></td>
                <td>￥<input class="prices" type="text"></td>
                <td>￥<input class="profits" type="text"></td>
                <td><input class="cdates" type="text"></td>
                <td><input class="remarks" type="text"></td>
              </tr>
            </tbody>
          </table>
          <div class="foot">
            <button class="keep">保存</button>
            <button class="cancel">取消</button>
          </div>
        </div>
      `
			)
			$(".keep").click(function() {
				let cname = $(".cnames").val()
				let department = $(".departments").val()
				let cnumber = $(".cnumbers").val()
				let price = $(".prices").val()
				let profit = $(".profits").val()
				let cdate = $(".cdates").val()
				let remark = $(".remarks").val()
				obj1 = {
					cid,
					cname,
					department,
					cnumber,
					price,
					profit,
					cdate,
					remark
				}
				console.log(obj1)
				$.ajax({
					type: "post",
					url: "http://api.marsen.club/cp/cardadd/",
					async: true,
					data: obj1,
					dataType: 'json',
					success: function(data) {
						// console.log(data)
						alert(data.msg)
						window.location.reload()
					}
				})
			})
			$(".cancel").click(function() {
				$(".mengban3").slideToggle("show")
			})
		})
		$(".txt").click(function(e) {
			$(".content .mengban3").slideToggle("show")
			let id = e.currentTarget.id
			console.log(id)
			$.ajax({
				type: "get",
				url: `http://api.marsen.club/cp/texshow/?cid=${id}`,
				async: true,
				dataType: 'json',
				success: function(data) {
					txts(data)
					$(".keep").click(function() {
						let cid = id * 1
						let name = $(".title").html()
						let contact = $(".contact").val()
						let phone = $(".phone").val()
						let title = $(".invoice_title").val()
						let number = $(".tax_number").val()
						let address = $(".address").val()
						let account = $(".account").val()
						let payee = $(".payee").val()
						let objs = {
							cid,
							name,
							contact,
							phone,
							title,
							number,
							address,
							account,
							payee
						}
						console.log(objs)
						$.ajax({
							type: "post",
							url: "http://api.marsen.club/cp/compalter/",
							async: true,
							data: objs,
							dataType: 'json',
							success: function(data) {
								console.log(data)
								alert("获取到数据")
								window.location.reload()
							}
						})

					})
					$(".cancel").click(function() {
						$(".mengban3").slideToggle("show")
					})

				}
			})
		})
	}

	function txts(data) {
		let lis = data.list
		for (let i in lis) {
			$(".content .mengban3").append(
				`
        <div class="cont-text">
          <h3 class="title">${lis[i].name}</h3>
          <ul>
            <li><span>联系人</span><span><input type="text" class="contact" value="${lis[i].contact}"></span></li>
            <li><span>联系方式</span><span><input type="text" class="phone" value="${lis[i].phone}"></span></li>
            <li><span>发票抬头</span><span><input type="text" class="invoice_title" value="${lis[i].invoice_title}"></span></li>
            <li><span>税号</span><span><input type="text" class="tax_number" value="${lis[i].tax_number}"></span></li>
            <li><span>企业地址</span><span><input type="text" class="address" value="${lis[i].address}"></span></li>
            <li><span>收款账号</span><span><input type="text" class="account" value="${lis[i].account}"></span></li>
            <li><span>收款人</span><span><input type="text" class="payee" value="${lis[i].payee}"></span></li>
          </ul>
          <div class="foot">
            <button class="keep">保存</button>
            <button class="cancel">取消</button>
          </div>
        </div>
      `
			)
		}
	}
})
