<?php	session_start(); ?>

<!DOCTYPE html> 
	<html>
        <head>
			<!--Image from https://m.blog.naver.com/rlaantjd8204/220715116442-->
	    <title>Flight Volunteer</title>
	    <link href="index.css" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<script src="index.js"></script>
		<script src="https://smtpjs.com/v3/smtp.js"></script>

		</head>
		<body>
			<!--Header section-->
			<section id=header>
				<div class="header container">
					<div id="nav-bar">
						<div class="brand">
							<a href="#hero"><h1>Flight Volunteer</h1> </a> 
						</div>
						<div class="nav-list">
							<div class="hamburger"><div class="bar"></div></div>
							<ul>
								<li>
									<a href="#hero" id="nav-home"> <h1>Home</h1></a>
								</li>
								<li>
									<a href="#section-explain" id="nav-about"> <h1>About</h1></a>
								</li>
								<li>
									<a href="#section-process" id="nav-proc"> <h1>Procedure</h1></a>
								</li>
								<li>
									<a href="#section-contact" id="nav-contact"> <h1>Contact Us</h1></a> 
								</li>
                                <li >
                                    <a href="#log-in-page" id="log-in"> 
                                        <?php
                                            if (!isset($_SESSION["userid"])) {
                                                echo '<h1 id="log-in-box" style="font-size:1rem;border-radius: 1rem;padding: 12px;background-color: #ffc06e;"> log in </h1> </a>'; 
                                            } else {
                                                echo '<h1 id="log-in-box" style="font-size:1rem;border-radius: 1rem;padding: 12px;background-color: #ffc06e; display: none;"> log in </h1> </a>';
                                            }
                                        ?>
                                </li>
								<li>
									<a href="#my-account" id="account"> 
									<?php
										if (!isset($_SESSION["userid"])) {
											echo '<h1 id="account-box" style="font-size:1rem; display:none;" >My account</h1></a>'; 
										} else {
											echo '<h1 id="account-box" style="font-size:1rem;" >My account</h1></a>';
										}
									?>
								</li>
								<li >
									<a href="#log-out" id="log-out"> 
									<?php
										if (!isset($_SESSION["userid"])) {
											echo '<h1 id="log-out-box" style="font-size:1rem;border-radius: 1rem;padding: 12px;background-color: #ffc06e;  display:none;">log out</h1></a>';
										} else {
											echo '<h1 id="log-out-box" style="font-size:1rem;border-radius: 1rem;padding: 12px;background-color: #ffc06e;">log out</h1></a>';
										}
									?>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
            
			<section id="log-in-page" style="display:none;">
                    <form>
                        <h1>Log In</h1>
                        <div>
                            <label>Username: </label><br>
                            <input type="text" id="id" class = "ids"><br>
                            <label>Password: </label><br>
                            <input type="password" id="password" class = "pws"><br>
                            <input type="submit" id="log-in-submit" value="submit">
                            <p>Don't have an account? <a id="go-to-signup" href="#sign-up-page">Sign up now</a>
                        </div>
                    </form>
                </section>
                <section id="sign-up-page" style="display:none;">
                    <form>
                        <h1>Sign up</h1>
                        <div>
                            <label>Username: </label><br>
                            <input type="text" id="id-signup" class="ids"><br>
                            <label>Password: </label><br>
                            <input type="password" class="pws" id="password-signup"><br>
                            <label>Confirm Password: </label><br>
                            <input type="password" class="pws" id="password-signup-repeat"><br>
                            <label>Email: </label><br>
                            <input type="email" id="email-signup"><br>
                            <input type="submit" id="signup-submit" value="submit">
                            <p>Already have an account? <a id="go-to-login" href="#log-in-page">Log In</a>
                        </div>
                    </form>
                </section>
			<!--Hero section -->
			<section id="hero">
				<div class="hero container" id="page1">
					<div>
						<h1 id="title">Flight Volunteer</h1>
						<div id="search">
							<div id="flight-info"> 
								<div id="from">
									<label>From</label>
									<div>
										<input type="text" id="departure-1" required>
									</div>
								</div>
								<div >
									<label>To</label>
									<div>
										<input type="text" id="to-1" required>
									</div>
								</div>
								<div id="date">
									<label>Choose date</label>
									<div>
										<input type="date" id="depart-1" name="depart-date" required>
									</div>
								</div>
								<div >
									<label>Choose airline</label>
									<div>
										<input type="text" id="airline-1">
									</div>
								</div>
								
							</div>
							<a href="#" type="button" class="button" id="search-list-1"> search</a>
						</div>
					</div>
				</div>
			</section>
			<section id="section-explain">
				<div id="purpose" class="container"> 
					<h1 class="section-title">What is "Flight Volunteer"?</h1>
					<p>
						Flight Volunteer is a way to help rescue dogs travel and meet their new families in a foreign countries. 
						<br> <br>
						After dogs are rescued from unhealthy conditions, they often stay in animal shelters waiting for new families.
						 A good amount of those rescue dogs get adopted by families in foreign countries. The most widely used way to transport dogs internationally is flying with flight volunteers. 
						 <br>Flight volunteers will travel with rescue dogs as they would with their own pets. 
						 Rescuers will prepare all the paperwork for the dogs and volunteers would meet dogs at the airport briefly before the flight. The dogs could either go cargo or cabin with the volunteers. 
						 Once they arrive at the destination, the volunteer might need to go through security to check a few things about the dogs such as vaccination status, microchip, etc. Again, these paper works are all prepared by rescuers. Volunteer only needs to spare some time before and after the flight. 
						 <br>Such volunteering work would not only give the rescue dogs a new life with their new family but also provide animal shelters to rescue other dogs who need help. Since the pandemic, animal shelters and rescuers are having a hard time finding volunteers, which means there are many dogs and families which are waiting to meet each other.
						  <br><br>We wanted to make this flight volunteer more accessible for both volunteers and rescuers. <br>Feel free to reach out if you have any questions about volunteering! 
						  
						 <br><br> We are currently only helping rescue dogs from South Korea who needs to travel to North America (Vancouver, Seattle, and California) 
					</p>
				</div>
				
				</div>
			</section>
			<section id="section-process">
				<div id="process" class="container"> 
					<h1 class="section-title">How does it work?</h1>
					<ol>
						<li>Put your flight date and airline to search.</li>
						<li>Choose a dog or dogs who are ready to travel. </li>
						<li>Contact the organization for further procesure and expectation</li>
						<li>Confirm that you will be flight volunteer for the dogs</li>
						<li>Provide your flight information with the organization for paperworks</li>
						<li>Arrive at airport abour 30min ~ 1hour early to meet the dog</li>
						<li>Follow the instruction of the organization until the dog goes into cargo / or fly with it in cabin</li>
						<li>Go through security and indicate that you are entering with a dog as a flight volunteer</li>
						<li>Follow the instruction of security</li>
						<li>Meet the dog at baggage claim or outside of baggage claim</li>
						<li>Safely transfer the dog to new pawrent! </li>
					</ol>
					<p class="fyi">*The processure could be differ by the organization and airports </p>
				</div>
			</section>
			<section id="section-contact">
				<div id="contact" class="container">
					<h1 class="section-title" id="contact-us"> Contact us!</h1>
					<div id="contact-container">
						<div id="contact-info">
							<div class="contact-input"><h2>Name:</h2><input type=text> </div> 
							<div class="contact-input"><h2>Email Address:</h2><input type=text> </div> 
							<div class="contact-input"><h2>Phone number:</h2><input type=text> </div> 
						</div>
						<div id="message"><h2>Message</h2> <input type=text id="message-input">  </div>
					</div>
					<div id="button-container">
						<a type="submit" id="send-button" class="button">Send!</a>
					</div>
				</div>
			</section>
			<section id="listings">
				<div id="listing-page" class="container">
					<div id="page-top">
						<h1 class="section-title">I am ready to travel!</h1>
						<p>These puppies are waiting to travel to your destination! If you would like to be flight volunteer for one of them, click the "contact" button! </p>
					</div> 
					<div id="search">
						<div id="flight-info"> 
							<div id="from">
								<label>From</label>
								<div>
									<input type="text" id="departure-2">
								</div>
							</div>
							<div >
								<label>To</label>
								<div>
									<input type="text" id="to-2"> 
								</div>
							</div>
							<div id="date">
								<label>Choose date</label>
								<div>
									<input type="date" id="depart-2" name="depart-date"
									value="2022-01-01"
									min="2022-01-01" max="2023-01-01" >
								</div>
							</div>
							<div >
								<label>Choose airline</label>
								<div>
									<input type="text" id="airline-2"> 
								</div>
							</div>
							<a href="#" type="button" class="button" id="search-list-2"> search</a>
						</div>
					</div> 
					<div class=lists>
						<div class="row" id="lastRow">
							<div class="item"> 
								<div class="discription"> 
									<h2 class="name">John Doe</h2>
									<p>
										I am 3 years old and I have family waiting for me at Canada. 
										If your flight destination is Seattle or Vancouver, please help me get to my family!
									</p>
								
									<a href="#" type="button" class="button">Contact!</a>
								</div>
							</div>
							
						</div>
					</div>
					<div id="popup-list"> 
						<div class="popup-view" style="visibility:hidden;" >
							<div class="popup-card">
								<a>
									<i class="fa-solid fa-xmark close-btn"></i>
								</a>
								<div class = "product-img">
									<img src="img/Jinddu.jpg">
								</div>
								<div class="info">
										<h2>John Doe  <br> <span>15 months neutered male</span></h2>
										<p>
											I am 3 years old and I have family waiting for me at Canada. 
											If your flight destination is Seattle or Vancouver, please help me get to my family!
										</p>
										<span class="destination">
											Destination: New York 
										</span>
										<span class="organization">
											Organization: LifeWithJindo
										</span>
										<a href="sent-request" 
										class="send-request">Send request</a>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</section>
            
			<section id="my-account" style="display:none;">
				<div  class="container"> 
					<h1 class="section-title" id="my-account-header"><?php echo $_SESSION["useruid"] .'\'s  account';?></h1>
					<div> 
						<div id="side-bar">
							<div id="profile">Profile</div>
							<div id="request">Requests</div>
							<div id="saved-search">Saved Search</div>
						</div>
						<div id="account-page">
							<div id="profile-page">
								<h2>Profile</h2>
								<p>Please fill out every box before we have </p>
								<div class="profile-element"> 
									<h4>First name : </h4>
									<input id="first-name-update" value="<?php
											if (isset($_SESSION["firstname"])) {
												echo $_SESSION["firstname"];
											} 
										?>"; style="margin-left: 28px;">
									</input> 
									<h4>Last name : </h4>
									<input id="last-name-update" value="<?php
											if (isset($_SESSION["lastname"])) {
												echo $_SESSION["lastname"];
											}
										?>";>
										
									</input>
								</div>
								<div class="profile-element">
									<h4>Username : </h4>
									<input id="username-update" value= "<?php echo $_SESSION["useruid"];?>"; style="margin-left: 32px;">
									</input>
								</div>
								<div class="profile-element"> 
									<h4>Email : </h4>
									<input type="email" id="email-update" value="<?php echo $_SESSION["useremail"];?>"; style="margin-left: 57px;">
									</input>
								</div>
								<div class="profile-element"> 
									<h4>Phone number : </h4>
									<input type= "tel" id="phone-number-update" value = "<?php
											if (isset($_SESSION["number"])) {
												echo $_SESSION["number"];
											} else {
												echo "";
											}
										?>">
									</input>
								</div>
								<div class="button-wrap">
									<a href="#" type="button" class="button" id="update-profile">Update</a>
								</div>
								
							</div>
							<div id="request-page">
								<h2>Contacted volunteer opportunities</h2>
								<p>Volunteer opportunities that you contacted</p>
								<div id="contacted-list" class="scroll-box">
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>
										<div> 
											<img src="img/Jinddu.jpg">
											<div> 
												<h2> Name of the dog</h2>
												<p> Destination: USA</p>
												<p> Organization: </P>
												<p> Contacted date </p>
											</div>
										</div>


								</div>
							</div>
							<div id="saved-search-page">
								<h2>Saved Search</h2>
								<p>We will send you an email once there is a volunteering opportunity that matches with your schedule</p>
								<p id="ex" style="margin-top: 0px; margin-bottom: 10px;">ex) Departure city/ Arrival city/ Departure date/ Airline</P>
								<div id="checkbox-container" class="scroll-box">
									<div class="lists">
										<input class="checkbox" type="checkbox">Seoul/Seattle/01-23-2023/United</input>
									</div>
									
								</div> 
								<div id="saved-search-button-select-all" class="lists" >
									<input type="checkbox" id="select-all" ><label> Select All</label><br>
								</div>
								<div class="button-wrap"> 
									<a href="#" type="button" class="button" id="remove-saved-search">remove</a>
								</div>
									
							</div>
						</div>
					</div>
				</div>
			</section>

		</body>
    </html>

