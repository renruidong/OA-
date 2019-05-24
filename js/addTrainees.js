
$(function(){
  let users = JSON.parse(localStorage.getItem('users'))
  if (users == null){
    window.location.href = "login.html"
  } else{
    $(".users").html(users)
    // 侧列表导航
    let meunlist = JSON.parse(localStorage.getItem('meunlist'))
    for(let i in meunlist){
      $(".sidebar-menu").append(`
        <li><a href="${meunlist[i].purl}"><i class="fa fa-link"></i> <span>${meunlist[i].ptitle}</span></a></li>
      `)
    }
  }
// 退出操作
$(".outt").click(function(){
  localStorage.clear()
})
  //是否考证的选择
  $(".check1").click(function () {
    if($(".check2").hasClass('active-sex')){
      $(".check2").removeClass('active-sex')
      $(this).toggleClass('active-sex')
    }else{
      $(".check1").toggleClass('active-sex')
    }
  })
  $(".check2").click(function () {
    if($(".check1").hasClass('active-sex')){
      $(".check1").removeClass('active-sex')
      $(this).toggleClass('active-sex')
    }else{
      $(".check2").toggleClass('active-sex')
    }
  })

  $(".check3").click(function () {
    if($(".check4").hasClass('active-yes')){
      $(".check4").removeClass('active-yes')
      $(this).toggleClass('active-yes')
    }else{
      $(".check3").toggleClass('active-yes')
    }
  })
  $(".check4").click(function () {
    if($(".check3").hasClass('active-yes')){
      $(".check3").removeClass('active-yes')
      $(this).toggleClass('active-yes')
    }else{
      $(".check4").toggleClass('active-yes')
    }
  })
  
 // 身份证和电话号码验证
 
 $(".IDNO").blur(function (){
   let val = $(this).val()
   var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; 
   if(reg.test(val)){
   } else {
     alert("请输入正确的身份证号码")
   }
 })
 $(".mobile").blur(function (){
  let val = $(this).val()
  var reg = /^1[34578]\d{9}$/; 
  if(reg.test(val)){
  } else {
    alert("请输入正确的手机号码")
  }
})

  // 转介绍统计选择
  $('.chance').click(function(){
    $('.mengban4').slideToggle('show')
    $(".mengban4 tbody").empty()
    $(".mengban4 tbody").append(`
               <tr>
                <th>选择</th>
                <th>ID</th>
                <th>姓名</th>
                <th>性别</th>
                <th>班级</th>
                <th>转介绍人数</th>
              </tr>
        `)
    $.ajax({
      type:"get",
      url:"http://api.marsen.club/stu/search/ref/detail/",
      async:true,
      dataType:'json',
      success:function(data){
        console.log(data.stuList)
        let list = data.stuList
        for(var i in list){
          let stuInfo = list[i].stuInfo
          let number = list[i].refInfo.number
          $(".mengban4 tbody").append(
            ` <tr class="trs">
                <td><input type="radio" name="people" class="check"></td>
                <td class="id">${stuInfo.id}</td>
                <td class="ref-name">${stuInfo.name}</td>
                <td>${stuInfo.gender}</td>
                <td class="ref-class">${stuInfo.clsName}</td>
                <td>${number}</td>
              </tr>
            `
          )
        }
        // 转介绍列表页的保存和取消
        $('.check').click(function(){
          console.log($(this).prop("checked"))
          if($(this).prop("checked") == true){
            let refernal=$(this).parent().siblings(".id").html()
          $('.keep3').click(function(){
            console.log(refernal)
            $(".chance").val(refernal)
            $('.mengban4').css("display","none")
          })
        } 
        })
        $('.cance3').click(function(){
          $('.mengban4').css("display","none")
        })
      }
    })
  })

  // 班级号选择
 $(".classId").click(function(){
  $('.mengban5').slideToggle('show')
  $(".mengban5 tbody").empty()
  $(".mengban5 tbody").append(`
          <tr>
            <th>选择</th>
            <th>班级号</th>
            <th>班级名称</th>
            <th>专业</th>
            <th>应缴学费</th>
            <th>学制</th>
            <th>开班时间</th>
            <th>毕业时间</th>
          </tr>
        `)
  $.ajax({
    type:"get",
    url:"http://api.marsen.club/stu/search/cls/",
    async:true,
    dataType:'json',
    success:function(data){
      console.log(data.classes.classList)
      let list = data.classes.classList
      for(var i in list){
        $(".mengban5 tbody").append(
          `<tr class="trs">
            <td><input type="radio" name="class" class="check"></td>
            <td class="cid">${list[i].id}</td>
            <td class="tit">${list[i].title}</td>
            <td>${list[i].subject}</td>
            <td>${list[i].tution}</td>
            <td>${list[i].duration}</td>
            <td>${list[i].sDate}</td>
            <td>${list[i].gDate}</td>
          </tr>
          `
        )
      }
      // 选择班级保存和取消
      $('.check').click(function(){
        if($(this).prop("checked") == true){
          let refernal=$(this).parent().siblings(".cid").html()
        $('.keep4').click(function(){
          console.log(refernal)
          $(".classId").val(refernal)
          $('.mengban5').css("display","none")
        })
      }  
        
      })
      $('.cance4').click(function(){
        $('.mengban5').css("display","none")
      })
    }
  })

  // 当前页的保存和取消
  var obj={}
  $('.keepAll').click(function(){
    let name = $(".name").val()
    let gender = $(".active-sex").val()
    let IDNO = $(".IDNO").val()
    let mobile = $(".mobile").val()
    let source = $(".source").val()*1
    let qq = $(".qq").val()
    let address = ($(".address .address1").val()+$(".address .address2").val()+$(".address .address3").val())
    let cid = $(".classId").val()*1
    let isCertificate = $(".active-yes").val() // 是否
    let paidFee = $(".paidFee").val()*1 // 实际缴费
    let discounted = $(".discounted").val()*1 // 优惠
    let fare = $(".fare").val()*1 // 路费
    let refernal = $(".chance").val() // 转介绍学员
    let remark = $(".remark").val()
    obj={
      name,
      gender,
      IDNO,
      mobile,
      source,
      qq,
      address,
      cid,
      isCertificate,
      paidFee,
      discounted,
      fare,
      refernal,
      remark
    }
    console.log(obj)
    $.ajax({
      type:"post",
      url:"http://api.marsen.club/stu/add/stu/",
      async:true,
      dataType:'json',
      data:obj,
      success:function(data){
        console.log(data)
        if(data.code=="100"){
          alert("保存成功")
          window.location.href=document.referrer;
        }else{
          alert("保存失败，请重新输入")
        }
        
      }
    })
    
  })
  $('.canceAll').click(function(){
    window.history.back()
  })

 })
  
 // 搜索框
  $(".searchBox").click(function(){
    $(".mengban4 tbody").empty()
    let stuName = $(this).siblings("input").val()
    console.log(stuName)
    $.ajax({
      type:"get",
      url:`http://api.marsen.club/stu/search/ref/detail/?stuName=${stuName}`,
      async:true,
      dataType:'json',
      success:function(data){
        console.log(data.stuList)
        let list = data.stuList
        $(".mengban4 tbody").append(`
               <tr>
                <th>选择</th>
                <th>ID</th>
                <th>姓名</th>
                <th>性别</th>
                <th>班级</th>
                <th>转介绍人数</th>
              </tr>
        `)
        for(let i in list){
          let number = list[i].refInfo.number
          let info = list[i].stuInfo
          $(".mengban4 tbody").append(
            ` 
              <tr class="trs">
                <td><input type="radio" name="people" class="check"></td>
                <td class="id">${info.id}</td>
                <td class="ref-name">${info.name}</td>
                <td>${info.gender}</td>
                <td class="ref-class">${info.clsName}</td>
                <td>${number}</td>
              </tr>
            `
          )
        }
        
         // 转介绍列表页的保存和取消
         $('.check').click(function(){
          console.log($(this).prop("checked"))
          if($(this).prop("checked") == true){
            let refernal=$(this).parent().siblings(".id").html()
            $('.keep3').click(function(){
              console.log(refernal)
              $(".chance").val(refernal)
              $('.mengban4').css("display","none")
            })
          } 
        })
        $('.cance3').click(function(){
          $('.mengban4').css("display","none")
        })
      }
    })
  })

})




  
