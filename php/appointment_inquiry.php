<?php

// include ('conn.php');
include ('connServer.php');


//建立SQL語法
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES ('".$_POST["account"]."', '".$_POST["password"]."', NOW())";
$sql = "select * from APPOINTMENT";
$statement = $pdo->query($sql);
$data = $statement->fetchAll();
// print_r($data);
// if(count($data)){
// echo 1;
// }
ini_set("display_errors", "On");
echo 30;
?>