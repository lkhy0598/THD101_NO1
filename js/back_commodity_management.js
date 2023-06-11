$(document).ready(function () {

  $('.BACK_ADD_COMMODITY_SECTION').hide();

  $('.BACK_NAV ul li').eq(0).click(function () {
    $('.BACK_ADD_COMMODITY_SECTION').show();
    $('.BACK_COMMODITY_MANAGEMENT').hide();
    event.preventDefault();
  })

  $('.CANCEL').eq(0).click(function () {
    $('.BACK_COMMODITY_MANAGEMENT').show();
    $('.BACK_ADD_COMMODITY_SECTION').hide();
  })

})

$('#summernote').summernote({
  height: 400,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  focus: false,
  disableEnter: true          
});

// 獲取上傳照片按鈕和預覽容器的元素
var commodityPic = document.getElementById('commodity_pic');
// console.log(commodityPic);

// 添加change事件監聽器
commodityPic.addEventListener('change', function (e) {
  // 遍歷選擇的檔案
  for (var i = 0; i < e.target.files.length; i++) {
    // 獲取當前檔案
    var file = e.target.files[i];

    // 創建檔案讀取器
    var reader = new FileReader();

    // 設置檔案讀取器的加載完成事件
    reader.onload = function (e) {
      // 創建圖像元素
      var img = document.createElement('img');

      img.classList.add('PREVIEW_IMG');

      // 設置預覽圖像的src屬性為讀取到的檔案內容
      img.src = e.target.result;

      // 獲取下一個可用的預覽容器
      var previewContainer = getNextPreviewContainer();
      // console.log(previewContainer);

      previewContainer.innerHTML = '';

      // 將預覽的圖像元素添加到預覽容器中
      previewContainer.appendChild(img);
      // let img_arr = $('img.PREVIEW_IMG');
      // console.log(img_arr);

      img.addEventListener('click', function () {

        var parentDiv = this.parentElement;

        // console.log(parentDiv);

        parentDiv.classList.remove('IMAGE_BOX');

        // 刪除圖片和重置預覽容器
        this.remove();

        previewContainer.innerHTML = '<i class="bi bi-image"></i>';

      });

      var imageTops = document.querySelectorAll('.IMAGE_TOP');
      // console.log(imageTops);

      for (var j = 0; j < imageTops.length; j++) {

        var child = imageTops[j].querySelectorAll("img");
        // console.log(child);

        if (child.length > 0) {

          imageTops[j].classList.add('IMAGE_BOX');

        }

      }

    }

    // 讀取檔案內容
    reader.readAsDataURL(file);
  }
});

// 獲取下一個可用的預覽容器
function getNextPreviewContainer() {

  var imageTops = document.getElementsByClassName('IMAGE_TOP');

  for (var i = 0; i < imageTops.length; i++) {

    var previewContainer = imageTops[i].querySelector('.PREVIEW_IMG');

    if (!previewContainer) {

      return imageTops[i];

    }

  }

  return null;

}

//搜尋商品

function searchCommodity(event) {

  event.preventDefault();

  var commodity_number = $("#commodity_number").val();
  var commodity_classification = $("#commodity_classification option:selected").val();
  var commodity_status = $("#commodity_status option:selected").val();
  var commodity_title = $("#commodity_title").val();

  if (commodity_number === "" && commodity_classification === "" && commodity_status === "" && commodity_title === "") {
    // 若輸入欄位為空，不執行搜尋操作
    return;
  }

  $.ajax({
    method: "POST",
    // url: "http://localhost/THD101_NO1/php/back_search_commodity.php",
    url: "../php/back_search_commodity.php",
    data: {
      commodity_number: commodity_number,
      commodity_classification: commodity_classification,
      commodity_status: commodity_status,
      commodity_title: commodity_title,
    },

    dataType: "json",

    success: function (response) {
      // console.log(response);  

      // 更新html內容前先清空原有資料
      $("#commodity_result").html("");
      // 更新html內容(透過jQuery跑迴圈取值)
      $.each(response, function (index, row) {

        $("#commodity_result").append(

          "<ul class='COMMODITY_MANAGEMENT_TABLE_CONTENT BACK_TABLE_CONTENT'>" +
          "<li>" + row.PRODUCT_ID + "</li>" +
          "<li>" + row.INVENTORY + "</li>" +
          "<li>" + "<img src='" + row.IMG_SOURCE.split(",")[0] + "' alt=''></img>" + "</li>" +
          "<li>" + row.PRODUCT_CATAGORY_ID + "</li>" +
          "<li>" + row.PRODUCT_TITLE + "</li>" +
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

//新增商品

function doAddCommodity() {

  if ($('#new_commodity_title').val() == "") {
    alert("請輸入商品名稱");
    return false;
  }
  if ($('#new_commodity_classification').val() == "") {
    alert("請選擇商品分類");
    return false;
  }
  if ($('#new_price').val() == "") {
    alert("請輸入商品價格");
    return false;
  }
  if ($('#new_stock').val() == "") {
    alert("請輸入庫存數量");
    return false;
  }
  if ($('.IMAGE_TOP').children('img').length == 0) {
    alert("請上傳商品圖片");
    return false;
  }
  var summernoteContent = $("#summernote").summernote('code').trim();
  if (summernoteContent === "<p><br></p>" || summernoteContent === "") {
    alert("請輸入商品描述");
    return false;
  }

  var new_commodity_title = $("#new_commodity_title").val();
  var new_commodity_classification = $("#new_commodity_classification option:selected").val();
  var new_price = $("#new_price").val();
  var new_stock = $("#new_stock").val();
  var new_commodity_content = $("#summernote").summernote('code'); // 獲取summernote編輯器的內容

  // 創建FormData對象，用於發送帶有文件的請求
  var formData = new FormData();

  // 遍歷檔案輸入框中選取的檔案列表
  for (var i = 0; i < $("#commodity_pic")[0].files.length; i++) {
    var file = $("#commodity_pic")[0].files[i];
    formData.append("commodity_pic[]", file); // 使用 [] 表示這是一個檔案陣列
  }

  // 添加其他數據到FormData
  formData.append("new_commodity_title", new_commodity_title);
  formData.append("new_commodity_classification", new_commodity_classification);
  formData.append("new_price", new_price);
  formData.append("new_stock", new_stock);
  formData.append("new_commodity_content", new_commodity_content);

  $.ajax({
    method: "POST",
    // url: "http://localhost/THD101_NO1/php/back_add_commodity.php",
    url: "../php/back_add_commodity.php",
    data: formData,
    contentType: false, // 不設置content-type，jQuery會自動處理
    processData: false, // 不處理data，jQuery會自動處理

    success: function (response) {

      // console.log(response);

      // 清空表單欄位
      $("#new_commodity_title").val("");
      $("#new_commodity_classification option:selected").val("");
      $("#new_price").val("");
      $("#new_stock").val("");
      $("#summernote").summernote("reset"); // 清空summernote編輯器的內容
      $('.IMAGE_TOP').children('img').remove();

      $('.IMAGE_TOP').removeClass('IMAGE_BOX');

      var imageTop = $('.IMAGE_TOP');

      if (!imageTop.hasClass('bi bi-image')) {
        imageTop.html('<i class="bi bi-image"></i>');
      }

    },

    error: function (exception) {
      alert("新增失敗: " + exception.status);
    }

  });

  return false; // 防止表單提交

}