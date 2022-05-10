<?php
    session_start();

    $savedSearch;
    $contacted;


    // instead of using session, go fetch using sql query
    if (isset($_SESSION["savedsearch"])) {
        $savedSearch = $_SESSION["savedsearch"];
        
    } else {
        $savedSearch = array();
    }

    if (isset($_SESSION["contacted"])) {
        $contacted = $_SESSION["contacted"];
    } else {
        $contacted = array();
    }

    $output = array();
    $output["savedsearch"] = $savedSearch;
    $output["contacted"] = $contacted;
    
    header("Content-Type: application/json");
    print(json_encode($output));
?>