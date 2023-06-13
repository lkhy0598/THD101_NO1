<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");


function getMessagePath($news_type) {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   // $filePath = "/THD101_NO1/img/information/" . $news_type ."/";
   // $filePath = "https://tibamef2e.com/thd101/g1/dist/img/information/" . $news_type . "/"; //server
   $filePath = "../dist/img/information/" . $news_type . "/"; //server
   $fullPath = $ServerRoot . $filePath;

   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }

   return $fullPath;
}

function getCommodityPath($commodity_type , $commodity_folder) {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   // $filePath = "/THD101_NO1/img/shopping_list/" . $commodity_type . "/" . $commodity_folder . "/";
   // $filePath = "https://tibamef2e.com/thd101/g1/dist/img/shopping_list/" . $commodity_type . "/" . $commodity_folder . "/"; //server
   $filePath = "../dist/img/shopping_list/" . $commodity_type . "/" . $commodity_folder . "/"; //server
   $fullPath = $ServerRoot . $filePath;

   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }

   return $fullPath;
}