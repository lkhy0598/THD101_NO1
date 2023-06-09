<?php
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");

	// include(__DIR__ . '/../lib/Member.php');
    include('../lib/Member.php');
    // include('http://localhost/THD101_NO1//lib/Member.php');

    //清空session
    clearSession();

    // echo "<script>alert('登出成功!\n' + '將跳轉回首頁\n');</script>";  

    echo "登出成功！\n";
    echo "將跳轉回首頁\n";

?>