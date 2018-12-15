
$(function () {
  $('#form').bootstrapValidator({
// 　　　　　　　　message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        // message: '用户名验证失败',
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength:{
            min: 2,
            max: 6,
            message: '用户名必须为2-6位'
          },
          callback:{
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须为6-12位'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  })
  //阻止浏览器跳转
  $('#form').on('success.form.bv', function (e) {
    // console.log(e)
    e.preventDefault()    

    //ajax发送请求
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (res) {
        // console.log(res)
        if (res.success) {
          // console.log(res)
          
          // console.log(res.success);
          
          location.href = 'index.html'
        }
        if (res.error === 1000) {
          $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        }
        if (res.error === 1001) {
          $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
          // alert(2)
        }
      
    }
  })
})
  $('button[type="reset"]').on('click', function () {
    $('#form').data("bootstrapValidator").resetForm()
  })
})