<?php
    error_reporting(E_ALL);
    ini_set("display_errors","On");

    class Signup extends Dbh {

        /**
         * Create user account in database with given username, password, and email 
         * parameters:
         *      $uid: string, username 
         *      $pwd: string, password
         *      $email: string, email
         * */
        protected function setUser($uid, $pwd, $email) {

            $dbh = $this-> connect();
            $stmt = $dbh ->prepare('INSERT INTO users (users_uid, users_pwd, users_email, firstname, lastname, phone_number,saved_search, contacted) VALUES (?,?,?,?,?,?,?,?);');
            
            $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
            $arr = array();
            if (!$stmt-> execute(array($uid, $hashedPwd, $email, "", "", "", json_encode($arr),json_encode($arr)))) {
                $stmt = null;
                
                $output = array();
                $output["Failed"] = "error occurred. Please try again later.";
                
                header("Content-Type: application/json");
                die(json_encode($output)); 
            }
            $stmt = null;
        }

        /**
         * Check if there exists any user with given username and email address
         * parameters:
         *      $uid: string, username 
         *      $email: string, email
         * return value: boolean
         * */
        protected function checkUser($uid, $email) {
            // no connect function so check it with pdo 
            $dbh = $this->connect();
            $stmt = $dbh->prepare('SELECT users_uid FROM users WHERE users_uid = ? OR users_email = ?;');
            if (!$stmt-> execute(array($uid, $email))) {
                $stmt = null; // delete the statement
                $output = array();
                $output["Failed"] = "error occurred. Please try again later.";
                
                header("Content-Type: application/json");
                die(json_encode($output)); 
            }

            return ($stmt -> rowCount() <= 0); 
            
        }
    }
?>