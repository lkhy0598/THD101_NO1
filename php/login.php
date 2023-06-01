<?php
include('conn.php');

//---------------------------------------------------
// print_r($PDO);
//建立SQL語法
$sql = "SELECT * FROM member where PHONENO = '" . $_POST["accountPhone"] . "' and PASSWORD = '" . $_POST["password"] . "'";



//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
$statement = $pdo->query($sql);

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
// echo $sql;
if (count($data)>0) {
       foreach ($data as $index => $row) {
              echo "登入成功";
             
       }
} else {
       echo "登入失敗";
       print_r ($data);
       print_r (count($data));


       // sleep (5);
       // header ("location:./login.html");
};


?>