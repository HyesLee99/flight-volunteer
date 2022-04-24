
<?php 
    //"Content-type: type/subtype"); // content- tpe: application/json

    // returning the search result
    include 'common.php';
    
    $from = $_GET["from"];
    $from = strtolower($from);
    $to = $_GET["to"];
    $to = strtolower($to);
    $date = $_GET["date"];
    $airline = $_GET["airline"];
    $airline = strtolower($airline);
    

    // Select all the rows from the table
    try {
        $rows = $db ->query("SELECT * FROM `doglist` WHERE departure = '".$from."'");
    } catch (PDOException $ex) {
        db_error_message("Can not query the database", $ex);
    }


    header("Content-Type: application/json");
    $output = array();
    foreach($rows as $row) {
        $destination = $row["destination"];
        $arr = explode(",", $destination);
        foreach ($arr as $place) {
            if ($place == $to) {
                $item = array();
                $item["name"] = $row["name"];
                $item["departure"] = $row["departure"];
                $item["destination"] = $row["destination"];
                $item["date"] = $row["date"];
                $item["airline"] = $row["airline"];
                $item["comment"] = $row["info"];
                array_push($output, $item);
                break;
            }
        }
        
    }
    print(json_encode($output));





// $_GET, $_POST?
// searching request: from -> to, 
//                    whether the date is in the range 
//                    does the airline allow the animal to go into cargo, or cabin 
//                    get appropriate data from database

?>
