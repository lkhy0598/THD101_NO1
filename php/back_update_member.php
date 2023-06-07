<?php

include('conn.php');
include('upload.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$memberID = isset($_POST['member_id']) ? $_POST['member_id'] : '';
$name_revise = isset($_POST['name_revise']) ? $_POST['name_revise'] : '';
$phone_revise = isset($_POST['phone_revise']) ? $_POST['phone_revise'] : '';
$email_revise = isset($_POST['email_revise']) ? $_POST['email_revise'] : '';
$address_revise = isset($_POST['address_revise']) ? $_POST['address_revise'] : '';

// 返回訊息文字

$message = "修改成功!";
$picture_name = '';

if(isset($_FILES["member_pic_revise"])){

   //判斷圖片是否上傳成功?
   if($_FILES["member_pic_revise"]["error"] > 0){
       //返回訊息文字
       $message = "上傳失敗: 錯誤代碼".$_FILES["member_pic_revise"]["error"];
   }else{
      // 欲放置的檔案路徑up
      $filePath = getMemberPath($memberID).$_FILES["member_pic_revise"]["name"];
      
      $fileName = "./img/member/". $memberID ."/".$_FILES["member_pic_revise"]["name"];

      //將暫存檔搬移到正確位置
      if(move_uploaded_file($_FILES["member_pic_revise"]["tmp_name"], $filePath)){

         //修改後的商品圖片名稱
         $picture_name = $fileName;

      }else{

         $message = "拷貝/移動上傳圖片失敗";

      }
   }

}

   // $sql = "UPDATE MEMBER SET NAME = ?, PHONENO = ?, EMAIL = ?, ADDRESS = ?, MEMBER_AVATAR = ? WHERE MEMBER_ID = ?";

   // $statement = $pdo->prepare($sql);
   // $statement->bindValue(1 , $name_revise);             
   // $statement->bindValue(2 , $phone_revise);
   // $statement->bindValue(3 , $email_revise);
   // $statement->bindValue(4 , $address_revise);
   // $statement->bindValue(5 , $picture_name);
   // $statement->bindValue(6 , $memberID);
   // $statement->execute();
  
   // echo $message;
   try {
      $sql = "UPDATE MEMBER SET NAME = ?, PHONENO = ?, EMAIL = ?, ADDRESS = ?, MEMBER_AVATAR = ? WHERE MEMBER_ID = ?";
      $statement = $pdo->prepare($sql);
      $statement->bindValue(1, $name_revise);
      $statement->bindValue(2, $phone_revise);
      $statement->bindValue(3, $email_revise);
      $statement->bindValue(4, $address_revise);
      $statement->bindValue(5, $picture_name);
      $statement->bindValue(6, $memberID);
      $statement->execute();
    
      echo $message;
  } catch (PDOException $e) {
      echo "發生錯誤: " . $e->getMessage();
  }
  
?>