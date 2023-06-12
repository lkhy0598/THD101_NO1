$(document).ready(function () {

  $('.BACK_ADD_MESSAGE').hide();

  $('.BACK_NAV ul li').eq(0).click(function () {
    $('.BACK_ADD_MESSAGE').show();
    $('.BACK_MESSAGE_MANAGEMENT').hide();
    event.preventDefault();
  })

  $('.CANCEL').eq(0).click(function () {
    $('.BACK_MESSAGE_MANAGEMENT').show();
    $('.BACK_ADD_MESSAGE').hide();
  })

})

$('#summernote').summernote({
  height: 400,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  focus: false,
  disableEnter: true                 // set focus to editable area after initializing summernote
});

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

// 搜尋消息

function searchMessage(event) {

  event.preventDefault();

  var message_number = $("#message_number").val();
  var message_classification = $("#message_classification option:selected").val();
  var message_status = $("#message_status option:selected").val();
  var message_title = $("#message_title").val();

  if (message_number === "" && message_classification === "" && message_status === "" && message_title === "") {
    // 若輸入欄位為空，不執行搜尋操作
    return;
  }
  
  $.ajax({
    method: "POST",
    // url: "http://localhost/THD101_NO1/php/back_search_message.php",
    url: "../php/back_search_message.php",
    data: {
      message_number: message_number,
      message_classification: message_classification,
      message_status: message_status,
      message_title: message_title,
    },

    dataType: "json",

    success: function (response) {
      // console.log(response);  

      // 更新html內容前先清空原有資料
      $("#message_result").html("");
      // 更新html內容(透過jQuery跑迴圈取值)
      $.each(response, function (index, row) {

        $("#message_result").append(

          "<ul class='MESSAGE_MANAGEMENT_TABLE_CONTENT BACK_TABLE_CONTENT'>" +
          "<li>" + row.NEWS_ID + "</li>" +
          "<li>" + row.STATE + "</li>" +
          "<li>" + `<img src=" ${row.IMG_SOURCE} " alt=""></img>` + "</li>" +
          "<li>" + row.INFOR_TYPE + "</li>" +
          "<li>" + row.TITLE + "</li>" +
          "<li>" + row.CREATE_DATE + "</li>" +
          "<li>" + "<i class='bi bi-pencil' onclick=''>" + "</i>" + "</li>" +
          "<li>" + "<i class='bi bi-x-lg' onclick=''>" + "</i>" + "</li>" +
          "</ul>"

        );

      });

    },

    error: function (exception) {
      alert("搜尋失敗: " + exception.status);
    }

  })

}

// 新增消息

function doAddMessage() {

  if ($('#preview_message_pic').children('img').length == 0) {
    alert("請上傳消息圖片");
    return false;
  }
  if ($('#new_message_classification').val() == "") {
    alert("請選擇消息分類");
    return false;
  }
  if ($('#new_message_status').val() == "") {
    alert("請選擇消息狀態");
    return false;
  }
  if ($('#new_message_title').val() == "") {
    alert("請輸入消息標題");
    return false;
  }
  var summernoteContent = $("#summernote").summernote('code').trim();
  if (summernoteContent === "<p><br></p>" || summernoteContent === "") {
    alert("請輸入消息內容");
    return false;
  }

  var new_message_classification = $("#new_message_classification option:selected").val();
  var new_message_status = $("#new_message_status option:selected").val();
  var new_message_title = $("#new_message_title").val();
  var new_message_content = $("#summernote").summernote('code'); // 獲取summernote編輯器的內容

  // 創建FormData對象，用於發送帶有文件的請求
  var formData = new FormData();
  formData.append("message_pic", $("#message_pic")[0].files[0]); // 添加上傳的文件到FormData

  // 添加其他數據到FormData
  formData.append("new_message_classification", new_message_classification);
  formData.append("new_message_status", new_message_status);
  formData.append("new_message_title", new_message_title);
  formData.append("new_message_content", new_message_content);

  $.ajax({
    method: "POST",
    // url: "http://localhost/THD101_NO1/php/back_add_message.php",
    url: "../php/back_add_message.php",
    data: formData,
    contentType: false, // 不設置content-type，jQuery會自動處理
    processData: false, // 不處理data，jQuery會自動處理

    success: function (response) {

      console.log(response);

      // 清空表單欄位
      $("#new_message_classification").val("");
      $("#new_message_status").val("");
      $("#new_message_title").val("");
      $("#summernote").summernote("reset"); // 清空summernote編輯器的內容
      $('#preview_message_pic').children('img').remove();
      // 清空預覽圖片容器
      previewImage.innerHTML = '<i class="bi bi-image"></i>';

      // 移除 IMAGE_BOX class
      messageImage.classList.remove('IMAGE_BOX');

      // 重置文件選擇器
      fileInput.value = '';

      // 顯示上傳照片按鈕
      uploadButton.style.display = 'inline-block';
      // 顯示成功訊息或其他操作
    },

    error: function (error) {
      alert("新增失敗: " + error.status);
    }

  });

  return false; // 防止表單提交

}
