<?php
    //session_start();
    include "./classes/dbh.classes.php";
    include "./classes/login.classes.php";
    include "./classes/login-contr.classes.php";

    //session_start();
    // username nad passwords are all trimed and validated 
    $username = $_POST["username"];
    $password = $_POST["password"];

    $login = new LoginContr($username, $password);
    $login -> loginUser();
    
    $output = array();
    $output["Success"] = "Logged in successfully!";
    $output["userid"] = $_SESSION["userid"];
    $output["useruid"] = $_SESSION["useruid"];
    $output["useremail"] = $_SESSION["useremail"];
    $output["firstname"] = $_SESSION["firstname"];
    $output["lastname"] = $_SESSION["lastname"];
    $output["number"] = $_SESSION["number"];
    $output["savedsearch"] = $_SESSION["savedsearch"];
    $output["contacted"] = $_SESSION["contacted"];
    
    header("Content-Type: application/json");
    print(json_encode($output));
?>