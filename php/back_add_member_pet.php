<?php

include('conn.php');
include('upload.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

//Server上的暫存檔路徑含檔名
$filePath_Temp = $_FILES["member_pic"]["tmp_name"];

//欲放置的檔案路徑
$filePath = getMemberPath().$_FILES["member_pic"]["name"];

//將暫存檔搬移到正確位置
if(move_uploaded_file($filePath_Temp, $filePath)){

    //建立SQL
    
   $sql = "INSERT INTO MEMBER (NAME, PHONENO, EMAIL, ADDRESS, PASSWORD, CREATE_DATE, MEMBER_AVATAR) VALUES (?, ?, ?, ?, ?,NOW(), ?)";

   $newmember_name = $_POST['newmember_name'];
   $newmember_phone = $_POST['newmember_phone'];
   $newmember_email = $_POST['newmember_email'];
   $newmember_address = $_POST['newmember_address'];
    
    //執行
   $statement = $pdo->prepare($sql);
   $statement->bindValue(1 , $newmember_name);             
   $statement->bindValue(2 , $newmember_phone);
   $statement->bindValue(3 , $newmember_email);
   $statement->bindValue(4 , $newmember_address);
   $statement->bindValue(5 , $newmember_phone);
   $statement->bindValue(6 , $_FILES["member_pic"]["name"]);
   $statement->execute();

    //導頁                        
   echo "新增成功!";

   }else{ 

      echo "拷貝/移動上傳圖片失敗!";      

  }

?>
