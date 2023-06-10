<?php
   // include('conn.php');
   include('connServer.php');
   ini_set("display_errors", "On");
   // 設定CORS標頭，允許 'content-type' 標頭欄位。
   // header("Access-Control-Allow-Origin: http://localhost:3000");
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET");
   header("Access-Control-Allow-Headers: Content-Type");

    // 獲取從表單提交的資料
   $owner_phone = $_GET['owner_phone'];

   // 構建 SQL 查詢語句
   $sql = "SELECT * FROM PET JOIN MEMBER ON PET.MEMBER_ID = MEMBER.MEMBER_ID WHERE PHONENO = $owner_phone";
   
   $result = $pdo->query($sql);

   // 檢查是否有結果
if ($result->rowCount() > 0) {
   // 提取第一行資料
   $row = $result->fetch(PDO::FETCH_ASSOC);

   // 構建要返回的資料陣列
   $responseData = array(
      'PET_NAME' => $row['PET_NAME'],
      'PHONENO' => $row['PHONENO'], 
      'PET_GENDER' => $row['PET_GENDER'], 
      'PET_CATAGORY' => $row['PET_CATAGORY'], 
      'PET_AGE' => $row['PET_AGE'], 
      'VACCI_OR_NOT' => $row['VACCI_OR_NOT'], 
      'PET_AVATAR' => $row['PET_AVATAR'], 
      'MEMBER_ID' => $row['MEMBER_ID']
  );
   // 將資料轉換為 JSON 格式並返回
   echo json_encode($responseData);
} else {
   http_response_code(404);
   echo "沒有找到會員資料";
}
?>