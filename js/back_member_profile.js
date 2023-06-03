// 新增會員及寵物
function doAddMember(){

    $('.BACK_ADD_NEW_MEMBER').show();
    $('.BACK_MEMBER_PROFILE').hide();
    preventDefault();

}
// 會員搜尋
function dosearch(){

    var phone = $("#phone").val();
    var name = $("#name").val();

    if (phone === "" && name === "") {
        // 若輸入欄位為空，不執行搜尋操作
        return;
    }
    $.ajax({            
        method: "POST",
        url: "http://localhost/THD101_NO1/php/back_search_member.php",
        data:{
            phone: phone, 
            name: name
        },            
        dataType: "json",
        
        success: function (response) {
            // console.log(response);
            // 更新html內容前先清空原有資料
            $("#result").html("");
            // 更新html內容(透過jQuery跑迴圈取值)
            $.each(response, function(index, row) {

                $("#result").append(
                    "<ul class='MEMBER_PROFILE_CONTENT BACK_TABLE_CONTENT' >" + 
                    "<li>" + row.NAME +"</li>" +
                    "<li>" + row.PHONENO + "</li>" +
                    "<li>" + row.CREATE_DATE + "</li>" +
                    "<li>" + "<i class='bi bi-pencil RE_MEMBER_PROFILE' onclick='doReviseMember()' >" + "</i>" + "</li>" +
                    "<li>" + "<i class='bi bi-x-lg DEL_MEMBER_BTN' onclick='doDelMember()'>" + "</i>" + "</li>" +
                    "<li>" + "<i class='bi bi-calendar-plus RESERVE_BTN' onclick='doReserve()'>" + "</i>" + "</li>" 
                    + "</ul>"
                );

            });


        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status);
        }
    });
}
// 會員修改
function doReviseMember(){
    $('.BACK_MODIFY_MEMBER').show();
    $('.BACK_MEMBER_PROFILE').hide();
}
// 會員刪除
function doDelMember(){

}
// 會員新增預約
function doReserve(){
    $('.RESERVE_BOX').css('display','block');
    $('.MASK').show();

    $('.ESC_BTN').click(function(){
        $('.RESERVE_BOX').css('display','none');
        $('.MASK').hide();
    });

    $('.MASK').click(function(){
        $('.RESERVE_BOX').css('display','none');
        $('.MASK').hide();
    });

}












// 新增會員照片

// 獲取文件上傳元素
var memberPic = document.getElementById('member_pic');
// 獲取預覽容器元素
var previewMemberPic = document.getElementById('preview_member_pic');
// 添加change事件監聽器
memberPic.addEventListener('change', function(e) {
    // 獲取選擇的文件
    var file = e.target.files[0];
    // 創建文件讀取器
    var reader = new FileReader();
    // 設置文件讀取器的加載完成事件
    reader.onload = function(e) {
        // 創建圖像元素
        var img = document.createElement('img');
        // 設置預覽圖像的src屬性為讀取到的文件內容
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        // 清空預覽容器
        previewMemberPic.innerHTML = '';
        // 將預覽的圖像元素添加到預覽容器中
        previewMemberPic.appendChild(img);
    }
    // 讀取文件內容
    reader.readAsDataURL(file);
});

// 新增寵物照片
var petPic = document.getElementById('pet_pic');
var previewPetPic = document.getElementById('preview_pet_pic');
petPic.addEventListener('change',function (e) {
    var file = e.target.files[0];
    // console.log(file);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = function(e){
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        previewPetPic.innerHTML = '';
        previewPetPic.appendChild(img);
    }
    reader.readAsDataURL(file);
});

// 修改會員照片
var memberPicRevise = document.getElementById('member_pic_revise');
var previewMemberPicRevise = document.getElementById('preview_member_pic_revise');
memberPicRevise.addEventListener('change',function (e) {
    var file = e.target.files[0];
    // console.log(file);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = function(e){
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        previewMemberPicRevise.innerHTML = '';
        previewMemberPicRevise.appendChild(img);
    }
    reader.readAsDataURL(file);
});

// 修改寵物照片
var petPicRevise = document.getElementById('pet_pic_revise');
var previewPetPicRevise = document.getElementById('preview_pet_pic_revise');
petPicRevise.addEventListener('change',function (e) {
    var file = e.target.files[0];
    // console.log(file);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = function(e){
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('PREVIEW_IMG');
        previewPetPicRevise.innerHTML = '';
        previewPetPicRevise.appendChild(img);
    }
    reader.readAsDataURL(file);
});




