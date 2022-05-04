<?php
    $host = "localhost";
    $port = "3307";
    $user = "root";
    $password = "root";
    $dbname = "flight_volunteer";

    $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";
    
    //Creating PDO to connect to mysql
    try{
        $db = new PDO($ds, $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $ex) {
        db_error_message("Error connecting to the database", $ex);
    }

    function error_message($msg) {
        header("HTTP/1.1 400 Invalid Request");
        header("Content-Type: text/plain");
        die($msg);
    }
    
    function db_error_message($msg, $ex) {
        global $debug;
    
        header("HTTP/1.1 503 Internal Database Error");
        header("Content-Type: text/plain");
        # note that we don't want a user to see internal errors for our db
        # (debug should be removed or false in a published website)
    
        if ($debug) {
          $msg .= "\n Error details: $ex \n";
        }
        die($msg);
    }
?>