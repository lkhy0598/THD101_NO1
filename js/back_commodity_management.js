// 獲取上傳照片按鈕和預覽容器的元素
var commodityPic = document.getElementById('commodity_pic');
// console.log(commodityPic);

// 添加change事件監聽器
commodityPic.addEventListener('change', function(e) {
  // 遍歷選擇的檔案
  for (var i = 0; i < e.target.files.length; i++) {
    // 獲取當前檔案
    var file = e.target.files[i];

    // 創建檔案讀取器
    var reader = new FileReader();

    // 設置檔案讀取器的加載完成事件
    reader.onload = function(e) {
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


      img.addEventListener('click', function() {
        var parentDiv = this.parentElement;
        console.log(parentDiv);
        parentDiv.classList.remove('IMAGE_BOX');
        // 刪除圖片和重置預覽容器
        this.remove();
        previewContainer.innerHTML = '<i class="bi bi-image"></i>';
      });


      var imageTops = document.querySelectorAll('.IMAGE_TOP');
      // console.log(imageTops);
      for(var j = 0 ; j < imageTops.length; j++){
        var child = imageTops[j].querySelectorAll("img");
        // console.log(child);
        if(child.length > 0){
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