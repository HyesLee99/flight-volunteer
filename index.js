/**
 * 
 * @param {*} name 
 * @returns 
 */
"use strict";

(function() {
    
    //const mobile_menu = qs('.header .nav-bar .nav-list ul');
    //const header = qs('.header .container');
    window.addEventListener('load', init);
    
    function init() {
        $("listings").style.display= "none";
        $("search-lists").addEventListener("click", search);
        let hamburger = qs('.hamburger');
        hamburger.addEventListener("click", hamburgerClick);
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

    function eraseAll() {

    }

    function eraseAll(arr) {
         for(let i = 0; i < arr.length; i++) {
             arr[i].parentElement.removeChild(arr[i]);
         }
    }

})();




