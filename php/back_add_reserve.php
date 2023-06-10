<?php
// include('conn.php');
include('connServer.php');
ini_set("display_errors", "On");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$reserve_type = isset($_POST['reserve_type']) ? $_POST['reserve_type'] : '';
$reserve_doctor = isset($_POST['reserve_doctor']) ? $_POST['reserve_doctor'] : '';
$reserve_date = isset($_POST['reserve_date']) ? $_POST['reserve_date'] : '';
$reserve_datetime = isset($_POST['reserve_datetime']) ? $_POST['reserve_datetime'] : '';
$reserve_name = isset($_POST['reserve_name']) ? $_POST['reserve_name'] : '';
$reserve_phone = isset($_POST['reserve_phone']) ? $_POST['reserve_phone'] : '';
$reserve_pet_name = isset($_POST['reserve_pet_name']) ? $_POST['reserve_pet_name'] : '';
$reserve_pet_category = isset($_POST['reserve_pet_category']) ? $_POST['reserve_pet_category'] : '';
$reserve_pet_age = isset($_POST['reserve_pet_age']) ? $_POST['reserve_pet_age'] : '';
$reserve_vaccines = isset($_POST['reserve_vaccines']) ? $_POST['reserve_vaccines'] : '';
$reserve_member_id = isset($_POST['reserve_member_id']) ? $_POST['reserve_member_id'] : '';
$reserve_symptom_type = isset($_POST['reserve_symptom_type']) ? $_POST['reserve_symptom_type'] : '';
$reserve_pet_id = isset($_POST['reserve_pet_id']) ? $_POST['reserve_pet_id'] : '';

// var_dump($reserve_member_id);?,

$sql = "INSERT INTO APPOINTMENT (APPTIME, MEMBER_ID, DOCTOR_ID, PET_ID, APP_TYPE_ID, CREATE_DATE, PERIOD) VALUES (?, ?, ?, ?, ?, NOW(), ?)";

$statement = $pdo->prepare($sql);

$reserve_date_formatted = date('Y-m-d', strtotime($reserve_date));
$statement->bindValue(1 , $reserve_date_formatted);           
$statement->bindValue(2 , $reserve_member_id);
$statement->bindValue(3 , $reserve_doctor);
$statement->bindValue(4 , $reserve_pet_id);
$statement->bindValue(5 , $reserve_type);
$statement->bindValue(6 , $reserve_datetime);

$a = $statement->execute();

$APPID = $pdo->lastInsertId();

if($reserve_type == '1' || $reserve_type == '2' || $reserve_type == '3' ||$reserve_type == '5'){

   $sql = "INSERT INTO MEDICAL_RECORDS (APP_TYPE_ID, PET_ID, CREATEDATE, MR_SYMPTOM) VALUES (?, ?, NOW(), ?)";

   $statement = $pdo->prepare($sql);
   $statement->bindValue(1 , $reserve_type);             
   $statement->bindValue(2 , $reserve_pet_id);
   $statement->bindValue(3 , $reserve_symptom_type);

   $b = $statement->execute();

   if($a > 0 && $b > 0){
      echo '掛號預約成功';
   }else{
      echo '預約失敗';
   }

}

if($reserve_type == '4'){

   $sql = "INSERT INTO STAY (PET_ID, STAY_FROM, STAY_TO, APP_ID) VALUES (?, ?, ADDDATE( ?, 1 ), ?)";

   $statement = $pdo->prepare($sql);
   
   $statement->bindValue(1 , $reserve_pet_id);             
   $statement->bindValue(2 , $reserve_date_formatted);
   $statement->bindValue(3 , $reserve_date_formatted);
   $statement->bindValue(4 , $APPID);

   $c = $statement->execute();

   if($a > 0 && $c > 0){
      echo '住宿預約成功';
   }else{
      echo '預約失敗';
   }

}

// if($a > 0 && $b > 0) {

//    echo '掛號預約成功';

// } else if($a > 0 && $c > 0){

//    echo '住宿預約成功';

// }else{
//    echo '預約失敗';
// }
?>