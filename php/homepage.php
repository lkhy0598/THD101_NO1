<?php
    ini_set("display_errors", "On");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    include('connServer.php');
    // include('conn.php');
    // ==================================

    $sql = "SELECT * FROM LATEST_NEWS";

    $statement = $pdo->query($sql);


    $data = $statement->fetchAll();
    
    echo json_encode($data);


?>