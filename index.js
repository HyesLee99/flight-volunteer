/**
 * 
 * @param {*} name 
 * @returns 
 */

//https://www.youtube.com/watch?v=euAWvO_es6s
// Instagram access token:   IGQVJWV3NzZAF8yVDRGQ28wSUZAEa3V4TzM0NXBJdGRXYkJaWFEzMUhicHUxVlpjbFZATbGNlTF8xTjVXRnc4czl6OUJDSUViSVNtY0U3TnY0QThNY1JJOGcxcE0wSmlPNjcyLXQyS2JhU2poQW02RzhxOQZDZD
const header = document.querySelector('.header.container');



"use strict";
   
(function() {
    const myEmail = "";
    //const mobile_menu = qs('.header .nav-bar .nav-list ul');
    window.addEventListener('load', init);
    
    function init() {
        let header = qs('.header.container');
        let menuItem = qsa('.header #nav-bar .nav-list ul li a h1');
        $("listings").style.display= "none";
        $("search-lists").addEventListener("click", search);
        let hamburger = qs('.hamburger');
        hamburger.addEventListener("click", hamburgerClick);
        document.addEventListener('scroll', ()=>{
            let scroll_position = window.scrollY;
            if(scroll_position > 250){
                header.style.backgroundColor =  "#FFC06E";

            } else {
                header.style.backgroundColor = "transparent" ;
            }
        })
        $("send-button").addEventListener("click", sendEmail);

        menuItem.forEach((item)=>{
            item.addEventListener("click", hamburgerClick);
        })
    }

    function search() {
        let from = $("departure").value;
        let to =  $("to").value;
        let date = $("depart").value;
        let airline = $("airline").value;
        console.log(from + " " + to + " " + date + " " + airline);
        //get 
        $("listings").style.display="inline";
        $("section-explain").style.display="none";
        $("section-contact").style.display="none";
        $("section-process").style.display="none";
        $("hero").style.display="none";

        $("departure").value = "";
        $("to").value = "";
        $("depart").value = "";
        $("airline").value ="";
        
        // eventListener when clicked title, or any nav bars

        qs(".brand").addEventListener("click",showHomePage);
        $("nav-home").addEventListener("click",showHomePage);
        $("nav-about").addEventListener("click",showHomePage);
        $("nav-proc").addEventListener("click",showHomePage);
        $("nav-contact").addEventListener("click",showHomePage);
    }

    function hamburgerClick() {
        this.classList.toggle('active');
        qs(".nav-list ul").classList.toggle('active');
    }

    function showHomePage() {
        $("listings").style.display="none";
        $("section-explain").style.display="block";
        $("section-contact").style.display="block";
        $("section-process").style.display="block";
        $("hero").style.display="block"; // why this is only block? 
    }

    function sendEmail() {
        let contactInfo = qsa('.contact-input input');
        let message = $("message-input").value;
        let name = contactInfo[0].value;
        let emailAdd = contactInfo[1].value;
        let number = contactInfo[2].value; 
        // use ajax? to send the email 
        alert("Sent!");
        for (let i= 0; i < contactInfo.length; i++) {
            contactInfo[i].value = "";
        }
        // $("message-input").value = "";
//iommoyehnqhbjnhy
        // code to send email. 
        // Email.send({
        //     //secureToken: "c06710eb-be8a-4980-a13a-1fc767cf0bd3",
        //     Host : "smtp.gmail.com", // need to find another smtp
        //     Username : "devtesting0126@gmail.com",
        //     Password : "devtesting1111!",
        //     To : "devtesting0126@gmail.com",
        //     From : emailAdd,
        //     Subject : "Test email",
        //     Body : message
        // }).then(
        //     message => alert(message)
        // );
    }


    //example:  element.addEventListener("click", function );

    //Functions 

    function $(name) {
        return document.getElementById(name);
    }

    function qs(name) {
        return document.querySelector(name);
    }

    function qsa(name) {
        return document.querySelectorAll(name);
    }

    function eraseAll(arr) {
         for(let i = 0; i < arr.length; i++) {
             arr[i].parentElement.removeChild(arr[i]);
         }
    }

})();




