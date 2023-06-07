<?php

function getMemberPath() {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   $filePath = "/THD101_NO1/Upload/member/";
   $fullPath = $ServerRoot . $filePath;

   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }

   return $fullPath;
   
}

function getPetPath(){        

   //Apache實際的根目錄路徑
   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

   //Apache根目錄之下的檔案存放路徑
   $filePath = "/THD101_NO1/Upload/pet/";
   
   return $ServerRoot.$filePath;

}

function getNewsPath(){        

   //Apache實際的根目錄路徑
   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

   //Apache根目錄之下的檔案存放路徑
   $filePath = "/THD101_NO1/Upload/news/";
   
   return $ServerRoot.$filePath;

}

function getMessagePath() {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   $filePath = "/THD101_NO1/Upload/message/";
   $fullPath = $ServerRoot . $filePath;

   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }

   return $fullPath;

}

?>