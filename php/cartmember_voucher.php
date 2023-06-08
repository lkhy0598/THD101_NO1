<?php
include('conn.php');

$ids = $_POST['member_id'];

$sql = "SELECT DISTINCT MV.MEMBER_ID,MV.VOUCHER_ID,CONCAT(V.VOUCHER_TITLE,V.VOUCHER_CONTENT) AS VOUCHER_NAME,MV.VOUCHER_AMOUNT
FROM MEMBER_VOUCHER MV
JOIN MEMBER M ON MV.MEMBER_ID = M.MEMBER_ID
JOIN VOUCHER V ON MV.VOUCHER_ID = V.VOUCHER_ID
WHERE MV.MEMBER_ID = ? and MV.VOUCHER_AMOUNT>0"; 



$statement = $pdo->prepare($sql);
$statement->bindValue(1,$ids);
$statement->execute();


$data = $statement->fetchAll();

echo json_encode($data);

?>