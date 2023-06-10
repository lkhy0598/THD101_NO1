<?php

include('conn.php');
include('upload.php');

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$new_commodity_title = $_POST['new_commodity_title'];
$new_commodity_classification = $_POST['new_commodity_classification'];
$new_price = $_POST['new_price'];
$new_stock = $_POST['new_stock']; 
$new_commodity_content = $_POST['new_commodity_content']; 

$commodity_type = "";

// 根據商品類別設定相應的資料夾路徑
if ($new_commodity_classification === "1") {
    $commodity_type = "dryfood";
} elseif ($new_commodity_classification === "2") {
    $commodity_type = "can";
} elseif ($new_commodity_classification === "3") {
    $commodity_type = "healthy";
}

// 獲取乾糧、保健食品最大數字
$max_number_sql = "SELECT MAX(SUBSTRING_INDEX(IMG_SOURCE, '/', -2)) AS max_number FROM PRODUCT WHERE PRODUCT_CATAGORY_ID = ?";
$max_number_statement = $pdo->prepare($max_number_sql);
$max_number_statement->bindValue(1, $new_commodity_classification);
$max_number_statement->execute();
$row = $max_number_statement->fetch(PDO::FETCH_ASSOC);
$max_number = $row['max_number'];

if ($max_number === null) {
    $number = 1;
} else {
    $number = intval($max_number) + 1;
}

// 獲取罐頭最大數字
if ($new_commodity_classification === "2") {

    $number = 10;

    $number++;

}

// 創建商品專屬的資料夾
$commodity_folder = $commodity_type . str_pad($number, 2, '0', STR_PAD_LEFT);

if (!is_dir($commodity_folder)) {
    mkdir($commodity_folder, 0755, true);
}

// 遍歷檔案陣列
$uploaded_file_paths = []; // 建立一個空陣列來儲存上傳檔案的路徑

for ($i = 0; $i < count($_FILES["commodity_pic"]["tmp_name"]); $i++) {

    $filePath_Temp = $_FILES["commodity_pic"]["tmp_name"][$i];
    $filePath = getCommodityPath($commodity_type , $commodity_folder) . $_FILES["commodity_pic"]["name"][$i];

if (move_uploaded_file($filePath_Temp, $filePath)) {

    // 獲取最大ID和商品資料夾路徑
    $max_id_sql = "SELECT MAX(PRODUCT_ID) AS max_id FROM PRODUCT WHERE PRODUCT_CATAGORY_ID = ?";
    $max_id_statement = $pdo->prepare($max_id_sql);
    $max_id_statement->bindValue(1, $new_commodity_classification);
    $max_id_statement->execute();
    $row = $max_id_statement->fetch(PDO::FETCH_ASSOC);
    $max_id = $row['max_id'];

    if ($max_id === null) {
        $commodity_id = $id_start;
    } else {
        $commodity_id = $max_id + 1;
    }



    $full_file_path = $commodity_folder . "/" . $_FILES["commodity_pic"]["name"][$i]; // 拼接完整路徑

    $uploaded_file_paths[] = $full_file_path; // 將路徑加入到陣列中

    echo "新增成功!";
    
} else {
    
    echo "新增失敗!";
}

}

    $new_commodity_content = '            <section class="SHOPPINGLIST_ARTICLE">' . $new_commodity_content . '</section>';

    $uploaded_paths_str = implode(',', $uploaded_file_paths); // 使用implode()將陣列轉換成字串，用逗號區隔

    // 新增商品到資料庫
    $sql = "INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_TITLE, PRODUCT_PRICE, PRODUCT_CATAGORY_ID, INVENTORY, CREATE_DATE, IMG_SOURCE, PRODUCT_CONTENT) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)";
    $statement = $pdo->prepare($sql);

    // 綁定參數並執行新增操作
    $statement->bindValue(1, $commodity_id);
    $statement->bindValue(2, $new_commodity_title);
    $statement->bindValue(3, $new_price);
    $statement->bindValue(4, $new_commodity_classification);
    $statement->bindValue(5, $new_stock);
    $statement->bindValue(6, $uploaded_paths_str);
    $statement->bindValue(7, $new_commodity_content);
    $statement->execute();

    echo "成功新增資料"

?>
