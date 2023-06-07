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

$filePath_Temp = $_FILES["message_pic"]["tmp_name"];

$filePath = getMessagePath().$_FILES["message_pic"]["name"];

if (move_uploaded_file($filePath_Temp, $filePath)) {

  $sql = "SELECT MAX(NEWS_ID) FROM LATEST_NEWS";
  $statement = $pdo->prepare($sql);
  $statement->execute();
  $maxId = $statement->fetchColumn();

  if ($maxId) {
    $news_id = $maxId + 1;
  } else {
    $news_id = 1;
  }

  $news_type = ""; 
  if ($new_message_classification === "最新消息") {
      $news_type = "./img/information/NEWS/";
  } elseif ($new_message_classification === "衛教資訊") {
      $news_type = "./img/information/HEALTH/";
  } elseif ($new_message_classification === "相關連結") {
      $news_type = "./img/information/LINK/";
  }
  
  $full_file_path = $news_type . $_FILES["message_pic"]["name"]; // 拼接完整路徑

  $sql = "INSERT INTO LATEST_NEWS (NEWS_ID, TITLE, CONTENT, CREATE_DATE, IMG_SOURCE, STATE, INFOR_TYPE) VALUES (?, ?, ?, NOW(), ?, ?, ?)";

  $statement = $pdo->prepare($sql);
  $statement->bindValue(1, $news_id);
  $statement->bindValue(2, $new_message_title);
  $statement->bindValue(3, $new_message_content);
  $statement->bindValue(4, $full_file_path);
  $statement->bindValue(5, $new_message_status);
  $statement->bindValue(6, $new_message_classification);
  $statement->execute();

  echo "新增成功!";

} else {

  echo "新增失敗!";
    
}

?>