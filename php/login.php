<?php
include('conn.php');

//---------------------------------------------------
// $USERNAME = htmlspecialchars($_POST['USERNAME']);
$EMAIL = htmlspecialchars($_POST['EMAIL']);
$PASSWORD = htmlentities($_POST['PASSWORD']);

//建立SQL語法
$sql = "SELECT * FROM member WHERE EMAIL = ? and PASSWORD = ? ";

//會自動檢查數據格式，並轉換特殊字元，再將 User Input 填入 SQL 語法中 
$statement = $pdo->prepare($sql);
$statement->bindValue(1, $EMAIL); //數字代表的是上面SQL語法中的第幾個問號
$statement->bindValue(2, $PASSWORD);
$statement->execute();

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();
session_start();
// 執行
if (count($data) > 0) {
       // 成功獲取email和password
       foreach ($data as $row) {
              // 抓取其使用者名稱
              $sql = "SELECT NAME FROM member WHERE EMAIL = ?";
              $statement = $pdo->prepare($sql);
              $statement->bindValue(1, $EMAIL);
              $statement->execute();
              $nameData  = $statement->fetch();
              // 套上名稱
              if ($row) {
                     // 將會員名稱儲存在 $_SESSION["memberID"] 
                     $_SESSION["memberID"] = $nameData ['NAME']; 
                     echo "登入成功！\n";
                     echo "三秒後將跳轉到會員中心\n";
                     break;
              }else{
                     $_SESSION["memberID"] = '使用者';
                     break;
              }
       }
} else {
       echo "登入失敗！\n";
       echo "請檢查帳號密碼是否輸入正確！\n";
}
