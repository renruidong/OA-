$(function () {
  $('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%' // optional
  });
  $(".btn").click(function(){
    let username = $(".username").val()
    let password = $(".password").val()
    let login = {username,password}
    $.ajax({
      type:"post",
      url:"http://api.marsen.club/rbac/login/",
      async:true,
      data:login,
      dataType:'json',
      success:function(data){
        console.log(data)
        let lists = data.data
        let users = data.name
        let go = lists[0].purl
        if(data.code==200){
          localStorage.setItem('meunlist',JSON.stringify(lists))
          localStorage.setItem('users',JSON.stringify(users))
          window.location.href = go
        } else {
          alert('')
        }
      }
    })
  })

});