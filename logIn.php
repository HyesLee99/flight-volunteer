<?php
    include 'common.php';

    session_start();
    // username nad passwords are all trimed and validated 
    $username = $_POST["username"];
    $password = $_POST["password"];
    if(isset($_SESSION["LOGGEDIN"]) && $_SESSION["LOGGEDIN"] === true) {
        header("location: welcome.php");
        exit; // not sure if this part works on js
    }

    $sql = "INSERT INTO users (username, password) VALUES (".$username.",".$password.")";
    $stmt = $db->prepare($qry);
    $params = array(

    ); 
    
?>