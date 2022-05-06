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
        
        // logout buttons 
        $("log-out").addEventListener("click", logout);
        
        // login buttons 
        $("log-in").addEventListener("click", logInPage);
        $("log-in-submit").addEventListener("click", logIn);
        $("go-to-login").addEventListener("click", logInPage);
        
        // signup buttons 
        $("signup-submit").addEventListener("click", signUp);
        $("go-to-signup").addEventListener("click", signUpPage);
        
        // nav bar buttons 
        qs(".brand").addEventListener("click",showHomePage);
        $("nav-home").addEventListener("click",showHomePage);
        $("nav-about").addEventListener("click",showHomePage);
        $("nav-proc").addEventListener("click",showHomePage);
        $("nav-contact").addEventListener("click",showHomePage);
        $("account-box").addEventListener("click", myAccountPage);
        
        let hamburger = qs('.hamburger');
        hamburger.addEventListener("click", hamburgerClick);

        // setting the minimum date to be today's date 
        let today = new Date().toDateInputValue();
        $("depart-1").value = getDate(7,0);//today;
        $("depart-2").value = getDate(7,0);
        $("depart-1").min = getDate(7,0);
        $("depart-2").min = getDate(7,0);
        $("depart-1").max = getDate(0,1);
        $("depart-2").max = getDate(0,1);
        
        
        document.addEventListener('scroll', ()=>{
            let scroll_position = window.scrollY;
            if(scroll_position > 10){
                header.style.backgroundColor =  "#FFC06E";
                $("log-in-box").style.backgroundColor = "white";
                $("log-out-box").style.backgroundColor = "white";
            } else {
                header.style.backgroundColor = "transparent" ;
                $("log-in-box").style.backgroundColor = "#FFC06E";
                $("log-out-box").style.backgroundColor = "#FFC06E";
            }
        })
        $("send-button").addEventListener("click", sendEmail);

        menuItem.forEach((item)=>{
            item.addEventListener("click", hamburgerClick);
        })
        
    }

    // return date in yyyy-mm-dd form.
    // parameter: 
    //          adddate(integer): additional day
    //          addYear(integer): additional year
    function getDate(addDate, addYear) {
        let date = new Date();
        var day = date.getDate() + addDate;
        var month = date.getMonth() + 1;
        var year = date.getFullYear() + addYear;

        if (((month == 1 ||month == 3 ||month == 5 ||month == 7 ||month == 8 
            || month == 10 ||month == 12) && day > 31)) {
            day = day - 31;
            month++;
        } else if (((month == 4 ||month == 6 ||month == 9 ||month == 10) && day > 30)) {
            day = day - 30;
            month++
        } else if (month == 2 && day > 28) {
            day = day - 28;
            month++;
        }
        if (month > 12) {
            year++;
            month = 12 - month;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var today = year + "-" + month + "-" + day; 
        return today;
    }


    // toggle the menu logo once clicked 
    function hamburgerClick() {
        qs('.hamburger').classList.toggle('active');
        qs(".nav-list ul").classList.toggle('active');
    }

    // make the home page appear 
    function showHomePage() {
        $("listings").style.display="none";
        $("log-in-page").style.display="none";
        $("sign-up-page").style.display="none";
        $("my-account").style.display="none";
        $("section-explain").style.display="block";
        $("section-contact").style.display="block";
        $("section-process").style.display="block";
        $("hero").style.display="block"; // why this is only block? 
    }

    function hideHomePage() {
        $("section-explain").style.display="none";
        $("section-contact").style.display="none";
        $("section-process").style.display="none";
        $("hero").style.display="none";
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
        
        hideHomePage();
        // eventListener when clicked title, or any nav bars

        let rows = qsa(".item");
        eraseAll(rows);
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

    // Switch to log in page
    function logInPage() {
        hideHomePage();
        $("listings").style.display="none";
        $("sign-up-page").style.display="none";
        $("log-in-page").style.display="flex";
    }

    // Log in with given username and password 
    // handles error if there is no account that matches 
    // the username and password. 
    function logIn() { 
        let url = "logIn.php";
        let username = $("id").value;
        let password = $("password").value;
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        fetch(url, {method:'POST', body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(loggedIn)
            .catch(console.log);
    }

    // Log in to the account and show the my account page
    function loggedIn(data) {
        if (data.hasOwnProperty("Success")) {
            alert(data["Success"]);
            $("id").value = "";
            $("password").value = "";
            $("log-in-page").style.display="none";
            $("log-in-box").style.display = "none";
            $("log-out-box").style.display = "flex";
            $("log-out").addEventListener("click", logout);
            $("account-box").style.display = "flex";
            qs("#my-account > div > h1").innerText = data["username"] +  "'s  account";
            myAccountPage();
            hideHomePage();
        } else {
            alert(data["Failed"]);
            return;
        }
    }

    function logout() {
        console.log("logged out ");
        let url = "logout.php";
        fetch(url, {method:'GET'})
            .then(checkStatus)
            .then(data => {
                alert("You have successfully logged out!");
                $("log-in-box").style.display = "flex";
                $("log-out-box").style.display = "none";
                $("my-account").style.display = "none";
                $("account-box").style.display = "none";
                showHomePage();
            })
            .catch(console.log);
    }

    function myAccountPage() {
        hideHomePage();
        $("my-account").style.display = "flex";
    }

    // Make signup page appear and other pages disappear
    function signUpPage() {
        hideHomePage();
        $("listings").style.display="none";
        $("log-in-page").style.display="none";
        $("sign-up-page").style.display="flex";
    }

    // Create account with given username, password, and email 
    // Alert to users if any input is invalid
    function signUp() {
        let url = "signup.php";
        let username = $("id-signup").value;
        let password = $("password-signup").value;
        let passwordRepeat = $("password-signup-repeat").value;
        let email = $("email-signup").value;
        // Validating the data 
        if (username == "" || password == "" || password == "" || 
            email == "") {
            alert("Please fill in all of the fields");
            return;
        }
        if (!validUsername(username)) {
            alert("Username is not valid. Must be 6 to 20 " 
            + "alpanumeric characters ");
            return;
        }
        if (!validPassword(password, passwordRepeat)) {
            alert("Passwords do not match or passwords are less than 6 characters")
            return;
        }
        if (!validEmail(email)) {
            alert("Email is not valid");
            return;
        }
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("email", email);
        fetch(url, {method: 'POST', body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(signedUp)
            .catch(console.log);
    }

    // Inform users whether the signin was successful or not
    // Parameter: 
    //      data(JSON): contains signing-up result
    function signedUp(data) {
        if (data.hasOwnProperty("Success")) {
            alert(data["Success"]);
            logInPage();
            $("id-signup").value = "";
            $("password-signup").value = "";
            $("password-signup-repeat").value = "";
            $("email-signup").value = "";
        } else {
            alert(data["Failed"]);
            //return;
        }
    }
    
    // Check if the username is valid. Username should be made with  
    // 6 to 20 alphanumeric characters.
    // Parameter: 
    //      username(String): username
    function validUsername(username) {
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        return usernameRegex.test(username) && username.length <= 20  && 
        username.length >= 6;
    }

    // Check if the password is valid.
    // Password should be more than 6 characters and match with passwordRepeat
    // parameter:
    //      pwd(String): password
    //      pwd2(String): password repeat 
    function validPassword(pwd, pwd2) {
        if (pwd !== pwd2) {
            return false;
        }
        return (pwd === pwd2) && pwd.length >= 6;
    }

    // Check if the email is valid.
    // Parameter:
    //      email(String): email
    function validEmail(email) 
    {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Sending email but need to fun on hosting server 
    function sendEmail() {
        let url = 'email.php';
        let data = new FormData();
        let contactInfo = qsa('.contact-input input');
        let message = $("message-input").value;
        let name = contactInfo[0].value;
        let emailAdd = contactInfo[1].value;
        let number = contactInfo[2].value; 
        data.append("name", name);
        data.append("e-address", emailAdd);
        data.append("number", number);
        data.append("msg", message);

        fetch(url, {method:'POST', body: data}) 
            .then(checkStatus)
            //.then(JSON.parse)
            .then(data => {
                console.log('Success: ' + data);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
        // use ajax? to send the email 
        alert("Sent!");
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

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

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