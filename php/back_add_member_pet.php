<?php
ini_set("display_errors", "On");
include('conn.php');
// include('connServer.php');

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");
// header('Content-Type: application/json');

$newmember_name = isset($_POST['newmember_name']) ? $_POST['newmember_name'] : '';
$newmember_phone = isset($_POST['newmember_phone']) ? $_POST['newmember_phone'] : '';
$newmember_email = isset($_POST['newmember_email']) ? $_POST['newmember_email'] : '';
$newmember_address = isset($_POST['newmember_address']) ? $_POST['newmember_address'] : '';

//建立SQL

$phoneExists = false;
$sql = "SELECT * FROM MEMBER WHERE PHONENO = ?";
$statement = $pdo->prepare($sql);
$statement->bindValue(1, $newmember_phone);
$statement->execute();
if ($statement->rowCount() > 0) {
   $phoneExists = true;
}

if ($phoneExists) {
   echo"電話號碼已存在";
}
$mailExists = false;
$sql = "SELECT * FROM MEMBER WHERE EMAIL = ?";
$statement = $pdo->prepare($sql);
$statement->bindValue(1, $newmember_email);
$statement->execute();
if ($statement->rowCount() > 0) {
   $phoneExists = true;
}

if ($phoneExists) {
   echo"電子信箱已存在";
}
    
$sql = "INSERT INTO MEMBER (NAME, PHONENO, EMAIL, ADDRESS, PASSWORD, CREATE_DATE) VALUES (?, ?, ?, ?, ?, CURDATE())";

$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $newmember_name);             
$statement->bindValue(2 , $newmember_phone);
$statement->bindValue(3 , $newmember_email);
$statement->bindValue(4 , $newmember_address);
$statement->bindValue(5 , $newmember_phone);

// $statement->execute();
if (!$statement->execute()) {
   echo 'fail';
}

$memberID = $pdo->lastInsertId(); // 获取刚插入的会员ID

if($_FILES["member_pic"]["error"] > 0 ){
   echo "上傳失敗: ".$_FILES["member_pic"]["error"];

}else{

   //取得上傳的檔案資訊=======================================
   $fileName = $_FILES["member_pic"]["name"];    
   $filePath_Temp = $_FILES["member_pic"]["tmp_name"];  

   //=======================================================

   $Path = "../dist/img/member/" . $memberID ."/"; //server
// $filePath = "../dist/img/member/"; //server

   if (!is_dir($Path)) {

      mkdir($Path, 0777, true); // 設置適當的權限
   }
}
//欲放置的檔案路徑up
   $filePath = $Path . $fileName;
// $fileName = "./img/member/". $memberID ."/".$_FILES["member_pic"]["name"];

//將暫存檔搬移到正確位置
if (move_uploaded_file($filePath_Temp, $filePath)) {

   $sql = "UPDATE MEMBER SET MEMBER_AVATAR = ? WHERE MEMBER_ID = ?";
    //執行
   $statement = $pdo->prepare($sql);
   $statement->bindValue(1, $fileName);
   $statement->bindValue(2, $memberID);
   $affectedRow = $statement->execute();

   if ($affectedRow > 0) {
      echo "新增成功";
  } else{
   echo "新增失敗";
  }                      
   

} else { 

   echo "拷貝/移動上傳圖片失敗!";      
}    

?>
