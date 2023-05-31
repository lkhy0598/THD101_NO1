<?php
// Tibame中心server
$db_host = "127.0.0.1";
$db_user = "tibamefe_since2021";
$db_pass = "vwRBSb.j&K#E";
$db_select = "tibamefe_thd101g1";
//MySQL相關資訊在本地端，記得改成自己的密碼
// $db_host = "127.0.0.1";
// $db_user = "root";
// $db_pass = "password";
// $db_select = "mydb";

//建立資料庫連線物件
$dsn = "mysql:host=" . $db_host . ";dbname=" . $db_select . ";charset=utf8";

//建立PDO物件，並放入指定的相關資料
$pdo = new PDO($dsn, $db_user, $db_pass);

//---------------------------------------------------
print_r($PDO);
//建立SQL語法
$sql = "SELECT * FROM member where PHONENO = '" . $_POST["accountPhone"] . "' and PASSWORD = '" . $_POST["password"] . "'";



//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $pdo->query($sql);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
// echo $sql;
if (count($data)>0) {
       foreach ($data as $index => $row) {
              echo "登入成功";
              echo "<br>";
              echo $row["Account"]; //欄位名稱
              echo " / ";
              echo $row["PWD"]; //欄位名稱
              echo " / ";
              echo $row["CreateDate"]; //欄位名稱
              echo "<br>";
       }
} else {
       echo "登入失敗";
       print_r ($data);
       print_r (count($data));


       // sleep (5);
       // header ("location:./login.html");
}


?>