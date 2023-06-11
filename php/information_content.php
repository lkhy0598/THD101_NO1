<?php

// include('conn.php');
include('connServer.php');


$NEWS_ID = $_GET['id'];


$sql = "SELECT * FROM LATEST_NEWS WHERE NEWS_ID = :NEWS_ID";



$statement = $pdo->prepare($sql);
$statement->bindParam(':NEWS_ID', $NEWS_ID);
$statement->execute();


$data = $statement->fetchAll();

echo json_encode($data);

?>