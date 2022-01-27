<?php
    $name= $_Post['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = 'EasyTutorial@gmail.com'
    $email_subject = "New form submission";
    $email_body = "User Name: $name. \n",
                    "User Email: $visitor_email. \n",
                    "User Message: $message. \n";
    $to = "devTesting0126@gmail.com";

    $header = "From: $email_form \r\n";

    $headers .= "Reply-To: $visitor_email \r\n";
    mail(Sto, $email_subject, $email_body, $headers);
    header("Location: index.html");
 
?>

