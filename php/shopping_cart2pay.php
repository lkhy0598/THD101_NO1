<?php

// include('conn.php');
include('connServer.php');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");

$MEMBER_ID = intval($_POST['MEMBER_ID']);
$RECIPIENT = $_POST['RECIPIENT'];
$RE_EMAIL = $_POST['RE_EMAIL'];
$RE_PHONE_NO = $_POST['RE_PHONE_NO'];
$ORDER_COMMENT = ($_POST['ORDER_COMMENT']);
$DELIVERY_METHOD_ID = intval($_POST['DELIVERY_METHOD_ID']);
$PAYMENT_ID = intval($_POST['PAYMENT_ID']);
$TOTAL = intval($_POST['TOTAL']);
$VOUCHER_ID = intval($_POST['VOUCHER_ID']);
$items = $_POST['items'];
$PAY_STATE_ID = intval($_POST['PAY_STATE_ID']);


try {

$productStock = array(); // 用于存储商品库存的数组

foreach ($items as $item) {
    $PRODUCT_ID = $item['PRODUCT_ID'];

    // 查询商品库存
    $stockQuery = "SELECT INVENTORY FROM PRODUCT WHERE PRODUCT_ID = ?";
    $stockStatement = $pdo->prepare($stockQuery);
    $stockStatement->bindValue(1, $PRODUCT_ID);
    $stockStatement->execute();

    $stockResult = $stockStatement->fetch(PDO::FETCH_ASSOC);
    $currentStock = $stockResult['STOCK'];

    // 将商品ID和当前库存存储到数组中
    $productStock[$PRODUCT_ID] = $currentStock;
}


$pdo->beginTransaction();

$sql ="INSERT INTO `ORDER`(MEMBER_ID,PAYMENT_ID,CREATE_DATE,ORDER_STATE_ID,PAY_STATE_ID,DELIVERY_STATE_ID,TOTAL,VOUCHER_ID,DELIVERY_METHOD_ID,ORDER_COMMENT,RECIPIENT,RE_PHONE_NO,RE_EMAIL)
VALUES (?,?,NOW(),1,?,1,?,?,?,?,?,?,?)";

$statement = $pdo->prepare($sql);
$statement->bindValue(1,$MEMBER_ID);
$statement->bindValue(2,$PAYMENT_ID);
$statement->bindValue(3,$PAY_STATE_ID);
$statement->bindValue(4,$TOTAL);
$statement->bindValue(5,$VOUCHER_ID);
$statement->bindValue(6,$DELIVERY_METHOD_ID);
$statement->bindValue(7,$ORDER_COMMENT);
$statement->bindValue(8,$RECIPIENT);
$statement->bindValue(9,$RE_PHONE_NO);
$statement->bindValue(10,$RE_EMAIL);
$statement->execute();

// 获取特定MEMBER_ID的最近插入的订单ID
$orderID = $pdo->lastInsertId();

$orderdetails = "INSERT INTO ORDER_DETAILS (ORDER_ID, PRODUCT_ID, PRICE, ORDER_AMOUNT, SUBTOTAL)
VALUES (?, ?, ?, ?, ?)";

foreach ($items as $item) {
    $PRODUCT_ID = $item['PRODUCT_ID'];
    $PRICE = $item['PRICE'];
    $ORDER_AMOUNT = $item['ORDER_AMOUNT'];
    $SUBTOTAL = $item['SUBTOTAL'];

    $statement = $pdo->prepare($orderdetails);
    $statement->bindValue(1, $orderID);
    $statement->bindValue(2, $PRODUCT_ID);
    $statement->bindValue(3, $PRICE);
    $statement->bindValue(4, $ORDER_AMOUNT);
    $statement->bindValue(5, $SUBTOTAL);
    $statement->execute();

    // 更新商品库存
    $newStock = $productStock[$PRODUCT_ID] - $ORDER_AMOUNT;

    $updateStockQuery = "UPDATE PRODUCT SET INVENTORY = ? WHERE PRODUCT_ID = ?";
    $updateStockStatement = $pdo->prepare($updateStockQuery);
    $updateStockStatement->bindValue(1, $newStock);
    $updateStockStatement->bindValue(2, $PRODUCT_ID);
    $updateStockStatement->execute();
}


$pdo->commit(); // 提交事务
echo "OK"; // 成功消息

} catch (Exception $e) {
    echo "Error: " . $e->getMessage(); // 输出完整的错误消息
}

?>