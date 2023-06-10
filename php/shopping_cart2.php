<?php
// include('conn.php');
include('connServer.php')

$ids = $_POST['member_id'];

$sql = "SELECT NAME,PHONENO,EMAIL FROM MEMBER
WHERE MEMBER_ID = ?"; 

$statement = $pdo->prepare($sql);
$statement->bindValue(1,$ids);
$statement->execute();
$data = $statement->fetchAll();

echo json_encode($data);

?>