<?php

include('conn.php');


$productId = $_GET['id'];

$sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID = :productId"; // 使用获取到的id值进行查询



$statement = $pdo->prepare($sql);
$statement->bindParam(':productId', $productId);
$statement->execute();


$data = $statement->fetchAll();

echo json_encode($data);

?>