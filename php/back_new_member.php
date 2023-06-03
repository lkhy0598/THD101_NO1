<?php

include('conn.php');

$phone = $_POST['phone'];
$name = $_POST['name'];


if( $phone == ''){
   $sql = "select * FROM MEMBER where NAME like ?";

   $statement = $pdo->prepare($sql);

   $statement->bindValue(1,"%".$name."%");

   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');
   echo json_encode($data);
}

if($name == '' ){
   $sql = "select * FROM MEMBER where PHONENO like ?";

   $statement = $pdo->prepare($sql);

   $statement->bindValue(1,"%".$phone."%");

   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');
   echo json_encode($data);
}



?>

