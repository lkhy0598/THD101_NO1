



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




