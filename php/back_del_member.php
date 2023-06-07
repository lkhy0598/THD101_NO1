<?php    
   include('conn.php');
   header("Access-Control-Allow-Origin: http://localhost:3000");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");

    //取得GET過來的值
    $memberID = isset($_POST['memberID']) ? $_POST['memberID'] : '';

   //  //建立SQL
   //  $sql = "delete from MEMBER where MEMBER_ID = ?";
   //  $sql = "delete from PET where MEMBER_ID = ?";
  
   //  //執行
   //  $statement = $pdo->prepare($sql);
   //  $statement->bindValue(1 , $memberID); 
   //  $statement->bindValue(2 , $memberID); 
   //  $statement->execute();

   //建立SQL
   $sql1 = "delete from MEMBER where MEMBER_ID = ?";
   $sql2 = "delete from PET where MERBER_ID = ?";
 
   //執行
   $statement = $pdo->prepare($sql1);
   $statement->bindValue(1, $memberID); 
   $statement->execute();

   $statement = $pdo->prepare($sql2);
   $statement->bindValue(1, $memberID); 
   $statement->execute();

    //導頁    
    echo "<script>alert('商品已刪除!'); location.href = '_back_member_profile.html';</script>";  
?>