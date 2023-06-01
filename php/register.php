<?php

// Tibame中心server
// $db_host = "127.0.0.1";
// $db_user = "tibamefe_since2021";
// $db_pass = "vwRBSb.j&K#E";
// $db_select = "tibamefe_thd101g1";
//MySQL相關資訊在本地端，記得改成自己的密碼
$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "password";
$db_select = "mydb";

//建立資料庫連線物件
$dsn = "mysql:host=".$db_host.";dbname=".$db_select.";charset=utf8";

//建立PDO物件，並放入指定的相關資料
$pdo = new PDO($dsn, $db_user, $db_pass);

//---------------------------------------------------

//建立SQL
$accountPhone = $_POST["accountPhone"];
$name = $_POST["name"];
$password = $_POST["password"];
$passwordChecked = $_POST["passwordChecked"];
$email = $_POST["email"];




//建立SQL語法
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES ('".$_POST["account"]."', '".$_POST["password"]."', NOW())";
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES ('$account', '$password', NOW())";
$sql = "INSERT INTO member (NAME, PHONENO, EMAIL,  PASSWORD, CREATE_DATE) VALUES ('$name', '$accountPhone', '$email', '$password',NOW())";
// $sql = "INSERT INTO member(Account, PWD, CreateDate) VALUES (' "  .$account  ."', '"  .$password  ."', NOW())";

//確認密碼是否重複
// if ($password === $passwordChecked){
//        // continue;
// }else{
//        echo "密碼與再次輸入密碼不相符";
// }


//執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料

$statement = $pdo->query($sql);
if ($statement == null) {
 echo 'sucess';
}else {
       header ("location:./login.html");
}
//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();

//將二維陣列取出顯示其值
// echo $sql; 
if($data){
foreach($data as $index => $row){
       echo "註冊失敗";
       sleep (5);
       header ("location:../login/login.html");
       break;
}
}else{              
       

}
echo "註冊成功";
       echo "<br>";
       echo $row["Account"];   //欄位名稱
       echo " / ";
       echo $row["PWD"];    //欄位名稱
       echo " / ";
       echo $row["CreateDate"];    //欄位名稱
       echo "<br>";



//執行
// $affectedRow = $pdo->exec($sql);
// if($affectedRow > 0){
//        echo "新增成功!";
//        // sleep(15);
//        // header ("Location: ../PDO/Select.php");
// }else{
//        echo "新增失敗!";
// }

?>