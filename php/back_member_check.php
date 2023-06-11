<?php
    include("member_session.php");    
    ini_set("display_errors", "On");
    
   header("Access-Control-Allow-Origin: * ");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");
    //回傳session檢查結果
    

    //取得Session(後台專用)
    function getSessionB(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            
            session_start(); 
        }

        //有登入session->回傳ID，無登入session->回傳空字串""
        return isset($_SESSION["USER_ID"]) ? $_SESSION["USER_ID"] : "";             

    }
?>