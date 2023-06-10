<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
// ini_set("display_errors", "On");

session_start();
if (isset($_SESSION["MemberID"])) {
    echo $_SESSION["MemberID"];
} else {
    echo "notlogin";
}

// include("../lib/Member.php");
// getMemberID();

// 先判斷session是否存在
// if (!isset($_SESSION)) {
//     session_start();
// }

// // //有登入session->回傳ID，無登入session->回傳空字串""
// echo isset($_SESSION["MemberID"]) ? $_SESSION["MemberID"] : "notlogin";

// echo "22";
// echo "notlogin";
?>