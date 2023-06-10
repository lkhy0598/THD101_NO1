<?php
// include('conn.php');
include('connServer.php');

header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$account = htmlspecialchars($_POST['account']);
$password = htmlentities($_POST['password']);


//建立SQL
$sql = "SELECT * FROM USER WHERE USER_ACCOUNT = ? and PASSWORD = ?";
    
//執行
$statement = $pdo->prepare($sql);    
$statement->bindValue(1, $account);
$statement->bindValue(2, $password);
$statement->execute();
$data = $statement->fetchAll();
    //依資料筆數判斷是否為會員
    if(count($data) > 0){

        include('member_session.php');

        //將登入資訊寫入session
        setSessionB($_POST["account"]);

        echo "done";
       

    }else{

        //跳出提示停留在後台登入頁
        echo "<script>alert('帳號或密碼錯誤!'); location.href = '../index.html';</script>"; 
        echo"fail";

    }
?>