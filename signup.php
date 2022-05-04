<?php
    include "./classes/dbh.classes.php";
    include "./classes/signup.classes.php";
    include "./classes/signup-contr.classes.php";

    // getting the data 
     
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];

    // Instantiate signup class 
    $signup = new SignupContr($username, $password, $email);
    
    
    $signup -> signupUser();

    $output = array();
    $output["Success"] = "You have signed up successfully!";
    header("Content-Type: application/json");
    print(json_encode($output));
?>