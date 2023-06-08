<?php

include('conn.php');


if (isset($_POST['phone'])) {
   $phone = $_POST['phone'];
} else {
   $phone = '';
}

if (isset($_POST['name'])) {
   $name = $_POST['name'];
} else {
   $name = '';
}


if($phone !== '' || $name !== ''){

   $sql = "SELECT * FROM MEMBER WHERE 1=1";

   if($phone !== ''){
      $sql .= " AND PHONENO LIKE ?";
   }
   if($name !== '' ){
      $sql .= " AND NAME LIKE ?";
   }
   
   $statement = $pdo->prepare($sql);
   $parameterIndex = 1;

   if($phone !== ''){
      $statement->bindValue($parameterIndex,"%".$phone."%");
      $parameterIndex++;
   }
   if($name !== '' ){
      $statement->bindValue($parameterIndex,"%".$name."%");
      $parameterIndex++;
   }


   $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);
}

?>

