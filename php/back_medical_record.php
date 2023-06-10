<?php

// include('conn.php');
include('connServer.php');
ini_set("display_errors", "On");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_POST['phone'])) {
   $phone = $_POST['phone'];
} else {
   $phone = '';
}

if (isset($_POST['petName'])) {
   $petName = $_POST['petName'];
} else {
   $petName = '';
}


if($phone !== '' || $petName !== ''){

   $sql = "SELECT * FROM MEDICAL_RECORDS
   LEFT JOIN PET ON MEDICAL_RECORDS.PET_ID = PET.PET_ID
   LEFT JOIN MEMBER ON PET.MEMBER_ID = MEMBER.MEMBER_ID
   LEFT JOIN APPOINTMENT_TYPE ON MEDICAL_RECORDS.APP_TYPE_ID = APPOINTMENT_TYPE.APP_TYPE_ID
   WHERE 1=1";

   if($phone !== ''){
      $sql .= " AND PHONENO LIKE ?";
   }
   if($petName !== '' ){
      $sql .= " AND PET_NAME LIKE ?";
   }
   
   $statement = $pdo->prepare($sql);
   $parameterIndex = 1;

   if($phone !== ''){
      $statement->bindValue($parameterIndex,"%".$phone."%");
      $parameterIndex++;
   }
   if($petName !== '' ){
      $statement->bindValue($parameterIndex,"%".$petName."%");
      $parameterIndex++;
   }


   // $statement = $pdo->query($sql);

   $statement->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);
}



?>