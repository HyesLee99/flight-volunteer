<?php
    session_start();
    error_reporting(E_ALL);
    ini_set("display_errors", "On");

    class Update extends Dbh {
        /**
         * Update user account with given username, email, first and last name, phone number, saved search, and contacted lists 
         * parameters:
         *      $uid: string, username 
         *      $email: string, email
         *      $firstName: string, firstname 
         *      $lastName: string, lastname
         *      $number: string, phone number
         *      $savedSearch: JSON, lists of saved search 
         *      $contacted: JSON, contacted lists 
         *  
         * */
        protected function updateUserAccount($uid, $email, $firstName, $lastName, $number, $savedSearch, $contacted) {

            $dbh = $this-> connect();
            
            $stmt = $dbh ->prepare('UPDATE users SET users_uid = ?, users_email = ?, firstname = ?, lastname = ?, phone_number = ?, saved_search = ?, contacted = ? WHERE users_uid = ?');

            if (!$stmt-> execute(array($uid, $email, $firstName, $lastName, $number, $savedSearch, $contacted, $uid))) {
                $stmt = null;
                
                $output = array();
                $output["Failed"] = "error occurred. Please try again later.";
                
                header("Content-Type: application/json");
                die(json_encode($output)); 
            }

            $_SESSION["useruid"] = $uid;
            $_SESSION["useremail"] = $email;
            $_SESSION["firstname"] = $firstName;
            $_SESSION["lastname"] = $lastName;
            $_SESSION["number"] = $number;
            $_SESSION["savedsearch"] = $savedSearch;
            $_SESSION["contacted"] = $contacted;
            $stmt = null;
        }

        /**
         * Check if there exists any user with given username and email address. 
         * If the given username and email are exactly same as current username and email, it is valid username and email
         * parameters:
         *      $uid: string, username 
         *      $email: string, email
         * return value: boolean
         * */
        protected function checkUser($uid, $email) {
            // no connect function so check it with pdo 
            $stmt = "";
            $executeResult = "";
            $dbh = $this->connect();
            if ($uid == $_SESSION["useruid"] && $email == $_SESSION["useremail"] ) {
                return true;
            } else if ($uid == $_SESSION["useruid"]) {
                $stmt = $dbh->prepare('SELECT users_uid FROM users WHERE users_email = ?;');
                $executeResult = $stmt-> execute(arry($email));
            } else if ($email == $_SESSION["useremail"]) {
                

                $stmt = $dbh->prepare('SELECT users_uid FROM users WHERE users_uid = ?;');
                $executeResult = $stmt-> execute(array($uid));
            } else {
                $stmt = $dbh->prepare('SELECT users_uid FROM users WHERE users_uid = ? OR users_email = ?;');
                $executeResult = $stmt-> execute(array($uid, $email));
            }
            if (!$executeResult) {
                $stmt = null; 
                $output = array();
                $output["Failed"] = "error occurred. Please try again later.";
                
                header("Content-Type: application/json");
                die(json_encode($output)); 
            }

            $output = array();
                $output["Success"] = $uid. " ". $_SESSION["userid"];
                header("Content-Type: application/json");
                die(json_encode($output));

            return ($stmt -> rowCount() <= 0); 
        }
    }
?>