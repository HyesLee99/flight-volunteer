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
        $("search-list-1").addEventListener("click", search);
        $("search-list-2").addEventListener("click", search);
        let hamburger = qs('.hamburger');
        hamburger.addEventListener("click", hamburgerClick);
        document.addEventListener('scroll', ()=>{
            let scroll_position = window.scrollY;
            if(scroll_position > 10){
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

    // fetch the search result and list them on the page
    function search() {
        let from = "";
        let to = "";
        let date = "";
        let airline = "";
        if (this.id == "search-list-1") {
            from = $("departure-1").value;
            to =  $("to-1").value;
            date = $("depart-1").value;
            airline = $("airline-1").value;
            $("departure-2").value = from;
            $("to-2").value = to;
            $("depart-2").value = date;
            $("airline-2").value = airline;
        } else {
            from = $("departure-2").value;
            to =  $("to-2").value;
            date = $("depart-2").value;
            airline = $("airline-2").value;
        }
        if (from == "" || to == "" || date == "") {
            alert("Please enter departure, destination, and date.");
            return "";
        }
        $("departure-1").value = "";
        $("to-1").value = "";
        $("depart-1").value = "";
        $("airline-1").value = "";
        // change the page 
        $("listings").style.display="inline";
        $("section-explain").style.display="none";
        $("section-contact").style.display="none";
        $("section-process").style.display="none";
        $("hero").style.display="none";

        // eventListener when clicked title, or any nav bars
        qs(".brand").addEventListener("click",showHomePage);
        $("nav-home").addEventListener("click",showHomePage);
        $("nav-about").addEventListener("click",showHomePage);
        $("nav-proc").addEventListener("click",showHomePage);
        $("nav-contact").addEventListener("click",showHomePage);
        let rows = qsa(".item");
        eraseAll(rows);
        console.log($("no-dogs") );
        if ($("no-dogs") != null) {
            $("no-dogs").parentElement.removeChild($("no-dogs"));
        }
        fetchSearch(from,to,date,airline);
    }

    // fetch the data according to travel info
    // parameter @from: departure
    // parameter @to: destination
    // parameter @date: departure date
    // parameter @airline: using airline
    function fetchSearch(from, to, date, airline) {
        let url = "search.php?from=" +from + "&to=" + to 
                    + "&date=" + date + "&airline=" + airline;   // put url string here
        fetch(url, {mode:"cors"})
                .then(checkStatus)
                .then(JSON.parse)
                .then(addItem)
                .catch(console.log());
    }

    // toggle the menu logo once clicked 
    function hamburgerClick() {
        qs('.hamburger').classList.toggle('active');
        qs(".nav-list ul").classList.toggle('active');
    }

    // make the home page appear 
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

    // add all the dog list on the page
    // parameter @data: json data of dog lists
    function addItem(data) {
        console.log(data);
        if (data.length == 0) {
            let line = document.createElement("h2");
            line.innerText = "Unfortunately, we don't have any dogs going to your destination." + 
            "\n You can sign up to get a notification once we have any dogs going to your destination." 
            line.setAttribute("id", "no-dogs");
            $("lastRow").appendChild(line);
        }
        for (let dog of data) {
            let name = dog["name"];
            let info = dog["comment"];
            let pic = dog["photo"];
            let item = document.createElement("div");
            let discription = document.createElement("div");
            let nameDom = document.createElement("h2");
            let p = document.createElement("p"); 
            let a = document.createElement("a");
            nameDom.innerText = name;
            p.innerText = info;
            console.log(pic);
            if (pic == "") {
                item.style.backgroundColor="lightgrey";
            } else {
                item.style.backgroundImage = "url(./img/" + pic + ".jpg)";
            }
            item.classList.add("item");
            discription.classList.add("discription");
            nameDom.classList.add("name");
            discription.appendChild(nameDom);
            discription.appendChild(p);
            discription.appendChild(a);
            item.appendChild(discription);
            let row = lastRow();
            row.appendChild(item);
        }    
    }

    // find the last row of the listing page and return the last row div 
    function lastRow() {
        let items = qsa("#lastRow .item");
        let count = items.length;
        if (count < 3) {
            return $("lastRow");
        } else {
            console.log("no lastRow");
            $("lastRow").removeAttribute("#lastRow");
            let row = document.createElement("div");
            row.classList.add("row");
            row.setAttribute("id", "lastRow");
            qs(".lists").appendChild(row);
            return row;
        }
    }
//-------------------------------Helper function------------------------------------
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

      /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) { 
    if (response.status >= 200 && response.status < 300 || response.status == 0) {  
      return response.text();
    } else {  
      return Promise.reject(new Error(response.status + ": " + response.statusText)); 
    }
  }
})();




// function checkStatus(response) {    // boiler plate code given out
//     ...
//   }
  
//   function callAjax() {
//     let url = ..... // put url string here
//     fetch(url)
//          .then(checkStatus)
//          .then(handleResponse)
//          .catch(handleError);
//   }
  
//   function handleResponse(responseText){
//     //success: do something with the responseText
//   }
  
//   function handleError(error){
//     //error: do something with error
//   }