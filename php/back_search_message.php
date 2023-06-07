<?php

include('conn.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$message_number = $_POST['message_number'];
$message_classification = $_POST['message_classification'];
$message_status = $_POST['message_status'];
$message_title = $_POST['message_title'];

if ($message_number !== '' || $message_classification !== '' || $message_status !== '' || $message_title !== '') {

   $sql = "SELECT * FROM LATEST_NEWS WHERE 1=1";
 
   if ($message_number !== '') {
     $sql .= " AND NEWS_ID LIKE ?";
   }
 
   if ($message_classification !== '') {
     $sql .= " AND INFOR_TYPE LIKE ?";
   }
 
   if ($message_status !== '') {
     $sql .= " AND STATE LIKE ?";
   }
 
   if ($message_title !== '') {
     $sql .= " AND TITLE LIKE ?";
   }
 
   $statement = $pdo->prepare($sql);
 
   $parameterIndex = 1;
 
   if ($message_number !== '') {
     $statement->bindValue($parameterIndex, "%" . $message_number . "%");
     $parameterIndex++;
   }
 
   if ($message_classification !== '') {
     $statement->bindValue($parameterIndex, "%" . $message_classification . "%");
     $parameterIndex++;
   }
 
   if ($message_status !== '') {
     $statement->bindValue($parameterIndex, "%" . $message_status . "%");
     $parameterIndex++;
   }
 
   if ($message_title !== '') {
     $statement->bindValue($parameterIndex, "%" . $message_title . "%");
     $parameterIndex++;
   }
 
   $statement->execute();
 
   $data = $statement->fetchAll();
 
   header('Content-Type: application/json');
 
   echo json_encode($data);
   
 } 

?>