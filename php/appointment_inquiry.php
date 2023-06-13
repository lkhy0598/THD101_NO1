<?php

include ('conn.php');
// include ('connServer.php');


//建立SQL語法
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES ('".$_POST["account"]."', '".$_POST["password"]."', NOW())";
// $sql = "select PET_NAME from PET where MEMBER_ID = 21";
$sql = "select * from PET";
// $sql1 = "select PHONENO from MEMBER where MEMBER_ID = 21";
$statement = $pdo->query($sql);
// $statement1 = $pdo->query($sql1);
$data = $statement->fetchAll();
// $data1 = $statement1->fetchAll();
// print_r($data);
// if(count($data)){
// echo 1;
// }
// ini_set("display_errors", "On");
echo $data[0][1];
// echo $data1[0][0];

?>
