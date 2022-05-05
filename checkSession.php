<?php
     $output = array();
     header("content-type: application/json");
     if (isset($_SESSION["userid"])) { //($_SESSION["useruid"] != null) {
        $output["True"] = "There is a session";
        $output["userid"] = $_SESSION["userid"];
        $output["useruid"] = $_SESSION["useruid"];
        $output["useremail"] = $_SESSION["useremail"];
     } else {
        $output["False"] = "There is no existing session";
     }
     print(json_encode($output));

     function is_session_started(){
        if ( php_sapi_name() !== 'cli' ) {
            if ( version_compare(phpversion(), '5.4.0', '>=') ) {
                return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
            } else {
                return session_id() === '' ? FALSE : TRUE;
            }
        }
        return FALSE;
    }
?>
