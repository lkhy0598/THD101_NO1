<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include("conn.php");
include("connServer.php");

//---------------------------------------------------
// ini_set("display_errors", "On");

$USERNAME = htmlspecialchars($_POST['USERNAME']);
$PASSWORD = htmlentities($_POST['PASSWORD']);
$PHONENO = htmlentities($_POST['PHONENO']);
$EMAIL = htmlspecialchars($_POST['EMAIL']);

// 建立SQL語法 ============================
// 確認帳號是否重複的語法       
$ConfirmSql = "SELECT (SELECT COUNT(*) FROM MEMBER WHERE PHONENO = :PHONENO) AS phoneCount, (SELECT COUNT(*) FROM MEMBER WHERE EMAIL = :EMAIL) AS emailCount";

// 加入會員的語法的語法                                
$joinSql = "INSERT INTO MEMBER(NAME, PHONENO, EMAIL,  PASSWORD, CREATE_DATE) VALUES (? ,? , ? ,? ,NOW())";

//執行語法 ============================
// 查詢資料庫，檢查信箱和電話是否都已存在 
$stmt = $pdo->prepare($ConfirmSql);
$stmt->bindParam(':PHONENO', $PHONENO);
$stmt->bindParam(':EMAIL', $EMAIL);
$stmt->execute();
$confirmResult = $stmt->fetch(PDO::FETCH_ASSOC);

if ($confirmResult['phoneCount'] > 0 && $confirmResult['emailCount'] > 0) {
     echo "註冊失敗！\n";
     echo "您的信箱及電話皆已被註冊\n";
 
 } else if ($confirmResult['phoneCount'] > 0) {
     echo "註冊失敗！\n";
     echo "您的電話已被註冊\n";
 
 } else if ($confirmResult['emailCount'] > 0) {
     echo "註冊失敗！\n";
     echo "您的信箱已被註冊 \n";
} else {
     //執行加入語法
     // $affectedRow = $pdo->exec($sql);
     $statement = $pdo->prepare($joinSql);
     $statement->bindValue(1, $USERNAME); //數字代表的是上面SQL語法中的第幾個問號
     $statement->bindValue(2, $PHONENO);
     $statement->bindValue(3, $EMAIL);
     $statement->bindValue(4, $PASSWORD);
     $affectedRow = $statement->execute();

     if ($affectedRow > 0) {
          http_response_code(200); // 設定HTTP狀態碼為200表示成功
          echo "註冊成功！\n";
          echo "您好！" . $USERNAME . "\n";
          echo "您註冊的電話為" . $PHONENO . "\n";
          echo "您註冊的信箱為" . $EMAIL . "\n";
     } else {
          http_response_code(500);
          echo "新增失敗！\n";
          echo "請檢查全部欄位是否都正確輸入";
     }
};
