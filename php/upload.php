<?php

header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function getMemberPath($memberID) {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   
   // $filePath = "/THD101_NO1/img/member/" . $memberID ."/"; //本地
   // $filePath = " https://tibamef2e.com/thd101/g1/dist/img/member/" . $memberID ."/"; //server
   $filePath = "./img/member/" . $memberID ."/"; //server

   // $fullPath = $_SERVER["DOCUMENT_ROOT"] . "/THD101_NO1/dist/img/member/" . $memberID ."/";

   $fullPath = $ServerRoot . $filePath;
   // $fullPath = $filePath;
   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {

       mkdir($fullPath, 0777, true); // 設置適當的權限
   }
   return $fullPath;
   
}

function getPetPath($memberID, $petID){        
   
   //Apache實際的根目錄路徑
   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

   //Apache根目錄之下的檔案存放路徑
   // $filePath = "/THD101_NO1/img/member/". $memberID ."/". $petID ."/";
   // $filePath = " https://tibamef2e.com/thd101/g1/dist/img/member/" . $memberID ."/".$petID ."/";
   $filePath = " ./img/member/" . $memberID ."/".$petID ."/";
   
   $fullPath = $ServerRoot . $filePath;

   if (!file_exists($fullPath)) {
      mkdir($fullPath, 0777, true); // 設置適當的權限
  }
  return $fullPath;
}

function getMessagePath($news_type) {

   $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
   // $filePath = "/THD101_NO1/img/information/" . $news_type ."/";
   // $filePath = "https://tibamef2e.com/thd101/g1/dist/img/information/" . $news_type . "/"; //server
   $filePath = "./img/information/" . $news_type . "/"; //server
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
   $filePath = "./img/shopping_list/" . $commodity_type . "/" . $commodity_folder . "/"; //server
   $fullPath = $ServerRoot . $filePath;

   // 檢查目錄是否存在，如果不存在，則建立目錄
   if (!file_exists($fullPath)) {
       mkdir($fullPath, 0777, true); // 設置適當的權限
   }

   return $fullPath;
}