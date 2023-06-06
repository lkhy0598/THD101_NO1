// 選擇上傳照片按鈕元素
var uploadButton = document.getElementById("message_pic_btn");

// 選擇文件選擇器元素
var fileInput = document.getElementById("message_pic");

// 選擇 MESSAGE_IMAGE 元素
var messageImage = document.querySelector(".MESSAGE_IMAGE");

// 選擇預覽圖片容器元素
var previewImage = document.getElementById("preview_message_pic");

// 監聽上傳照片按鈕的點擊事件
uploadButton.addEventListener("click", function () {
  // 觸發文件選擇器點擊事件
  fileInput.click();
});

// 監聽文件選擇器的文件選擇事件
fileInput.addEventListener("change", function () {
  // 獲取選中的文件
  var files = fileInput.files;

  // 選擇第一個文件並創建檔案讀取器
  var file = files[0];
  var reader = new FileReader();

  // 設置檔案讀取器的加載完成事件
  reader.onload = function (e) {
    // 創建圖像元素
    var img = document.createElement('img');
    img.classList.add('PREVIEW_IMG');

    // 設置預覽圖像的src屬性為讀取到的檔案內容
    img.src = e.target.result;
    // console.log(img.src);

    // 清空預覽圖片容器
    previewImage.innerHTML = '';

    // 將圖像元素添加到預覽圖片容器中
    previewImage.appendChild(img);

    // 添加 IMAGE_BOX class
    messageImage.classList.add('IMAGE_BOX');

    // 隱藏上傳照片按鈕
    uploadButton.style.display = 'none';
  };

  // 讀取檔案內容
  reader.readAsDataURL(file);
  
});

// 點擊圖片時移除圖片並恢復預設狀態
previewImage.addEventListener('click', function () {
  // 清空預覽圖片容器
  previewImage.innerHTML = '<i class="bi bi-image"></i>';

  // 移除 IMAGE_BOX class
  messageImage.classList.remove('IMAGE_BOX');
  
  // 重置文件選擇器
  fileInput.value = '';
  
  // 顯示上傳照片按鈕
  uploadButton.style.display = 'inline-block';
});



