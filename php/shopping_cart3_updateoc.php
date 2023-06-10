<?php
// include('conn.php');
include('connServer.php');

header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: *");


$ids = $_POST['member_id'];
$orderComment = $_POST['orderComment'];

$sql = "UPDATE `ORDER`
SET ORDER_COMMENT = :orderComment
WHERE MEMBER_ID = :memberId
ORDER BY ORDER_ID DESC
LIMIT 1";

$statement = $pdo->prepare($sql);
$statement->bindValue(":orderComment",$orderComment);
$statement->bindValue(":memberId",$ids);
$statement->execute();


if ($statement->rowCount() > 0) {
    echo "OK";
} else {
    echo "更新失败";
}

?>