<?php

include('conn.php');
// include('connServer.php');

$sql = "select * FROM MEMBER M join PET P on M.MEMBER_ID = P.MERBER_ID;";

$statement = $pdo->query($sql);


$data = $statement->fetchAll();

echo json_encode($data);

?>