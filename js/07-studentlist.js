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
	console.log(cid)
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
				inner +=
					`
              <tr>
                <td>${i}</td>
                <td>${list.name}</td>
                <td>${list.title}</td>
                
              </tr>
            `
			}
			$(".table tbody").append(inner)

		}
	})
})
