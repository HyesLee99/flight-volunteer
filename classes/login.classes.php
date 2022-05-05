<?php
    error_reporting(E_ALL);
    ini_set("display_errors","On");

    class Login extends Dbh {
        protected function findUser($uid, $pwd) {

            $dbh = $this->connect();
            $stmt = $dbh->prepare("SELECT users_pwd FROM users WHERE users_uid = '".$uid."'");

            if (!$stmt-> execute()) {
                $stmt = null;
                $output = array();
                $output["Failed"] = "Error occurred. Please try again later";
                header("Content-Type: application/json");
                die(json_encode($output)); 
            }
            

            if ($stmt -> rowCount() == 0) {
                $stmt = null;
                $output = array();
                $output["Failed"] = "Login failed: Please check your username and password";
                header("content-type: application/json");
                die(json_encode($output));
            } 
            
            $pwdHashed = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            
            

            $checkPwd = password_verify($pwd ,$pwdHashed[0]["users_pwd"]);

            if (!$checkPwd) { 
                $stmt = null;
                $output = array();
                $output["Failed"] = "Error occurred. Please try again later.";
                header("Content-Type: application/json");
                die(json_encode($output)); 
            } else if ($checkPwd) {
                $stmt = $dbh ->prepare("SELECT * FROM users WHERE users_uid = ? AND users_pwd = ?;");

                if (!$stmt->execute(array($uid, $pwdHashed[0]["users_pwd"]))) {
                    $stmt = null;
                    $output = array();
                    $output["Failed"] = "error occurred. Please try again later";
                    header("Content-Type: application/json");
                    die(json_encode($output)); 
                }
    
                if ($stmt -> rowCount() == 0) {
                    $stmt = null;
                    $output = array();
                    $output["Failed"] = "Login failed: Please check your username and password";
                    header("content-type: application/json");
                    die(json_encode($output));
                } else {

                    $user = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                    session_start();
                    $_SESSION["userid"] = $user[0]["users_id"];
                    $_SESSION["useruid"] = $user[0]["users_uid"];
                    $stmt = null;
                    $output = array();
                    $output["Success"] = "Login successful";
                    $output["username"] = $user[0]["users_uid"];
                    $output["email"] = $user[0]["users_email"];
                    
                    header("content-type: application/json");
                    print(json_encode($output));
                }
            }
        }
    }
?>
