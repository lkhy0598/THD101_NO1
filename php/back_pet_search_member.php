<?php

include('conn.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if (isset($_POST['phone'])) {
   $phone = $_POST['phone'];
} else {
   $phone = '';
}

if (isset($_POST['type'])) {
   $type = $_POST['type'];
} else {
   $type = '';
}

if ($phone !== '' || $type !== 'default') {

   $sql = "SELECT * FROM PET P
   LEFT JOIN MEMBER M ON P.MEMBER_ID = M.MEMBER_ID
   LEFT JOIN APPOINTMENT A ON P.PET_ID = A.PET_ID
   LEFT JOIN APPOINTMENT_TYPE T ON A.APP_TYPE_ID = T.APP_TYPE_ID
   WHERE 1=1";

   if($phone !== ''){
      // 根據選擇的看診類型，添加對應的條件
      $sql .= " AND M.PHONENO like ?";
   }

   if ($type !== 'default') {
      // 根據選擇的看診類型，添加對應的條件
      $sql .= " AND T.APPOINTMENT_TYPE_TITLE = ?";
   }
   
   $statement = $pdo->prepare($sql);
   $parameterIndex = 1;

   if($phone !== ''){

      $statement->bindValue($parameterIndex,"%".$phone."%");
      $parameterIndex++;
   }
   if ($type !== 'default') {
      $statement->bindValue($parameterIndex, $type);
      $parameterIndex++;
   }
   // $statement->bindValue(1,"%".$phone."%");
   // $statement->bindValue(2, $type);
   $statement->execute();

   $data = $statement->fetchAll();

   header('Content-Type: application/json');

   echo json_encode($data);

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

