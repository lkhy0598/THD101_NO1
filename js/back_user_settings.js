$(document).ready(function () {

    $('.BACK_ADD_USER_ALL').hide();
  
    $('.BACK_NAV ul li').eq(0).click(function () {
      $('.BACK_ADD_USER_ALL').show();
      $('.BACK_USER_SETTINGS_ALL').hide();
      event.preventDefault();
    })
  
    $('.CANCEL').eq(0).click(function () {
      $('.BACK_USER_SETTINGS_ALL').show();
      $('.BACK_ADD_USER_ALL').hide();
    })
  
  })

// 使用者設定_上傳圖片
var userPic = document.getElementById('user_pic');
var previewUserPic = document.getElementById('preview_user_pic');
userPic.addEventListener('change', function (e) {
    var file = e.target.files[0];
    // console.log(file);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        previewUserPic.innerHTML = '';
        previewUserPic.appendChild(img);
    }
    reader.readAsDataURL(file);
})

// 新增使用者_上傳圖片
var addUserPic = document.getElementById('add_user_pic');
var previewAddUserPic = document.getElementById('preview_add_user_pic');
addUserPic.addEventListener('change', function (e) {
    var file = e.target.files[0];
    // console.log(file);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        previewAddUserPic.innerHTML = '';
        previewAddUserPic.appendChild(img);
    }
    reader.readAsDataURL(file);
})