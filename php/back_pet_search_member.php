<?php

include('conn.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$phone = $_POST['phone'];
$type = $_POST['type'];





if( $phone == '' && $type !== 'default'){
   $sql = "SELECT * FROM PET P join MEMBER M on P.MERBER_ID = M.MEMBER_ID";
   // $sql = "SELECT * FROM PET";
   // $statement = $pdo->prepare($sql);
   $statement = $pdo->query($sql);

    
   // $statement->bindValue(1,"%".$type."%");
   // $statement ->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');
   // echo json_encode($data);
   
} 

// if($type == "DEFAULT" && $phone !== ''){
//    $sql = "SELECT * FROM PET P join MEMBER M on P.MERBER_ID = M.MEMBER_ID where M.PHONENO like ?";


//    $statement = $pdo->prepare($sql);

//    $statement->bindValue(1,"%".$phone."%");

//    $statement ->execute();

//    $data = $statement->fetchAll();

//    header('Content-Type: application/json');
//    echo json_encode($data);
// }



?>

