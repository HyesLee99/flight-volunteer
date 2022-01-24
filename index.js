/**
 * 
 * @param {*} name 
 * @returns 
 */
"use strict";

(function() {

    window.addEventListener('load', init);
    
    function init() {
        $("listings").style.display= "none";
        $("search-lists").addEventListener("click", search);

    }

    function search() {
        let from = $("departure").value;
        let to =  $("to").value;
        let date = $("depart").value;
        let airline = $("airline").value;
        console.log(from + " " + to + " " + date + " " + airline);
        //get 
        $("listings").style.display="contents";
        $("section-explain").style.display="none";
        $("section-contact").style.display="none";
        $("section-process").style.display="none";
        $("hero").style.display="none";
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

})();




