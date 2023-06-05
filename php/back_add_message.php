<?php

include('conn.php');
include('upload.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$new_message_classification = $_POST['new_message_classification'];
$new_message_status = $_POST['new_message_status'];
$new_message_title = $_POST['new_message_title'];
$new_message_content = $_POST['new_message_content']; 

//Server上的暫存檔路徑含檔名
$filePath_Temp = $_FILES["message_pic"]["tmp_name"];

//欲放置的檔案路徑
$filePath = getMessagePath().$_FILES["message_pic"]["name"];

//將暫存檔搬移到正確位置
if(move_uploaded_file($filePath_Temp, $filePath)){

    $messagePicPath = $uploadResult["filePath"];

    //建立SQL
    // 消息狀態、消息分類
   $sql = "INSERT INTO LATEST_NEWS (NEWS_ID, TITLE, CONTENT, CREATE_DATE, MESSAGE_AVATAR) VALUES (?, ?, ?, NOW(), ?)";

    //執行
   $statement = $pdo->prepare($sql);         
   $statement->bindValue(1, $new_message_classification);
   $statement->bindValue(2, $new_message_title);
   $statement->bindValue(3, $new_message_content);
   $statement->bindValue(4, $messagePicPath);
   $statement->execute();

    //導頁                        
   echo "新增成功!";

   }else{ 

      echo "新增失敗!";      

  }

?>