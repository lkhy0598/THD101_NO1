<?php

include('conn.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

//會員搜尋
$phone = $_POST['phone'];
$name = $_POST['name'];


if($phone == ''){
   $sql = "select * FROM MEMBER where NAME like ?";

   $statement = $pdo->prepare($sql);

   $statement->bindValue(1,"%".$name."%");
 
   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);
}

if($name == ''){
   $sql = "select * FROM MEMBER where PHONENO like ?";

   $statement = $pdo->prepare($sql);

   $statement->bindValue(1,"%".$phone."%");

   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);
}

if($phone != '' && $name != ''){
   $sql = "select * FROM MEMBER where PHONENO like ? or NAME like ?";
   $statement = $pdo->prepare($sql);

   $statement->bindValue(1,"%".$phone."%");

   $statement->bindValue(2,"%".$name."%");

   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);
}

?>

