<?php
include('conn.php');
include('upload.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

   $new_pet_phone = isset($_POST['new_pet_phone']) ? $_POST['new_pet_phone'] : '';
   $new_pet_name = isset($_POST['new_pet_name']) ? $_POST['new_pet_name'] : '';
   $new_pet_gender = isset($_POST['new_pet_gender']) ? $_POST['new_pet_gender'] : '';
   $new_pet_age = isset($_POST['new_pet_age']) ? $_POST['new_pet_age'] : '';
   $new_pet_category = isset($_POST['new_pet_category']) ? $_POST['new_pet_category'] : '';


   $sql = "SELECT MEMBER_ID FROM MEMBER WHERE PHONENO = ?";
   $statement = $pdo->prepare($sql);
   $statement->bindValue(1, $new_pet_phone);
   $statement->execute();
   $memberID = $statement->fetchColumn();
   
if($memberID){

   $sql = "INSERT INTO PET (PET_NAME, PET_GENDER, PET_CATAGORY, PET_AGE, MEMBER_ID, CREATEDATE) VALUES (?, ?, ?, ?, ?,NOW())";

   $statement = $pdo->prepare($sql);
   $statement->bindValue(1, $new_pet_name);
   $statement->bindValue(2, $new_pet_gender);
   $statement->bindValue(3, $new_pet_category);
   $statement->bindValue(4, $new_pet_age);
   $statement->bindValue(5, $memberID);
   $statement->execute();

   $petID = $pdo->lastInsertId();

   $filePath = getPetPath($memberID, $petID).$_FILES["pet_pic"]["name"];

   $fileName = "./img/member/". $memberID ."/". $petID . "/".$_FILES["pet_pic"]["name"];

   if (move_uploaded_file($_FILES["pet_pic"]["tmp_name"], $filePath)){

      $sql = "UPDATE PET SET PET_AVATAR = ? WHERE PET_ID = ?";

         $statement = $pdo->prepare($sql);
         $statement->bindValue(1, $fileName);
         $statement->bindValue(2, $petID);
         $statement->execute();


      echo "新增成功!";

   }else {

      echo "新增失敗!";
        
   } 
 } 

   



?>