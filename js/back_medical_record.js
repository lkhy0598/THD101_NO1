// 搜尋病歷
function doSearch(){

   var phone = $("#phone").val();
   var petName = $("#pet_name").val();

   if (phone === "" && petName === "") {
       // 若輸入欄位為空，不執行搜尋操作
       return;
   }
   console.log(phone);
   $.ajax({            
       method: "POST",
      //  url: "http://localhost/THD101_NO1/php/back_medical_record.php",
       url:"../php/back_medical_record.php",
       data:{
           phone: phone, 
           petName: petName
       },            
      //  dataType: "text",
       success: function (response) {
         //   console.log(response);
           // 更新html內容前先清空原有資料
           $("#result").html("");
           // 更新html內容(透過jQuery跑迴圈取值)
           $.each(response, function(index, row) {
               $("#result").append(
                   "<ul class='MEDICAL_RECORD_CONTENT BACK_TABLE_CONTENT'>" +
                   "<li>" + row.PHONENO + "</li>" +
                   "<li>" + row.PET_NAME + "</li>" +
                   "<li>" + row.CREATEDATE + "</li>" +
                   "<li>" + row.APPOINTMENT_TYPE_TITLE + "</li>" +
                   "<li><i class='bi bi-pencil' onclick='doRevise(\"" + row.PET_ID + "\")'></i></li>" +
                   "<li><i class='bi bi-x-lg DEL_MEDICAL_BTN' onclick='doDel()'></i></li>" +
                   "</ul>"
               );
           });
       },
      //  error: function(exception) {
      //      alert("發生錯誤: " + exception.status);
      //  }
      error: function(xhr, status, error) {
         var errorMessage = xhr.status + ': ' + xhr.statusText;
         console.log('錯誤訊息:', errorMessage);
         console.log('伺服器回應:', xhr.responseText);
         console.log('伺服器回應:',xhr);
         console.log('伺服器回應:',status);
         console.log('伺服器回應:',error);
         alert('發生錯誤: ' + errorMessage);
     }
   });
}

