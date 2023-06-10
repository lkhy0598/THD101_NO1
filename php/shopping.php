<?php

// include('conn.php');
include('connServer.php')


$sql = "SELECT * FROM PRODUCT";

$statement = $pdo->query($sql);


$data = $statement->fetchAll();

echo json_encode($data);

?>