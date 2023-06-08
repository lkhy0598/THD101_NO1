<?php

include('conn.php');


$sql = "SELECT * FROM PRODUCT";

$statement = $pdo->query($sql);


$data = $statement->fetchAll();

echo json_encode($data);

?>