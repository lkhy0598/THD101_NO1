<?php

include('conn.php');

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$commodity_number = $_POST['commodity_number'];
$commodity_classification = $_POST['commodity_classification'];
$commodity_status = $_POST['commodity_status'];
$commodity_title = $_POST['commodity_title'];

$classificationMap = array(
    '1' => '飼料',
    '2' => '罐頭',
    '3' => '保健食品'
  );

  if ($commodity_number !== '' || $commodity_classification !== '' || $commodity_status !== '' || $commodity_title !== '') {

    $sql = "SELECT * FROM PRODUCT WHERE 1=1";
    $params = array(); // 創建一個數組來儲存數值
   
    if ($commodity_number !== '') {
      $sql .= " AND PRODUCT_ID LIKE ?";
      $params[] = "%" . $commodity_number . "%"; // 添加參數值到數組
    }
  
    if ($commodity_classification !== '') {
      $sql .= " AND PRODUCT_CATAGORY_ID LIKE ?";
      $params[] = "%" . $commodity_classification . "%"; // 添加參數值到數組
    }
  
    if ($commodity_status === '有庫存' || $commodity_status === '') {
      $sql .= " AND INVENTORY > 0";
    } elseif ($commodity_status === '無庫存') {
      $sql .= " AND INVENTORY = 0";
    }
  
    if ($commodity_title !== '') {
      $sql .= " AND PRODUCT_TITLE LIKE ?";
      $params[] = "%" . $commodity_title . "%"; // 添加參數值到數組
    }
  
    $statement = $pdo->prepare($sql);
  
    // 綁定參數
    for ($i = 0; $i < count($params); $i++) {
      $statement->bindValue($i + 1, $params[$i]);
    }
  
    $statement->execute();
  
    $data = $statement->fetchAll();
  
    foreach ($data as &$row) {
      $categoryID = $row['PRODUCT_CATAGORY_ID'];
      if (isset($classificationMap[$categoryID])) {
        $row['PRODUCT_CATAGORY_ID'] = $classificationMap[$categoryID];
      }
    }
  
    header('Content-Type: application/json');
  
    echo json_encode($data);
  }

?>