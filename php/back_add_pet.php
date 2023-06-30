<?php
ini_set("display_errors", "On");
include('conn.php');
// include('connServer.php');

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

   $new_pet_phone = isset($_POST['new_pet_phone']) ? $_POST['new_pet_phone'] : '';
   $new_pet_name = isset($_POST['new_pet_name']) ? $_POST['new_pet_name'] : '';
   $new_pet_gender = isset($_POST['new_pet_gender']) ? $_POST['new_pet_gender'] : '';
   $new_pet_age = isset($_POST['new_pet_age']) ? $_POST['new_pet_age'] : '';
   $new_pet_category = isset($_POST['new_pet_category']) ? $_POST['new_pet_category'] : '';
   $new_vaccines = isset($_POST['new_vaccines']) ? $_POST['new_vaccines'] : '';

   
   $sql = "SELECT MEMBER_ID FROM MEMBER WHERE PHONENO = ?";
   $statement = $pdo->prepare($sql);
   $statement->bindValue(1, $new_pet_phone);
   $statement->execute();
   $memberID = $statement->fetchColumn();
   
if($memberID){

   $sql = "INSERT INTO PET (PET_NAME, PET_GENDER, PET_CATAGORY, PET_AGE, MEMBER_ID, CREATEDATE, VACCI_OR_NOT) VALUES (?, ?, ?, ?, ?, NOW(),?)";

   $statement = $pdo->prepare($sql);
   $statement->bindValue(1, $new_pet_name);
   $statement->bindValue(2, $new_pet_gender);
   $statement->bindValue(3, $new_pet_category);
   $statement->bindValue(4, $new_pet_age);
   $statement->bindValue(5, $memberID);
   $statement->bindValue(6, $new_vaccines);
   
   $statement->execute();

   $petID = $pdo->lastInsertId();

   if($_FILES["pet_pic"]["error"] > 0 ){
      echo "上傳失敗: ".$_FILES["pet_pic"]["error"];
   
   }else{
   
      //取得上傳的檔案資訊=======================================
      $fileName = $_FILES["pet_pic"]["name"];    
      $filePath_Temp = $_FILES["pet_pic"]["tmp_name"];  
   
      //=======================================================
   
      $Path = "../dist/img/member/" . $memberID ."/" .$petID . "/"; //server
   // $filePath = "../dist/img/member/"; //server
   
      if (!is_dir($Path)) {
   
         mkdir($Path, 0777, true); // 設置適當的權限
      }
   }

   $filePath = $Path . $fileName;
      // $fileName = "./img/member/". $memberID ."/". $petID . "/".$_FILES["pet_pic_revise"]["name"];
      //將暫存檔搬移到正確位置
   
   if (move_uploaded_file($filePath_Temp, $filePath)){

      $sql = "UPDATE PET SET PET_AVATAR = ? WHERE PET_ID = ?";

         $statement = $pdo->prepare($sql);
         $statement->bindValue(1, $fileName);
         $statement->bindValue(2, $petID);
         $affectedRow = $statement->execute();

         if ($affectedRow > 0) {
            echo "新增成功";
        } else{
            echo "新增失敗!";
        }

   }else {

      echo "拷貝/移動上傳圖片失敗!";
        
   } 
 } 

   



?>