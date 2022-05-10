<?php
    class UpdateContr extends Update {
        private $uid;
        private $email;
        private $firstName;
        private $lastName;
        private $number;
        private $savedSearch;
        private $contacted;


        public function __construct($uid, $email, $firstName, $lastName, $number, $savedSearch, $contacted ) {
            // username 
            $this->uid = $uid;
            
            // useremail 
            $this->email = $email;
            
            // firstname 
            $this->firstName = $firstName;
            
            // lastname 
            $this->lastName = $lastName;
            
            // number 
            $this->number = $number;
            
            // save_search
            $this->savedSearch = $savedSearch;

            // contacted
            $this->contacted = $contacted;
        }

        public function updateUser() {
            if (!$this -> uidTakenCheck()) {
                $output = array();
                $output["Failed"] = "Username or email is already taken";
                header("Content-Type: application/json");
                die(json_encode($output));
            } 
            $this -> updateUserAccount($this->uid, $this->email,$this->firstName,$this->lastName,$this->number, $this->savedSearch, $this->contacted);
        }

        private function uidTakenCheck() {
            return $this -> checkUser($this->uid, $this->email); 
        }
    }
?>