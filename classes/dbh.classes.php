<?php

class Dbh {
    
    // Connects to the database and return the PDO
    protected function connect() {
        $host = "localhost";
        $port = "3307";
        $user = "root";
        $password = "root";
        $dbname = "flight_volunteer";
        
        $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";
        $dbh;
        
        try{
            $dbh = new PDO($ds, $user, $password);
           $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbh;
        } catch (PDOException $ex) {
            $output = array();
            $output["result"] = "failed: " . $ex;
            
            header("Content-Type: application/json");
            die(json_encode($output)); 
        }
    }
    
}

?>