<?php
    include("member_session.php");    
    
   header("Access-Control-Allow-Origin: * ");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");
    //回傳session檢查結果
    echo getSessionB();
?>