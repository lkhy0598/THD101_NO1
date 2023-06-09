<?php
include('conn.php');

function retrieveAdditionalData($productId, $pdo) {
    // 执行查询，获取附加数据
    $sql = "SELECT PRODUCT_TITLE, IMG_SOURCE FROM PRODUCT WHERE PRODUCT_ID = ?";
    
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1, $productId);
    $statement->execute();
    $data = $statement->fetch(); // 使用 fetch() 而不是 fetchAll()

    // 将数据存储在关联数组中
    $additionalData = array(
        'PRODUCT_TITLE' => $data['PRODUCT_TITLE'],
        'IMG_SOURCE' => $data['IMG_SOURCE']
    );

    return $additionalData;
}

$ids = $_POST['member_id'];

$sql1 = "SELECT *
FROM `ORDER`
WHERE MEMBER_ID = ?
ORDER BY ORDER_ID DESC
LIMIT 1;"; 

$statement1 = $pdo->prepare($sql1);
$statement1->bindValue(1,$ids);
$statement1->execute();
$data = $statement1->fetchAll();

$result = array(); // 创建一个空数组

foreach ($data as $row) {
    // 访问每个字段的值
    $orderId = $row["ORDER_ID"];
    $memberId = $row["MEMBER_ID"];
    $paymentId = $row["PAYMENT_ID"];
    $createDate = $row["CREATE_DATE"];
    $orderStateId = $row["ORDER_STATE_ID"];
    $payStateId = $row["PAY_STATE_ID"];
    $deliveryStateId = $row["DELIVERY_STATE_ID"];
    $total = $row["TOTAL"];
    $deliveryMethodId = $row["DELIVERY_METHOD_ID"];
    $orderComment = $row["ORDER_COMMENT"];
    $recipent = $row["RECIPIENT"];
    $rePhoneNo = $row["RE_PHONE_NO"];
    $reEmail = $row["RE_EMAIL"];

    // 将需要的值添加到结果数组
    $result['CREATE_DATE'] = $createDate;
    $result['TOTAL'] = $total;
    $result['ORDER_COMMENT'] = $orderComment;
    $result['RECIPIENT'] = $recipent;
    $result['RE_PHONE_NO'] = $rePhoneNo;
    $result['RE_EMAIL'] = $reEmail;

    $sql2 = "SELECT METHOD FROM PAYMENT WHERE ID = ?";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(1,$paymentId);
    $statement2->execute();
    $payMethodResult = $statement2->fetch();

    $payMethod = !empty($payMethodResult) ? $payMethodResult['METHOD'] : '';

    $result['PAYMENT_METHOD'] = $payMethod;

    $sql3 = "SELECT ORDER_STATE FROM ORDER_STATE WHERE ID = ?";
    $statement3 = $pdo->prepare($sql3);
    $statement3->bindValue(1,$orderStateId);
    $statement3->execute();
    $odStateResult = $statement3->fetch();

    $odState = !empty($odStateResult) ? $odStateResult['ORDER_STATE'] : '';

    $result['ORDER_STATE'] = $odState;

    $sql4 = "SELECT PAYMENT_STATE FROM PAYMENT_STATE WHERE ID = ?";
    $statement4 = $pdo->prepare($sql4);
    $statement4->bindValue(1,$payStateId);
    $statement4->execute();
    $pStateResult = $statement4->fetch();

    $pState = !empty($pStateResult) ? $pStateResult['PAYMENT_STATE'] : '';

    $result['PAYMENT_STATE'] = $pState;

    $sql5 = "SELECT DELIVERY_STATE FROM DELIVERY_STATE WHERE DELIVERY_STATE_ID = ?";
    $statement5 = $pdo->prepare($sql5);
    $statement5->bindValue(1,$deliveryStateId);
    $statement5->execute();
    $dStateResult = $statement5->fetch();

    $dState = !empty($dStateResult) ? $dStateResult['DELIVERY_STATE'] : '';

    $result['DELIVERY_STATE'] = $dState;

    $sql6 = "SELECT DELIVERY_METHOD FROM DELIVERY_METHOD WHERE ID = ?";
    $statement6 = $pdo->prepare($sql6);
    $statement6->bindValue(1,$deliveryMethodId);
    $statement6->execute();
    $dMethodResult = $statement6->fetch();

    $dMethod = !empty($dMethodResult) ? $dMethodResult['DELIVERY_METHOD'] : '';

    $result['DELIVERY_METHOD'] = $dMethod;  

    $sql7 = "SELECT NAME,PHONENO FROM MEMBER WHERE MEMBER_ID = ?";
    $statement7 = $pdo->prepare($sql7);
    $statement7->bindValue(1,$memberId);
    $statement7->execute();
    $memberinfo = $statement7->fetchAll();

    foreach ($memberinfo as $info) {
        $result['NAME'] = $info['NAME'];
        $result['PHONENO'] = $info['PHONENO'];
    }

    $sql8 = "SELECT PRODUCT_ID,PRICE,ORDER_AMOUNT FROM ORDER_DETAILS WHERE ORDER_ID = ?";
    $statement8 = $pdo->prepare($sql8);
    $statement8->bindValue(1,$orderId);
    $statement8->execute();
    $orderDetails = $statement8->fetchAll();

    foreach ($orderDetails as $detail) {
        $productId = $detail['PRODUCT_ID'];
        $price = $detail['PRICE'];
        $orderAmount = $detail['ORDER_AMOUNT'];
    
        // 获取附加数据
        $additionalData = retrieveAdditionalData($productId, $pdo);
    
        // 将产品和附加数据添加到结果数组
        $product = [
            'PRODUCT_ID' => $productId,
            'PRICE' => $price,
            'ORDER_AMOUNT' => $orderAmount,
            'PRODUCT_TITLE' => $additionalData['PRODUCT_TITLE'],
            'IMG_SOURCE' => $additionalData['IMG_SOURCE']
        ];
    
        $result['PRODUCTS'][] = $product;
    }
    

}

echo json_encode($result);

?>