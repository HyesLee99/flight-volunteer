<?php
    class LoginContr extends Login {
        private $uid;
        private $pwd;

        public function __construct($uid, $pwd) {
            $this-> uid = $uid;
            $this-> pwd = $pwd;
        }

        public function loginUser() {
            $this -> findUser($this->uid, $this->pwd);
        }
    }
?>