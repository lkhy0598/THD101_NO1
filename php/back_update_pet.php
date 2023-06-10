<?php

// include('conn.php');
include('connServer.php');
include('upload.php');
ini_set("display_errors", "On");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$memberID = isset($_POST['member_id_pet']) ? $_POST['member_id_pet'] : '';
$pet_name_revise = isset($_POST['pet_name_revise']) ? $_POST['pet_name_revise'] : '';
$pet_phone_revise = isset($_POST['pet_phone_revise']) ? $_POST['pet_phone_revise'] : '';
$pet_gender_revise= isset($_POST['pet_gender_revise']) ? $_POST['pet_gender_revise'] : '';
$pet_category_revise = isset($_POST['pet_category_revise']) ? $_POST['pet_category_revise'] : '';
$pet_age_revise = isset($_POST['pet_age_revise']) ? $_POST['pet_age_revise'] : '';

$picture_name_pet = '';

if(isset($_FILES["picture_name_pet"])){

   //判斷圖片是否上傳成功?
   if($_FILES["picture_name_pet"]["error"] > 0){
       //返回訊息文字
       $message = "上傳失敗: 錯誤代碼".$_FILES["picture_name_pet"]["error"];
   }else{
      // 欲放置的檔案路徑up
      $filePath = getPetPath($memberID, $petID).$_FILES["picture_name_pet"]["name"];
      
      $fileName = "./img/member/". $memberID ."/". $petID . "/".$_FILES["picture_name_pet"]["name"];
      //將暫存檔搬移到正確位置
      if(move_uploaded_file($_FILES["picture_name_pet"]["tmp_name"], $filePath)){

         //修改後的商品圖片名稱
         $picture_name_pet = $fileName;

      }else{

         $message = "拷貝/移動上傳圖片失敗";

      }
   }

}

      $sql = "UPDATE PET SET PET_NAME = ?, PET_GENDER = ?, PET_CATAGORY = ?, PET_AGE = ?";
      $values = [$pet_name_revise, $pet_gender_revise, $pet_category_revise, $pet_age_revise];
   
      if (!empty($picture_name_pet)) {
         $sql .= ", PET_AVATAR = ?";
         $values[] = $picture_name_pet;
      }
   
      $sql .= " WHERE MEMBER_ID = ?";
      $values[] = $memberID;
   
      $statement = $pdo->prepare($sql);
      $a = $statement->execute($values);

      if($a > 0){
         echo '修改成功';
      } else{
         echo 'fail';
      }
?>