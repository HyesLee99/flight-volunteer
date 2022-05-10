<?php
    session_start();
    include "./classes/dbh.classes.php";
    include "./classes/update.classes.php";
    include "./classes/update-contr.classes.php";

    $username = "";
    $email = "";
    $firstName = "";
    $lastName = "";
    $number = "";
    $savedSearch = null;
    $contacted = null;


    if (isset($_POST["username"])) {
        $username = $_POST["username"];
    } else {
        $username = $_SESSION["useruid"];
    }
    
    if (isset($_POST["email"])) {
        $email = $_POST["email"];
    } else {
        $email = $_SESSION["useremail"];
    }
    
    if (isset($_POST["firstname"])) {
        $firstName = $_POST["firstname"];
    } else {
        $firstName = $_SESSION["firstname"];
    }
    
    if (isset($_POST["lastname"])) {
        $lastName = $_POST["lastname"];
    } else {
        $lastName = $_SESSION["lastname"];
    }
    
    if (isset($_POST["number"])) {
        $number = $_POST["number"];
    } else {
        $number = $_SESSION["number"];
    }

    if (isset($_POST["savedSearch"])) {
        $savedSearch = json_decode($_SESSION["savedsearch"]);
        $target = json_decode($_POST["savedSearch"]);
        if ($_POST["action"] == "remove") {
            $savedSearch = json_encode(array_diff($savedSearch,$target));
        } else {
            $savedSearch = json_encode(array_merge($savedSearch, $target));
        }
    } else {
        $savedSearch = $_SESSION["savedsearch"];
    }

    if (isset($_POST["contacted"])) {
        $contacted = $_SESSION["contacted"];
        $target = $_POST["contacted"];
        if (isset($_POST["action"]) && $_POST["action"] == "add") {
            
            $contacted = json_encode(array_unique( array_merge(json_decode($contacted), json_decode($target)),SORT_REGULAR ));
        } else {
            $contacted = $target;
        }
    } else {
        $contacted = $_SESSION["contacted"];
    }
    
    $update = new UpdateContr($username, $email, $firstName, $lastName, $number, $savedSearch, $contacted);

    $update -> updateUser();

    $output = array();
    $output["Success"] = "Successfully updated!";
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
