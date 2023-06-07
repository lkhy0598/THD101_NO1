// 新增會員及寵物
function doAddMember(){

    const newmember_name = $('#newmember_name').val().trim();
    const newmember_phone = $('#newmember_phone').val().trim();
    const newmember_email = $('#newmember_email').val().trim();
    const newmember_address = $('#newmember_address').val().trim();

    if (newmember_name === "") {
        alert("請輸入姓名");
        return false;
    }
    if (newmember_phone === "") {
        alert("請輸入手機號碼");
        return false;
    }
    if (newmember_email === "") {
        alert("請輸入電子信箱");
        return false;
    }
    if (newmember_address === "") {
        alert("請輸入通訊地址");
        return false;
    }

    const formData = new FormData();
    const files = $('#member_pic')[0].files;
    formData.append('member_pic', files[0]);
    formData.append('newmember_name', newmember_name);
    formData.append('newmember_phone', newmember_phone);
    formData.append('newmember_email', newmember_email);
    formData.append('newmember_address', newmember_address);
    // console.log($('#newmember_name').val());
    // console.log($('#newmember_phone').val());
    // console.log($('#newmember_email').val());
    // console.log($('#newmember_address').val());
    

    $.ajax({
        method:"POST",
        url:"http://localhost/THD101_NO1/php/back_add_member_pet.php",
        data:formData,

        dataType:"text",
        // 告訴jQuery不要去處理發送的資料
        processData : false, 
        // 告訴jQuery不要去設定Content-Type請求頭
        contentType : false,
        success:function(response){
            alert(response);
            // location.href = '_back_member_profile.html'
            $('.BACK_ADD_NEW_MEMBER').hide();
            $('.BACK_MEMBER_PROFILE').show();
        },
        error: function(exception) {  
            alert("發生錯誤: " + exception.status);
        }
    })
}
// 會員搜尋
function dosearch(){

    var phone = $("#phone").val();
    var name = $("#name").val();

    if (phone === "" && name === "") {
        // 若輸入欄位為空，不執行搜尋操作
        return;
    }
    console.log(phone);
    $.ajax({            
        method: "POST",
        // url: "http://localhost/THD101_project/php/back_search_member.php",
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
                    "<li>" + "<i class='bi bi-pencil RE_MEMBER_PROFILE' onclick='doReviseMember(\"" + row.PHONENO + "\")' >" + "</i>" + "</li>" +
                    "<li>" + "<i class='bi bi-x-lg DEL_MEMBER_BTN' onclick='doDelMember(\"" + row.MEMBER_ID + "\")'></i></a></li>" +
                    "<li>" + "<i class='bi bi-calendar-plus RESERVE_BTN' onclick='doReserve(\"" + row.PHONENO + "\")'>" + "</i>" + "</li>" 
                    + "</ul>"
                );
            });
        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status);
        }
    });
}

// 寵物搜尋
function Petsearch(){

    var phone = $("#owner_phone").val();
    var type = $("#consultation_type").val();

    if (phone == "" && type == "default") {
        // 若輸入欄位為空，不執行搜尋操作
        alert ("請選擇類型");
    }
    $.ajax({            
        method: "POST",
        // url: "http://localhost/THD101_project/php/back_pet_search_member.php",
        url: "http://localhost/THD101_NO1/php/back_pet_search_member.php",
        data:{
            phone: phone, 
            type: type
        },            
        dataType: "json",
        
        success: function (response) {
            // console.log(response);
            // 更新html內容前先清空原有資料
            $("#pet_result").html("");
            // 更新html內容(透過jQuery跑迴圈取值)
            // $.each(response, function(index, row) {

            //     $("#pet_result").append(
            //         "<ul class='PET_PROFILE_CONTENT BACK_TABLE_CONTENT'>" + 
            //         "<li>" + row.PHONENO +"</li>" +
            //         "<li>" + row.PET_NAME + "</li>" +
            //         "<li>" + row.Type + "</li>" +
            //         "<li>" + row.CREATEDATE + "</li>" +
            //         "<li>" + "<i class='bi bi-pencil RE_PET_PROFILE' onclick='doReviseMember()'>" + "</i>" + "</li>" +
            //         "<li>" + "<i class='bi bi-x-lg DEL_PET_BTN' onclick='doDelMember()'>" + "</i>" + "</li>" 
                   
            //         + "</ul>"
            //     );

            // });

            if(response===1){
                alert('lalala');
            }
        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status);
        }
    });
}

// 會員修改資料渲染
function doReviseMember(phone_revise){

    $('.BACK_MODIFY_MEMBER').show();
    $('.BACK_MEMBER_PROFILE').hide();
    // console.log(phone_revise);
    $.ajax({
        method: "GET",
        url: "http://localhost/THD101_NO1/php/back_modify_member.php",
        data: {
            phone_revise: phone_revise
        },
        dataType:"json",
        success:function(response){
            console.log(response);
            $('#name_revise').val(response.NAME);
            $('#phone_revise').val(response.PHONENO);
            $('#email_revise').val(response.EMAIL);
            $('#address_revise').val(response.ADDRESS);
            $('#member_id').val(response.MEMBER_ID);
            $('#preview_member_pic_revise img').attr('src', response.MEMBER_AVATAR);
            // console.log($('#member_id').val());
            
        },
        error: function(exception) {  
            alert("發生錯誤: " + exception.status);
        }
    })
}
// 更新資料
function doUpdateMember(){

    if ($('#name_revise').val() == "") {
        alert("請輸入姓名");
        return false;
    }
    if ($('#phone_revise').val() == "") {
        alert("請輸入手機號碼");
        return false;
    }
    if ($('#email_revise').val() == "") {
        alert("請輸入電子信箱");
        return false;
    }
    if ($('#address_revise').val() == "") {
        alert("請輸入通訊地址");
        return false;
    }

    var formData = new FormData();
    var files = $('#member_pic_revise')[0].files;
	formData.append('member_pic_revise',files[0]);
    formData.append('name_revise',$('#name_revise').val());
    formData.append('phone_revise',$("#phone_revise").val());
    formData.append('email_revise',$("#email_revise").val());
    formData.append('address_revise',$('#address_revise').val());   
    formData.append('member_id',$('#member_id').val());   

    console.log($('#member_id').val());
    console.log($('#name_revise').val());
    console.log($('#phone_revise').val());
    console.log($('#email_revise').val());
    console.log($('#address_revise').val());
    

    $.ajax({
        method:"POST",
        url:"http://localhost/THD101_NO1/php/back_update_member.php",
        data:formData,
        dataType:"json",
        // 告訴jQuery不要去處理發送的資料
        processData : false, 
        // 告訴jQuery不要去設定Content-Type請求頭
        contentType : false,
        success:function(response){
            alert(response);
            // location.href = '_back_member_profile.html'
            $('.BACK_MEMBER_PROFILE').show();
            $('.BACK_MODIFY_MEMBER').hide();
        },
        // 
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.log('錯誤訊息:', errorMessage);
            console.log('伺服器回應:', xhr.responseText);
            alert('發生錯誤: ' + errorMessage);
        }
    })
}

// // 會員刪除
function doDelMember(memberID){

    console.log(memberID);
    $.ajax({            
        method: "POST",
        // url: "http://localhost/THD101_project/php/back_search_member.php",
        url: "http://localhost/THD101_NO1/php/back_del_member.php",
        data: { memberID: memberID },            
        dataType: "json",
        success: function (response) {
            alert(response);
            console.log(response);
            location.href = '_back_member_profile.html';
        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status);
        }
    });


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




