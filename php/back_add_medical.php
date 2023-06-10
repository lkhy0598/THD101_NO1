<?php

// include('conn.php');
include('connServer.php');
ini_set("display_errors", "On");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$doctor = isset($_POST['doctor']) ? $_POST['doctor'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : '';
$add_pet_name = isset($_POST['add_pet_name']) ? $_POST['add_pet_name'] : '';
// $pet_category = isset($_POST['pet_category']) ? $_POST['pet_category'] : '';
// $pet_age = isset($_POST['pet_age']) ? $_POST['pet_age'] : '';
$symptom_type = isset($_POST['symptom_type']) ? $_POST['symptom_type'] : '';

$sql = "SELECT PET_ID FROM PET WHERE PET_NAME = ?";
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $add_pet_name);
$statement->execute();
$pet = $statement->fetch(PDO::FETCH_ASSOC);

if ($pet) {
   // 找到了對應的寵物
   $petId = $pet['PET_ID'];

   // 將資料新增至病歷資料表
   $sql = "INSERT INTO MEDICAL_RECORDS (APP_TYPE_ID, PET_ID, DOCTOR_ID, CREATEDATE, MR_SYMPTOM) VALUES (?, ?, ?, NOW(), ?)";
   $statement = $pdo->prepare($sql);
   $statement->bindValue(1 , $type);             
   $statement->bindValue(2 , $petId);
   $statement->bindValue(3 , $doctor);
   $statement->bindValue(4 , $symptom_type);
   $statement->execute();
   // 回傳成功訊息或其他相關回應...
   echo "病歷新增成功";
} else {
   // 找不到對應的寵物
   echo "找不到對應的寵物";
}

?>