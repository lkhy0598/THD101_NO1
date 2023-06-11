<?php
// session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include("conn.php");
include("connServer.php");

//---------------------------------------------------
// $USERNAME = htmlspecialchars($_POST['USERNAME']);
$EMAIL = htmlspecialchars($_POST['EMAIL']);
$PASSWORD = htmlentities($_POST['PASSWORD']);

//建立SQL語法
$sql = "SELECT * FROM MEMBER WHERE EMAIL = ? and PASSWORD = ? ";

//會自動檢查數據格式，並轉換特殊字元，再將 User Input 填入 SQL 語法中 
$statement = $pdo->prepare($sql);
$statement->bindValue(1, $EMAIL); //數字代表的是上面SQL語法中的第幾個問號
$statement->bindValue(2, $PASSWORD);
$statement->execute();

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

// 將session中的值清空
$MemberID = "";
$MemberName = "";
// clearSession();

// 將回傳的data賦值給指定變數
foreach ($data as $index => $row) {
       $MemberID = $row["MEMBER_ID"];
       $MemberName = $row["NAME"];
}

//判斷是否有會員資料?
if ($MemberID != "" && $MemberName != "") {

       // include("http://localhost/THD101_NO1/lib/Member.php");
       include("../lib/Member.php");
       //將會員資訊寫入session
       setMemberInfo($MemberID, $MemberName);

       //登入成功        
       echo "登入成功！\n";

       // if (isset($_SESSION["MemberID"])) {
       //        echo "Session 已正確建立，MemberID 為：" . $_SESSION["MemberID"];
       //    } else {
       //        echo "Session 尚未建立";
       //    }
       
} else {
       //登入失敗
       echo "登入失敗！\n";
       echo "請檢查帳號密碼是否輸入正確！\n";
}