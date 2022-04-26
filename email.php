<?php
    include 'common.php';
    
    header('Content-Type: application/json');

    $name = $_POST["name"];
    $emailAdd = $_POST["e-address"];
    $number = $_POST["number"];
    $msg = $_POST["msg"];
    $to = "mymanager2021@gmail.com";
    $subject = "Contact us";
    ini_set('sendmail_from', $emailAdd);

    $message = "Name: ". $name."<br>";
    $message .= "Email: ". $emailAdd."<br>";
    $message .= "Number: ". $number. "<br>";
    $message .= "Message: ". $msg. "<br>";
    $retval = mail($to, $subject, $message);

    // message notification 
    if ($retval==true) {
        print(json_encode(array(
            'success' => true,
            'message' => 'Message sent successfully'
        )));
    } else {
        print(json_encode(array(
            'error' => true,
            'message' => 'Error sending message'
        )));
    }

?>