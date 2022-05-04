<?php
    class SignupContr extends Signup {
        private $uid;
        private $pwd;
        private $email;

        // Construct signupcontr that contains username, password, and email
        public function __construct($uid, $pwd, $email) {
            $this->uid = $uid;
            $this->pwd = $pwd;
            $this->email = $email;
        }

        // Create user account with username, password, and email          
        public function signupUser() {
            if (!$this -> uidTakenCheck()) {
                $output = array();
                $output["Failed"] = "Username or email is already taken";
                header("Content-Type: application/json");
                die(json_encode($output));
            } 
            $this -> setUser($this->uid, $this-> pwd, $this-> email);
        }

        // Check if there exists any account with username and email
        // return value: boolean
        private function uidTakenCheck() {
            return $this -> checkUser($this->uid, $this->email); 
        }
    }
?>