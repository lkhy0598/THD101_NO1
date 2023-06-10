<?php
// include('conn.php');
include('connServer.php');

$ids = json_decode($_GET['ids']);

$results = array(); // 存储结果数据的数组

// 遍历传递的ids数组
foreach ($ids as $id) {
    $sql = "SELECT PRODUCT_ID, INVENTORY FROM PRODUCT WHERE PRODUCT_ID = :productId"; // 使用占位符
    $statement = $pdo->prepare($sql);
    $statement->bindParam(':productId', $id); // 绑定参数

    if ($statement->execute()) {
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        $results[] = $data; // 将获取的数据添加到结果数组中
    } else {
        // 处理执行错误
        $results[] = array('error' => 'Error executing query'); // 示例：以'error'为键名存储错误信息
    }
}

echo json_encode($results);
?>