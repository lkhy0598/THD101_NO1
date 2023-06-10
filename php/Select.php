<?php
       header("Access-Control-Allow-Origin: *");

       // include("Conn.php");
       include('connServer.php');
       //---------------------------------------------------

       //建立SQL語法
       $allMemberSql = "SELECT * FROM MEMBER";

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->query($allMemberSql);

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

       //將二維陣列取出顯示其值
       echo json_encode($data);

?>