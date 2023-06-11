<?php
	// session_start();

	// header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");

	// include('http://localhost/THD101_project/lib/Member.php');
	include('../lib/Member.php');
	// include(__DIR__ . '../lib/Member.php');

	//顯示會員資訊
    $str = getMemberID();
	echo $str == "" ? "<a herf='' class='LOGIN' onclick='LOGIN()'><i class='bi bi-person-fill'></i>登入</a>" : "<a herf='' class='LOGOUT' onclick='logoutSub()' ><i class='bi bi-person-fill'></i>登出</a>";
	
	

?>