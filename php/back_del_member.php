<?php    
   include('conn.php');
   header("Access-Control-Allow-Origin: http://localhost:3000");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");

    //取得GET過來的值
    $memberID = isset($_POST['memberID']) ? $_POST['memberID'] : '';

   // //建立SQL
   // $sql1 = "delete from MEMBER where MEMBER_ID = ?";
   // $sql2 = "delete from PET where MERBER_ID = ?";
 
   // //執行
   // $statement = $pdo->prepare($sql1);
   // $statement->bindValue(1, $memberID); 
   // $statement->execute();

   // $statement = $pdo->prepare($sql2);
   // $statement->bindValue(1, $memberID); 
   // $statement->execute();

   $sqlDeleteMemberVoucher = "DELETE FROM MEMBER_VOUCHER WHERE MEMBER_ID = ?";
   $statementDeleteMemberVoucher = $pdo->prepare($sqlDeleteMemberVoucher);
   $statementDeleteMemberVoucher->bindValue(1, $memberID);
   $statementDeleteMemberVoucher->execute();

   $sqlDeleteAppointment = "DELETE FROM APPOINTMENT WHERE MEMBER_ID = ?";
   $statementDeleteAppointment = $pdo->prepare($sqlDeleteAppointment);
   $statementDeleteAppointment->bindValue(1, $memberID);
   $statementDeleteAppointment->execute();

   $sqlDeletePet = "DELETE FROM PET WHERE MERBER_ID = ?";
   $statementDeletePet = $pdo->prepare($sqlDeletePet);
   $statementDeletePet->bindValue(1, $memberID);
   $statementDeletePet->execute();

   $sqlDeleteMember = "DELETE FROM MEMBER WHERE MEMBER_ID = ?";
   $statementDeleteMember = $pdo->prepare($sqlDeleteMember);
   $statementDeleteMember->bindValue(1, $memberID);
   $statementDeleteMember->execute();
   


   
    //導頁    
    echo "<script>alert('商品已刪除!'); location.href = '_back_member_profile.html';</script>";  
?>