<?php

include('conn.php');
// include('connServer.php');
ini_set("display_errors", "On");
// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

$memberID = isset($_POST['member_id']) ? $_POST['member_id'] : '';
$name_revise = isset($_POST['name_revise']) ? $_POST['name_revise'] : '';
$phone_revise = isset($_POST['phone_revise']) ? $_POST['phone_revise'] : '';
$email_revise = isset($_POST['email_revise']) ? $_POST['email_revise'] : '';
$address_revise = isset($_POST['address_revise']) ? $_POST['address_revise'] : '';

$fileName = '';

if(isset($_FILES["member_pic_revise"])){

   //判斷圖片是否上傳成功?
   if($_FILES["member_pic_revise"]["error"] > 0){
       //返回訊息文字
       $message = "上傳失敗: 錯誤代碼".$_FILES["member_pic_revise"]["error"];
   }else{

      $fileName = $_FILES["member_pic_revise"]["name"];    
      $filePath_Temp = $_FILES["member_pic_revise"]["tmp_name"];  
      // 欲放置的檔案路徑up
      $Path = "../dist/img/member/" . $memberID ."/"; 

      if (!is_dir($Path)) {

         mkdir($Path, 0777, true); // 設置適當的權限
      }
   }
      $filePath = $Path . $fileName;
      //  $fileName = "./img/member/". $memberID ."/".$_FILES["member_pic_revise"]["name"];
      move_uploaded_file($filePath_Temp, $filePath);

}

 
   $sql = "UPDATE MEMBER SET NAME = ?, PHONENO = ?, EMAIL = ?, ADDRESS = ?";
      $values = [$name_revise, $phone_revise, $email_revise, $address_revise];
   
      if ($fileName !== '') {
         $sql .= ", MEMBER_AVATAR = ?";
         $values[] = $fileName;
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