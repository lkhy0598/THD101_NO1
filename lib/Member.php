<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

//清除Session
function clearSession()
{

    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    session_unset();
    session_destroy();
}

//--------------------------------------後台專用--------------------------------------

//取得Session(後台專用)
function getSessionB()
{

    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    //有登入session->回傳ID，無登入session->回傳空字串""
    return isset($_SESSION["BackendUserID"]) ? $_SESSION["BackendUserID"] : "";
}

//寫入Session(後台專用)
function setSessionB($UserID)
{

    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    $_SESSION["BackendUserID"] = $UserID;
}

//--------------------------------------前台專用--------------------------------------

//取得會員ID(前台專用)
function getMemberID()
{

    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    //有登入session->回傳ID，無登入session->回傳空字串""
    return isset($_SESSION["MemberID"]) ? $_SESSION["MemberID"] : "";
}

//取得會員名稱(前台專用)
function getMemberName()
{

    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    //有登入session->回傳Name，無登入session->回傳空字串""
    return isset($_SESSION["MemberName"]) ? $_SESSION["MemberName"] : "";
}

//寫入Session(前台專用)
function setMemberInfo($MemberID, $MemberName)
{
    // clearSession();
    //先判斷session是否存在
    if (!isset($_SESSION)) {
        session_start();
    }

    //Table 'mydb'裡的MEMBER_ID欄位值
    $_SESSION["MemberID"] = $MemberID;

    //Table 'mydb'裡的NAME欄位值
    $_SESSION["MemberName"] = $MemberName;
}
?>