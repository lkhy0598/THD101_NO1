<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include("conn.php");
include("connServer.php");

//---------------------------------------------------
// ini_set("display_errors", "On");

if (isset($_POST['EMAIL'])) {
    $EMAIL = htmlspecialchars($_POST['EMAIL']);

    // 建立SQL語法 ============================
    // 確認輸入的信箱是否已註冊    
    $ConfirmSql = "SELECT * FROM MEMBER WHERE EMAIL = :EMAIL";

    //執行語法 ============================
    // 查詢資料庫，檢查信箱是否已存在 
    $stmt = $pdo->prepare($ConfirmSql);
    $stmt->bindParam(':EMAIL', $EMAIL);
    $stmt->execute();
    $confirmResult = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($confirmResult)) {
        echo "此信箱未被註冊！\n";
    } else {
        echo "此信箱正確，請修改密碼\n";
    }
} else {
    echo "此信箱無效！";
}
?>