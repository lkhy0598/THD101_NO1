<?php

include('conn.php');
// include('connServer.php');

// 設定CORS標頭，允許 'content-type' 標頭欄位。
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

 // 獲取從表單提交的資料
$phone_revise = $_GET['phone_revise'];

// 構建 SQL 查詢語句
$sql = "SELECT * FROM MEMBER WHERE PHONENO = $phone_revise ";

$result = $pdo->query($sql);
// 檢查是否有結果
if ($result->rowCount() > 0) {
   // 提取第一行資料
   $row = $result->fetch(PDO::FETCH_ASSOC);

   // 構建要返回的資料陣列
   $responseData = array(
      'NAME' => $row['NAME'], // 修改欄位名稱為 NAME
      'PHONENO' => $row['PHONENO'], // 修改欄位名稱為 PHONENO
      'EMAIL' => $row['EMAIL'], // 修改欄位名稱為 EMAIL
      'ADDRESS' => $row['ADDRESS'], // 修改欄位名稱為 ADDRESS
      'MEMBER_AVATAR' => $row['MEMBER_AVATAR'], // 修改欄位名稱為 MEMBER_AVATAR
      'MEMBER_ID' => $row['MEMBER_ID']
  );
   // 將資料轉換為 JSON 格式並返回
   echo json_encode($responseData);
} else {
   http_response_code(404);
   echo "沒有找到會員資料";
}


?>