function doAdd(){
   $('.BACK_ADD_MEDICAL_RECORD').show();
   $('.BACK_MEDICAL_RECORD').hide();
   $('.ADD_MEDICAL_RECORD_BTN').removeAttr("disabled");
   $('.REVISE_MEDICAL_RECORD_BTN').attr("disabled", "disabled");
}
// 修改渲染
function doRevise(pet_id){

   $('.BACK_ADD_MEDICAL_RECORD').show();
   $('.BACK_MEDICAL_RECORD').hide();
   $('.REVISE_MEDICAL_RECORD_BTN').removeAttr("disabled");
   $('.ADD_MEDICAL_RECORD_BTN').attr("disabled", "disabled");
   // const pet_id = $('#pet_id').val();
   // alert(pet_id);

   $.ajax({
      method:"GET",
      url: "http://localhost/THD101_NO1/php/back_medical_get.php",
      // url:"../php/back_medical_get.php",
      data:{
         // add_pet_name:add_pet_name
         pet_id:pet_id
      },
      dataType:"json",
      success:function(response){
         console.log(response);
         var createDate = new Date(response.CREATEDATE);
         var formattedDate = createDate.toISOString().split('T')[0];
         $('#doctor').val(response.DOCTOR_ID);
         $('#type').val(response.APP_TYPE_ID);
         $('#date').val(formattedDate);
         $('#add_pet_name').val(response.PET_NAME);
         $('#pet_id').val(response.PET_ID);
         $('#symptom_type').val(response.MR_SYMPTOM);
         console.log($('#pet_id').val());
         console.log($('#symptom_type').val());
     },
     error: function(exception) {  
         alert("發生錯誤: " + exception.status);
     }
   })

}
// 新增病歷
function doAddmedical(){

   const doctor = $('#doctor option:selected').val();
   const type = $('#type option:selected').val();
   const date = $('#date').val();
   const add_pet_name = $('#add_pet_name').val().trim();
   // const pet_category = $('#pet_category option:selected').val();
   // const pet_age = $('#pet_age').val().trim();
   const symptom_type = $('#symptom_type').val().trim();

   if (doctor === "") {
      alert("請選擇看診醫師");
      return false;
  }
  if (type === "") {
      alert("請選擇看診類型");
      return false;
  }
  if (date === "") {
      alert("請選擇看診日期");
      return false;
  }
  if (add_pet_name === "") {
      alert("請輸入寵物姓名");
      return false;
  }

  const formData = new FormData();
  formData.append('doctor', doctor);
  formData.append('type', type);
  formData.append('date', date);
  formData.append('add_pet_name', add_pet_name);
//   formData.append('pet_category', pet_category);
//   formData.append('pet_age', pet_age);
  formData.append('symptom_type', symptom_type);

  $.ajax({
   method:"POST",
   // url:"http://localhost/THD101_NO1/php/back_add_medical.php",
   url:"../php/back_add_medical.php",
   data:formData,
   dataType:"text",
   // 告訴jQuery不要去處理發送的資料
   processData : false, 
   // 告訴jQuery不要去設定Content-Type請求
   contentType : false,
   success:function(response){
       alert(response);
       location.href = '_back_medical_record.html'
       // $('.BACK_ADD_NEW_MEMBER').hide();
       // $('.BACK_MEMBER_PROFILE').show();
   },
   // error: function(exception) {  
   //     alert("發生錯誤: " + exception.status);
   // }
   error: function(xhr, status, error) {
      var errorMessage = xhr.status + ': ' + xhr.statusText;
      console.log('錯誤訊息:', errorMessage);
      console.log('伺服器回應:', xhr.responseText);
      alert('發生錯誤: ' + errorMessage);
  }
})
}
// 更新病歷
function doUpdate(){

   const doctor = $('#doctor option:selected').val();
   const type = $('#type option:selected').val();
   const date = $('#date').val();
   const add_pet_name = $('#add_pet_name').val().trim();
   // const pet_category = $('#pet_category option:selected').val();
   // const pet_age = $('#pet_age').val().trim();
   const symptom_type = $('#symptom_type').val().trim();
   const pet_id = $('#pet_id').val();

   if (doctor === "") {
      alert("請選擇看診醫師");
      return false;
  }
  if (type === "") {
      alert("請選擇看診類型");
      return false;
  }
  if (date === "") {
      alert("請選擇看診日期");
      return false;
  }
  if (add_pet_name === "") {
      alert("請輸入寵物姓名");
      return false;
  }
   const formData = new FormData();
   formData.append('doctor', doctor);
   formData.append('type', type);
   formData.append('date', date);
   formData.append('add_pet_name', add_pet_name);
 //   formData.append('pet_category', pet_category);
 //   formData.append('pet_age', pet_age);
   formData.append('symptom_type', symptom_type);
   formData.append('pet_id', pet_id);


   $.ajax({
      method:"POST",
      // url:"http://localhost/THD101_NO1/php/back_update_medical.php",
      url:"../php/back_update_medical.php",
      data:formData,
      // dataType:"json",
      // 告訴jQuery不要去處理發送的資料
      processData : false, 
      // 告訴jQuery不要去設定Content-Type請求頭
      contentType : false,
      success:function(response){
          alert(response.message);
          location.href = '_back_medical_record.html'
         //  $('.BACK_MEMBER_PROFILE').show();
         //  $('.BACK_MODIFY_MEMBER').hide();
      },
      
      error: function(xhr, status, error) {
          var errorMessage = xhr.status + ': ' + xhr.statusText;
          console.log('錯誤訊息:', errorMessage);
          console.log('伺服器回應:', xhr.responseText);
          console.log('伺服器回應:',xhr);
          console.log('伺服器回應:',status);
          console.log('伺服器回應:',error);
          alert('發生錯誤: ' + errorMessage);
      }
  });
}
