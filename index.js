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

        // my account page
        let myAccountSideBar = qsa("#side-bar div");
        for (let i = 0; i < myAccountSideBar.length;i++) {
            myAccountSideBar[i].addEventListener("click", function() {
                let arr = qsa("#account-page > div");
                    for (let j = 0; j < arr.length; j++) {
                        arr[j].style.display = "none";
                    }
                let classList = this.classList;
                let id = this.id;
                sideBarSelected(classList);
                showMyAccountPage(id);
            });
        }

        // Saved search
        $("remove-saved-search").addEventListener("click", removeSaveSearch);
        $("select-all").addEventListener("click", selectAllCheckBox);

        // update profile 
        $("update-profile").addEventListener("click", updateProfile);
        
        // fill out my account page 
        fillSavedSearchAndContactedList();
    }
    
    // Get saved search and contacted lists of user (if logged in) and parse them on the 
    // my account page
    function fillSavedSearchAndContactedList() {
        checkLoggedIn("False");
        let url = "getInfo.php";
       fetch(url)
            .then(checkStatus)
            .then(JSON.parse)
            .then(data => {
                // keep throwing error
                fillSavedSearch(JSON.parse(data["savedsearch"]));
                fillContactedPage(JSON.parse(data["contacted"]));
            })
            .catch(console.log);
    }

    // Update user profile with give information
    function updateProfile() {
        let username = $("username-update").value;
        let email = $("email-update").value;
        let firstName = $("first-name-update").value;
        firstName = firstName.substring(0,1).toUpperCase() + firstName.substring(1).toLowerCase();
        let lastName = $("last-name-update").value;
        lastName = lastName.substring(0,1).toUpperCase() + lastName.substring(1).toLowerCase();
        let number = $("phone-number-update").value;
        if (!validUsername(username)) {
            alert("Username is not valid. Must be 6 to 20 " 
            + "alpanumeric characters ");
            return;
        }
        if (!validEmail(email)) {
            alert("Email is not valid");
            return;
        }
        let url = "update.php";
        let data = new FormData();
        data.append("username", username);
        data.append("email", email);
        data.append("firstname", firstName);
        data.append("lastname", lastName);
        data.append("number", number);
        fetch(url, {method: 'POST', body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(data => {
                if (data.hasOwnProperty("Success")) {
                    alert(data["Success"]);
                } else {
                    alert(data["Failed"]);
                }
            })
            .catch(console.log);
    }

    // Select all the checkboxes in the saved-search page
    function selectAllCheckBox() {
        let checkboxes = qsa(".checkbox");
        if (this.checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            } 
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            } 
        }
    }

    // Remove the selected saved-search lists 
    function removeSaveSearch() {
        let checkboxes = qsa(".checkbox");
        let arr = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                arr.push(checkboxes[i].value);
                checkboxes[i].parentElement.parentElement.removeChild(checkboxes[i].parentElement);
            }
        }
        // update...? 
        let url = "update.php";
        let data = new FormData();
        data.append("savedSearch",  JSON.stringify(arr));
        data.append("action", 'remove');
        fetch(url, {method: 'POST', body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(data => {
                console.log(data);
                if (data.hasOwnProperty("Success")) {
                    alert(data["Success"]);
                } else {
                    alert(data["Failed"]);
                }
            })
            .catch(console.log);
    }

    // save the search so that user can get alert once there is an 
    function saveSearch() {

    }


    // Select the given side-bar div and unselect the other side-bar div
    function sideBarSelected(classList) {
        let myAccountSideBar = qsa("#side-bar div");
        for (let i = 0; i < myAccountSideBar.length;i++) {
            myAccountSideBar[i].classList.remove("selected");
        }
        classList.add("selected");
    }

    // show the account page that matches selected side-bar div
    function showMyAccountPage(id) {
        let accountPage = id + "-page";
        $(accountPage).style.display = "block";
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

    // Hide the home pages
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
        let popUps = qsa(".popup-view");
        eraseAll(popUps);
        if ($("no-dogs") != null) {
            $("no-dogs").parentElement.parentElement.removeChild($("no-dogs").parentElement);
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
        if (data.length == 0) {
            let line = document.createElement("h2");
            let div = document.createElement("div");
            line.innerText = "Unfortunately, we don't have any dogs going to your destination." + 
            "\n You can sign up to get a notification once we have any dogs going to your destination." 
            line.setAttribute("id", "no-dogs");
            div.appendChild(line);
            $("lastRow").appendChild(div);
            let getNotify = document.createElement("a");
            getNotify.innerText = "Get Notify";
            getNotify.classList.add("button");
            getNotify.id = "getNotify";
            div.appendChild(getNotify);
            let from = $("departure-2").value;
            from = from.substring(0,1).toUpperCase() + from.substring(1).toLowerCase();
            let to =  $("to-2").value;
            to = to.substring(0,1).toUpperCase() + to.substring(1).toLowerCase();
            let date = $("depart-2").value;
            let airline = $("airline-2").value;
            
            let str = from + "/" + to + "/" + date + "/[" + airline + "]";
            // some sort of class to getNotify 
            getNotify.addEventListener("click", function(){ 
                saveThisSearch(str);
            });

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

            let popupView = document.createElement("div");
            let popupCard = document.createElement("div");
            let aTag = document.createElement("a");
            let close = document.createElement("i");
            let productImg = document.createElement("div");
            let img = document.createElement("img");
            let info2 =document.createElement("div");
            let h2 = document.createElement("h2");
            //let span = document.createElement("span");
            let p2 = document.createElement("p");
            let destination = document.createElement("span");
            let organization = document.createElement("span");
            let sendRequest = document.createElement("a");
            
            popupView.classList.add("popup-view");
            popupView.style.display = "none";
            popupCard.classList.add("popup-card");
            close.classList.add("fa-solid");
            close.classList.add("fa-xmark");
            close.classList.add("close-btn");
            productImg.classList.add("product-img");
            info2.classList.add("info");
            destination.classList.add("distination");
            organization.classList.add("organization");
            sendRequest.classList.add("send-request");

            // when sendRequest is clicked! 
            sendRequest.addEventListener("click", function() {
                contactOrg(pic + '.jpg',name, dog["destination"].toUpperCase(), dog["orgName"].toUpperCase());
            });
            
            img.src = "img/" + pic + ".jpg";
            productImg.appendChild(img);
            aTag.appendChild(close);
            popupCard.appendChild(aTag);
            popupCard.appendChild(productImg);

            h2.innerHTML =  name +  "<br> <span>"+ dog["shortIntro"] + "</span>";
            // save value so it is easy to fetch info when contact button is clicked
            h2.title = name;
            p2.innerText = info;
            destination.innerText = "Destination: " + dog["destination"].toUpperCase();
            destination.title = dog["destination"].toUpperCase();
            organization.innerText = "Organization: " + dog["orgName"].toUpperCase();
            organization.title = dog["orgName"].toUpperCase();
            sendRequest.innerText = "Send Request";
            
            info2.appendChild(h2);
            info2.appendChild(p2);
            info2.appendChild(destination);
            info2.appendChild(organization);
            info2.appendChild(sendRequest);
            popupCard.appendChild(info2);
            popupView.appendChild(popupCard);
            $("popup-list").appendChild(popupView);
            item.addEventListener("click", function() {
                popupView.style.display = "flex";
            })
            close.addEventListener("click", function() {
                popupView.style.display = "none";
            })
        }    

    }

    // Save the search so that user can get notify when there is a dog that satisfies search 
    function saveThisSearch(line) {
        if (checkLoggedIn("")) {
            return;
        }
        let arr = [line];
        let url = "update.php";
        let data = new FormData();
        data.append("savedSearch",  JSON.stringify(arr));
        data.append("action", 'add');
        fetch(url, {method: 'POST', body: data})
             .then(checkStatus)
             .then(JSON.parse)
             .then(data => {
                if (data.hasOwnProperty("Success")) {
                    alert("Successfully saved! \n You can see these searches on My Account page.");
                    fillSavedSearch(JSON.parse(data["savedsearch"]));
                }
             })
             .catch(console.log);
    }

    // Check if there is logged in account, if not send the user to log in page
    function checkLoggedIn(msg) {
        let url = "checkSession.php";
        fetch(url)
            .then(checkStatus)
            .then(JSON.parse)
            .then(data => {
                if (data.hasOwnProperty("False")) {
                    if (msg == "") {
                        alert("Please log in to see the page.");
                        logInPage();
                        return false;
                    }
                } else {
                    return true;
                }
             })
             .catch(console.log);
    }

    // When the user contact organization, send email to the chosen organization. 
    // Also, save in database and update on my account page that this user contacted organization about the volunteering opportunity.
    function contactOrg(pic, name, destination, orgName) {
        if (!checkLoggedIn("")) {
            return;
        }
        
        // send email to organization
        // user name, email, flight info, phone number        
        // save the contacting info to database

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        let dict = {"img": pic, "name": name, "destination": destination, "organization": orgName, "contactedDate": date};
        let arr = [dict];
        let url = "update.php";
        let data = new FormData();
        data.append("contacted",  JSON.stringify(arr));
        data.append("action", 'add');
        
        fetch(url, {method: 'POST', body: data})
             .then(checkStatus)
             .then(JSON.parse)
             .then(data => {
                 console.log(JSON.parse(data["contacted"]));
                if (data.hasOwnProperty("Success")) {
                    alert("Successfullly contacted! \n Thank you for your interest in the volunteering opportunity! \n Organization will send you an email with more information about the volunteering process.")
                    fillContactedPage(JSON.parse(data["contacted"]));
                }
             })
             .catch(console.log);
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
            fillMyAccountPage(data);
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
        $("listings").style.display = "none";
        $("my-account").style.display = "flex";
        //qs("#side-bar div").classList.add("selected");
        let thisElement = qs("#side-bar div");
        let arr = qsa("#account-page > div");
        for (let j = 0; j < arr.length; j++) {
            arr[j].style.display = "none";
        }
        let classList = thisElement.classList;
        let id = thisElement.id;
        sideBarSelected(classList);
        showMyAccountPage(id);
    }

    function fillMyAccountPage(data) {
        $("my-account-header").innerText = data["useruid"] + "\'s account";
        $("first-name-update").value = data["firstname"];
        $("last-name-update").value = data["lastname"];
        $("username-update").value = data["useruid"];
        $("email-update").value = data["useremail"];
        $("phone-number-update").value = data["number"];
        fillSavedSearch(JSON.parse(data["savedsearch"]));
        fillContactedPage(JSON.parse(data["contacted"]));
        // fill out requests and saved search
    }

    // every value is a string of a search
    function fillSavedSearch(data) {
        eraseAll(qsa("#checkbox-container .lists"));
        console.log(data);
        if (data.length == 0) {
            return;
        }
        for (let i = 0; i < data.length; i++) {
            let lists = document.createElement("div");
            lists.classList.add("lists");
            let checkbox = document.createElement("input");
            let label = document.createElement("label");
            checkbox.classList.add("checkbox");
            checkbox.type = "checkbox";
            checkbox.value = data[i];
            label.innerText = data[i];
            lists.appendChild(checkbox);
            lists.appendChild(label);
            $("checkbox-container").appendChild(lists);
        }
    }

    function fillContactedPage(data) {
        eraseAll(qsa("#contacted-list > div"));
        if (data.length == 0) {
            return;
        }
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = "img/" + data[i]["img"];
            let innerDiv = document.createElement("div");
            let name = document.createElement("h2");
            name.innerText = data[i]["name"];
            let destination = document.createElement("p");
            destination.innerText = "Destination: " + data[i]["destination"]; 
            let organization = document.createElement("p");
            organization.innerText = "Organization: " + data[i]["organization"];
            let contactedDate = document.createElement("p");
            contactedDate.innerText = "Contacted date: " + data[i]["contactedDate"];
            div.appendChild(img);
            innerDiv.appendChild(name);
            innerDiv.appendChild(destination);
            innerDiv.appendChild(organization);
            innerDiv.appendChild(contactedDate);
            div.appendChild(innerDiv);
            $("contacted-list").appendChild(div);
        }
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
        console.log(data);
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