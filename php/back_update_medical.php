<?php

// include('conn.php');
include('connServer.php');
ini_set("display_errors", "On");

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$doctor = isset($_POST['doctor']) ? $_POST['doctor'] : '';
$type= isset($_POST['type']) ? $_POST['type'] : '';
$date = isset($_POST['date']) ? $_POST['date'] : '';
$add_pet_name= isset($_POST['add_pet_name']) ? $_POST['add_pet_name'] : '';
$symptom_type = isset($_POST['symptom_type']) ? $_POST['symptom_type'] : '';
$pet_id = isset($_POST['pet_id']) ? $_POST['pet_id'] : '';

$sql = "UPDATE MEDICAL_RECORDS SET APP_TYPE_ID = ?, DOCTOR_ID = ?, CREATEDATE = ? , MR_SYMPTOM = ? WHERE PET_ID = ?";

$statement = $pdo->prepare($sql);
// $statement->bindValue(1 , $reserve_date_formatted);           
$statement->bindValue(1 , $type);           
$statement->bindValue(2 , $doctor);
$statement->bindValue(3 , $date);
$statement->bindValue(4 , $symptom_type);
$statement->bindValue(5 , $pet_id);
$a = $statement->execute();

header("Content-Type: application/json");

if ($a > 0) {
   echo json_encode(['message' => '更新成功']);
} else {
   echo json_encode(['message' => '更新失敗']);
}

// if($a > 0){
//    echo '更新成功';
// }else{
//    echo '更新失敗';
// }
?>