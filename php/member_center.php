<?php


//MySQL相關資訊，在本地端建立
// $db_host = "127.0.0.1";
// $db_user = "root";    
// $db_pass = "password";
// $db_select = "mydb";
//MySQL相關資訊，在server端建立
   $db_host = "127.0.0.1";
   $db_user = "tibamefe_since2021";
   $db_pass = "vwRBSb.j&K#E";
   $db_select = "tibamefe_thd101g1";

//建立資料庫連線物件
$dsn = "mysql:host=".$db_host.";dbname=".$db_select.";charset=utf8";

//建立PDO物件，並放入指定的相關資料
$pdo = new PDO($dsn, $db_user, $db_pass);

//建立SQL語法
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES ('".$_POST["account"]."', '".$_POST["password"]."', NOW())";
$sql = "select * from MEMBER";
$statement = $pdo->query($sql);
$data = $statement->fetchAll();
print_r($data);
// if(count($data)){
// echo 1;
// }
ini_set("display_errors", "On");
echo 30;
?>