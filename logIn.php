<?php
    include "./classes/dbh.classes.php";
    include "./classes/login.classes.php";
    include "./classes/login-contr.classes.php";

    //session_start();
    // username nad passwords are all trimed and validated 
    $username = $_POST["username"];
    $password = $_POST["password"];

    $login = new LoginContr($username, $password);
    $login -> loginUser();
    
?>