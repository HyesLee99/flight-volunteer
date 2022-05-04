
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
        $rows = $db ->query("SELECT * FROM `doglist` WHERE dogs_departure = '".$from."'");
    } catch (PDOException $ex) {
        db_error_message("Can not query the database", $ex);
    }


    header("Content-Type: application/json");
    $output = array();
    foreach($rows as $row) {
        $destination = $row["dogs_destination"];
        $arr = explode(",", $destination);
        foreach ($arr as $place) {
            if ($place == $to) { // if there are 7 days before the flight 
                $item = array();
                $item["name"] = $row["dogs_name"];
                $item["departure"] = $row["dogs_departure"];
                $item["destination"] = $row["dogs_destination"];
                $item["date"] = $row["dogs_date"];
                $item["airline"] = $row["dogs_airline"];
                $item["comment"] = $row["dogs_info"];
                $item["photo"] = $row["dogs_photo"];
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
