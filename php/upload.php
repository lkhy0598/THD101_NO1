<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function getMemberPath($memberID) {

   // global $pdo;

   // $memberID = $pdo->lastInsertId();

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   
   $filePath = "/THD101_NO1/img/member/" . $memberID ."/"; //本地
   // $filePath = "../dist/img/Upload/" . $memberID ."/member/"; //server

   $fullPath = $ServerRoot . $filePath;
   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }
   return $fullPath;
}
function getPetPath(){        
   global $pdo;
   //Apache實際的根目錄路徑
   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

   //Apache根目錄之下的檔案存放路徑
   $filePath = "/THD101_NO1/img/member/". $memberID ."/".$petID;
   
   return $ServerRoot.$filePath;
   if (!file_exists($fullPath)) {
      mkdir($fullPath, 0777, true); // 設置適當的權限
  }
  return $fullPath;
}
function getNewsPath(){        

   //Apache實際的根目錄路徑
   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

   //Apache根目錄之下的檔案存放路徑
   $filePath = "/THD101_NO1/Upload/news/";
   
   return $ServerRoot.$filePath;

}


?>