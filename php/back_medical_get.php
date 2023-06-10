<?php
include('conn.php');
// include('connServer.php');

// 設定CORS標頭，允許 'content-type' 標頭欄位。
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$pet_id = $_GET['pet_id'];

// echo $pet_id;

$sql = "SELECT * FROM MEDICAL_RECORDS JOIN PET ON MEDICAL_RECORDS.PET_ID = PET.PET_ID WHERE MEDICAL_RECORDS.PET_ID = $pet_id";

$result = $pdo->query($sql);

// 檢查是否有結果
if ($result->rowCount() > 0) {
   // 提取第一行資料
   $row = $result->fetch(PDO::FETCH_ASSOC);

   // 構建要返回的資料陣列
   $responseData = array(
      'DOCTOR_ID' => $row['DOCTOR_ID'],
      'APP_TYPE_ID' => $row['APP_TYPE_ID'], 
      'CREATEDATE' => $row['CREATEDATE'],
      'PET_NAME' => $row['PET_NAME'],
      'PET_ID' => $row['PET_ID'],
      'MR_SYMPTOM' => $row['MR_SYMPTOM']
  );
   // 將資料轉換為 JSON 格式並返回
   echo json_encode($responseData);

} else {
   http_response_code(404);
   echo "沒有找到會員資料";
}
?>