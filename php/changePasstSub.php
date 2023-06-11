<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include("conn.php");
include("connServer.php");

//---------------------------------------------------
// ini_set("display_errors", "On");

$PASSWORD = htmlentities($_POST['PASSWORD']);
$EMAIL = htmlentities($_POST['EMAIL']); // 添加此行

// 建立SQL语句 ============================
// 檢查是否為原密碼的語法 
$ConfirmPassSql = "SELECT (SELECT COUNT(*) FROM MEMBER WHERE PASSWORD = :PASSWORD AND EMAIL = :EMAIL) AS passCount"; // 修改SQL语句，添加邮箱条件

$ConfirmEmailSql = "SELECT (SELECT COUNT(*) FROM MEMBER WHERE EMAIL = :EMAIL) AS emailCount";

// 修改密碼的語法                               
$changePassSql = "UPDATE MEMBER SET PASSWORD = :PASSWORD WHERE EMAIL = :EMAIL";


//執行語法 ============================
//查詢資料庫，檢查密碼是否為原密碼
$stmt = $pdo->prepare($ConfirmPassSql);
$stmt->bindParam(':PASSWORD', $PASSWORD);
$stmt->bindParam(':EMAIL', $EMAIL);
$stmt->execute();
$ConfirmPassSql = $stmt->fetch(PDO::FETCH_ASSOC);
if ($ConfirmPassSql['passCount'] > 0) {
    echo "新密碼不可與原密碼相同！";
} else {
    //根據剛輸入的信箱來修改密碼
    $stmt = $pdo->prepare($ConfirmEmailSql);
    $stmt->bindParam(':EMAIL', $EMAIL);
    $stmt->execute();
    $ConfirmEmailSql = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($ConfirmEmailSql['emailCount'] > 0) {
        //若沒有重複就修改密碼
        $stmt = $pdo->prepare($changePassSql);
        $stmt->bindParam(':PASSWORD', $PASSWORD);
        $stmt->bindParam(':EMAIL', $EMAIL);
        $stmt->execute();
        echo "修改成功！";
    }
}
