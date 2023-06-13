<?php
ini_set("display_errors", "On");
include('conn.php');
// include('connServer.php');

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

$memberID = isset($_POST['member_id_pet']) ? $_POST['member_id_pet'] : '';
$petID = isset($_POST['pet_id']) ? $_POST['pet_id'] : '';
$pet_name_revise = isset($_POST['pet_name_revise']) ? $_POST['pet_name_revise'] : '';
$pet_phone_revise = isset($_POST['pet_phone_revise']) ? $_POST['pet_phone_revise'] : '';
$pet_gender_revise= isset($_POST['pet_gender_revise']) ? $_POST['pet_gender_revise'] : '';
$pet_category_revise = isset($_POST['pet_category_revise']) ? $_POST['pet_category_revise'] : '';
$pet_age_revise = isset($_POST['pet_age_revise']) ? $_POST['pet_age_revise'] : '';

$fileName = '';

if(isset($_FILES["pet_pic_revise"])){

   //判斷圖片是否上傳成功?
   if($_FILES["pet_pic_revise"]["error"] > 0){
       
       $message = "上傳失敗: 錯誤代碼".$_FILES["pet_pic_revise"]["error"];
   }else{

      $fileName = $_FILES["pet_pic_revise"]["name"];    
      $filePath_Temp = $_FILES["pet_pic_revise"]["tmp_name"];  
      // 欲放置的檔案路徑up

      $Path = "../dist/img/member/" . $memberID ."/" .$petID . "/"; //server
      
      if (!is_dir($Path)) {

         mkdir($Path, 0777, true); // 設置適當的權限
      }
      
      $filePath = $Path . $fileName;
      // $fileName = "./img/member/". $memberID ."/". $petID . "/".$_FILES["pet_pic_revise"]["name"];
      //將暫存檔搬移到正確位置
      move_uploaded_file($filePath_Temp, $filePath);
   }

}

      $sql = "UPDATE PET SET PET_NAME = ?, PET_GENDER = ?, PET_CATAGORY = ?, PET_AGE = ?";
      $values = [$pet_name_revise, $pet_gender_revise, $pet_category_revise, $pet_age_revise];
   
      if (!empty($fileName)) {
         $sql .= ", PET_AVATAR = ?";
         $values[] = $fileName;
      }
   
      $sql .= " WHERE MEMBER_ID = ?";
      $values[] = $memberID;
   
      $statement = $pdo->prepare($sql);
      $a = $statement->execute($values);


      if ($a > 0) {
         echo  '修改成功';
      } else {
         echo 'fail';
      }
?>