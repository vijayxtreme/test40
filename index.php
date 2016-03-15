<?php header('Access-Control-Allow-Origin: *'); ?>
<!DOCTYPE html>
<html>
<head>
	<title>BudgetVanLines 40</title>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:400,300italic,300,400italic,500,500italic,700,700italic,900,900italic,100italic,100|Source+Sans+Pro:400,200,200italic,300,300italic,400italic,600,600italic,700,700italic">
	<link rel="stylesheet" type="text/css" href="http://allfont.net/allfont.css?fonts=montserrat-light">
	<link rel="stylesheet" type="text/css" href="css/landing/style.css">
</head>
<body>
	<header>
		<div class="container">
			<div class="logo">
				<div class="logo-main"><a href="http://localhost/devsites/bvl40"><img src="img/test40/header.png" height="34" width="239"></a></div>		
				<div class="matching-service"><p>Your mover matching service</p></div>
			</div>
			<div id="parallelogram"></div>
			<div class="phone">
				<div class="any-questions"><p>Any Questions?</div>
				<div class="call-us"><span class="phone-icon"><img src="img/test40/phone-call.png"></span><span>Call US: <a href="tel:18006116001">1.800.611.6001</a></span></div>
			</div>
		</div>
	</header>
	<div class='background'>
		<section id="step1" class="step">
			<div class="container">
				<div class="price-text">
					<h1>MOVING PRICE CALCULATOR</h1>
					<h4>Rates as low as $999</h4>
					<div class="price-calculator">
						<form id="f-step1">
							<div class="price-title">
								<h3>Enter ZIP to Search Rates and Availability</h3>
							</div>
							<div class="price-body">
								<div class="price-col moving-from">Moving From?</div>
								<div class="price-col zip-entry">
								<!-- CLEAN UP-->
									<input name="from_zip" class="zip zipc" id="zip_from" type="tel" placeholder="Enter From Zip" data-zip="from_zip">
								</div>
								<div class="price-col">
									<button id="go" class="submit-form" type="submit">GO</button>
								</div>
							</div>
							<div class="zipfinder">
								<div class="price-col moving-from">&nbsp;</div>
								<div class="ziphelp-area">
									<a class="ziphelp" href="#"><img src="img/test40/zipfinder.png"><span data-zip="from_zip">ZIP Help?</span></a> 
								</div>
								
							</div>
						</form>
					</div>

					<div class="bvl-logos">
						<span class='verisign'><img src="img/test40/verisign.png"></span>
						<span class="bbb"><img src="img/test40/bbb.png"></span>
						<span class="lock"><img src="img/test40/lock.png"><span class='priv-and-terms'><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></span></span>
						<span class="info"><img src="img/test40/info.png"></span>
					</div>
				</div>
				<div class="movers">
					<img src="img/test40/movers.png">
				</div>
			</div>
		</section>
		<section id="step2" class="step">
			<div class="container">
				<div class="steps-completed">
					<div class="blue-col">
						Step 1: Completed
					</div><div class="light-col">
						Step 2: Search Movers
					</div><div class="blue-col last">
						Step 3: Get Quotes
					</div>
				</div>
				<div class="form-area">
				<form id="f-step2">
					<div class="moving-from">
						<div class="col-q">
							Where are you moving from?
						</div>
						<div class="col-i2">
							<input type="tel" class="zipc" name="move_from" value="" placeholder="Enter From Zip" data-zip="from_zip">
						</div>
						<div class="col-z ziphelp-area">
							<a class="ziphelp" href="#"><img src="img/test40/zipfinder.png"><span data-zip="from_zip">ZIP Help?</span></a>
						</div>
					</div>
					<div class="moving-from edit">
						<h6>MOVING FROM:</h6>
						<div><span id="moving-from-text" data-zip="from_zip">Chestnut Mountain, GA 30502</span><a id="moving-from-text-edit" href="#">Edit</a></div>
					</div>
					<div class="moving-to">
						<div class="col-q">
							Where are you moving to?
						</div>
						<div class="col-i2">
							<input type="tel" id="zip_to" class="zipc" name="move_to" value="" placeholder="Enter To Zip" data-zip="move_to">
						</div>
						<div class="col-z ziphelp-area">
							<a class="ziphelp" href="#"><img src="img/test40/zipfinder.png"><span data-zip="move_to">ZIP Help?</span></a>
						</div>
					</div>
					<div class="moving-to edit">
						<h6>MOVING TO:</h6>
						<div><span id="moving-from-text" data-zip="move_to">Los Angeles, CA 90036</span><a id="moving-to-text-edit" href="#">Edit</a></div>
					</div>
					<div class="moving-date">
						<div class="col-q">
							When is your move?
						</div>
						<div class="col-i">
							<input id="move-date" type="text" name="move_date" value="" placeholder="Choose A Date" readonly>
							<div class="cal-area">
								<div class="cal-arrow"></div>
								<div id="cal"></div>
							</div>
						</div>
					</div>
					<div class="moving-size">
						<div class="col-q">
							How large is your move?
						</div>
						<div class="col-i">
							<div id="select-arrow"></div>
							<select name="move_size" id="move_size">
								<option class="select-inactive" value="" selected>Enter Move Size</option>
								<option class="select-active" value="Moving Boxes Only">Box Only</option>
								<option class="select-active" value="Studio">Studio</option>
								<option class="select-active" value="1 Bedroom">1 Bedroom</option>
								<option class="select-active" value="2 Bedrooms">2 Bedrooms</option>
								<option class="select-active" value="3 Bedrooms">3 Bedrooms</option>
								<option class="select-active" value="4 Bedrooms">4 Bedrooms</option>
								<option class="select-active" value="5 Bedrooms">5 Bedrooms</option>
								<option class="select-active" value="6 Bedrooms">6 Bedrooms</option>
								<option class="select-active" value="Commercial Move">Commercial Move</option>
							</select>
						</div>
					</div>
					<div>
						<div class="col-q">
							&nbsp;
						</div>
						<div class="col-i">
							<button id="calculate" class="submit-form">CALCULATE</button>
						</div>
					</div>
					</form>
				</div>
				<div class="parallelogram"></div>
				<div class="movers">
					<img src="img/test40/usa-map.png">
				</div>				
				<div class="bvl-logos">
					<span class='verisign'><img src="img/test40/verisign.png"></span>
					<span class="bbb"><img src="img/test40/bbb.png"></span>
					<span class="lock"><img src="img/test40/lock.png"><span class='priv-and-terms'><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></span></span>
				</div>
			</div>
		</section>
		<section id="step3" class="step">
			<div class="container">
				<div class="steps-completed">
					<div class="blue-col">
						Step 1: Completed
					</div><div class="blue-col middle">
						Step 2: Completed
					</div><div class="light-col last">
						Step 3: Get Quotes
					</div>
				</div>
				<div class="loader-area">
					<h2>Calculating...</h2>
					<div id="loader3"><div id="current-percent">0%</div></div>
				</div>
				<div class="movers-found">
					<div class="movers-found-title">
						<span><img src="img/test40/check-green.png"></span><span class="text">Movers Found</span>
						<span><img src="img/test40/check-gray.png"></span><span class="text next">Next Step: View Your Estimate</span>
					</div>
					<div class="movers-found-body">
						<p>Movers will contact by phone or email with their quotes and our system will also display your estimated quote.</p>
					</div>
				</div>
				<div class="form-area">
					<form id="f-step3">
						<div>
							<div class='col-n'>Full Name</div>
							<div class="col-i4 first"><input type="text" name="first_name" value="" placeholder="First"></div>
							<div class="col-i4"><input type="text" name="last_name" placeholder="Last"></div>
						</div>
						<div>
							<div class='col-n'>Valid Email</div>
							<div class="col-i3"><input name="email" type="text" value="" placeholder="Email Address"></div>
						</div>
						<div>
							<div class='col-n'>Valid Phone</div>
							<div class="col-i3"><input type="tel" id="phone_number" name="phone_number" value="" placeholder="Phone Number"></div>
						</div>
						<div>
							<div class='col-n'>
								<p id="legal">By clicking on "Get My Quotes" you agree to the terms below.</p>
							</div>
							<button class="submit-form" id="get-my-quotes">GET MY QUOTES</button>
						</div>
					</form>
				</div>
				<div class="right-col">
					<div class="moving-info">
						<div id="update-my-info">
							<form id="f-step3-u">
								<div class="moving-info-edit">
								</div>
								<div class="edit-area">
									<div class="row u-moving-from">
										<div class="col-i">
											<h4>Where are you moving from?</h4>
										</div>
										<div class="col-t">
											<input name="move_from2" class="zipc" type="tel" placeholder="From Zip" data-zip="from_zip">
										</div>
										<div class="col-z">
											<a class="ziphelp" href="#"><img src="img/test40/zipfinder.png"><span data-zip="from_zip">ZIP Help?</span></a>
										</div>
									</div>
									<div class="row u-moving-to">
										<div class="col-i">
											<h4>Where are you moving to?</h4>
										</div>
										<div class="col-t">
											<input name="move_to2" class="zipc" type="tel" placeholder="To Zip" data-zip="move_to">
										</div>
										<div class="col-z">
											<a class="ziphelp" href="#"><img src="img/test40/zipfinder.png"><span data-zip="move_to">ZIP Help?</span></a>
										</div>
									</div>
									<div id="update-zip">
										<div class="col-i">
											&nbsp;
										</div>
										<div class="col-t">
											<button id="update" class="submit-form">UPDATE</button>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div id="show-my-info">
							<div class="trip-info">
								<div class="field-trip1">
									<span><img src="img/test40/tiny-cal.png">&nbsp;<span id="field-trip-date">Feb. 25th</span></span>
									<span><img src="img/test40/tiny-bed.png">&nbsp;<span id="field-trip-size">3 BR</span></span>
									<span>
									<img src="img/test40/tiny-car.png">&nbsp;<span id="field-trip-length">Trip length 921 miles</span></span>
								</div>
								<div class="field-trip2">
									<p><span id="field-trip-from-zip" data-zip="from_zip">Chestnut Mountain, GA 36001</span> - <span id="field-trip-to-zip" data-zip="move_to">Los Angeles, CA 90036</span> <a id="field-trip-edit" href="#">Edit</a></p>
								</div>
							</div>
							<div class="google-map" id="map_canvas">
							</div>
						</div>
					</div>
					<div class="bvl-logos">
						<span class='verisign'><img src="img/test40/verisign.png"></span>
						<span class="bbb"><img src="img/test40/bbb.png"></span>
						<span class="lock"><img src="img/test40/lock.png"><span class='priv-and-terms'><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></span></span>
					</div>
				</div>
			</div>
		</section>
		<section id="step4" class="step">
			<div class="container">
				<div class="thank-you-area loading">
					<h4>Now Calculating Your Estimated Quote</h4>
					<div class="loader">
						<div id="current-percent">0%</div>
					</div>
				</div>
				<div class="thank-you-area finished">
					<h4>Thank you John Smith</h4>
					<h1>Movers With Your Actual Quote Will Now Contact You.</h1>
					<div class="loader">
						<div id="current-percent">Estimated Quote is $4,004 - $8,008</div>
					</div>
					<p>This price range is not an actual quote and is based on industry averages.  3 bedroom house shipments can vary in size.  You may need additional services like packing.  Tariff pricing is different for each moving industry.</p>
				</div>
			</div>
		</section>
	</div>
	<div class="giant-loader">
		<div class="container">
			<div class="moving-people">
				<img src="img/test40/stock-img-1.png">
			</div>
			<div id="giant-parallelogram" class="parallelogram">
				<div class="loader-circle">
					<img src="img/test40/large-check.png">
				</div>
				<div class="loader-text">
					<h1 class="calc">CALCULATING...</h1>
					<h1 class="search">SEARCHING FOR MOVERS</h1>
					<h1 class="found">MATCHING MOVERS WERE FOUND</h1>
				</div>
			</div>
		</div>
	</div>
	<div class="zipcode-helper">
		<div class="zip-arrow"></div>
		<h3>ZipCode Helper</h3>
		<form>
			<input id="zipfinder" placeholder="City, State" autofocus>
		</form>
	</div>
	<aside id="sidebar">
		<div class="container">
			<div class="sub-step sub-step1 active">
				<div class="how-it-works-title">
					<h2>How It Works?</h2>
				</div>
				<div class="col list">
					<img src="img/test40/list.png">
					<p>1. Enter move details</p>
				</div>	
				<div class="col coins">
					<img src="img/test40/coins.png">
					<p>2. View estimated cost</p>
				</div>
				<div class="col cash">
					<img src="img/test40/cash.png">
					<p>3. Get quote from movers</p>
				</div>
			</div>
			<div class="sub-step sub-step2">
				<div class="how-it-works-title">
					<h2>What is it based on?</h2>
				</div>
				<div class="col2 weight">
					<span><img src="img/test40/view2-box.png"></span>
					<span class="title">Weight</span>
					<p>The weight of your inventory is one of the major factors your quote is based on.</p>
				</div>
				<div class="col2 distance">
					<span><img src="img/test40/view2-map.png"></span>
					<span class="title">Distance</span>
					<p>Fuel charges and toll fees will increase as your distance becomes greater.</p>
				</div>
				<div class="col2 timing">
					<span><img src="img/test40/view2-cal.png"></span>
					<span class="title">Timing</span>
					<p>Off-peak season moves are relatively cheaper than peak season.</p>
				</div>
				<div class="col2 extra">
					<span><img src="img/test40/view2-hands.png"></span>
					<span class="title">Extra Services</span>
					<p>Adding on extra services like specialty packing will increase your quote.</p>
				</div>
				<div class="col2 origin">
					<span><img src="img/test40/view2-gps.png"></span>
					<span class="title">Origin & <br><span class="dest">Destination</span></span>
					<p>The start and end of your move can affect the price depending on the route's popularity.</p>
				</div>
			</div>
			<div class="sub-step sub-step3">
				<div class="questions">
					<h4>Question:</h4>
					<div>
						<ul>
							<li id="q1">How do you calculate my moving quote?</li>
							<li id="q2">Who can I expect to contact me?</li>
							<li id="q3">What is Budget Van Lines?</li>
						</ul>
					</div>
					
				</div>
				<div class="answers">
					<h4>Answer:</h4>
					<p id="a1">We use several details of your move to create each individual moving quote.  The price range is based on the size of your inventory, the date you're moving, the distance of your move and that particular route's popularity.  Any extra services you'll need will also affect your moving quote. All these factors play a major role in shaping the price of your move.</p>
					<p id="a2"> When submitting your information to BudgetVanLines.com, you'll receive multiple moving quotes from companies that can service your specific route so you don't waste time talking to companies that can't. These companies compete for your business, assuring you the best possible price. All companies in the network are licensed by the FMCSA and will contact you with individual moving quotes. </p>
					<p id="a3">Budget Van Lines is the nation's largest household goods moving broker. We carry a wide range of licensed and reputable carriers in our network that service long distance moves across the country. BudgetVanLines.com allows you to receive competing quotes from licensed movers available for your move as well as an individual quote from Budget Van Lines. </p>
				</div>
			</div>
			<div class="substep-arrow left"><a href=""><i class="arr-left"></i></a></div>
			<div class="substep-arrow right"><a href="">					<i class="arr-right"></i></a></div>
		</div>

		</div>
	</aside>
	<div class="disclaimer">
		<div class="container">
		<p id="quotes-disc">By clicking on the "Get My Quotes" button I am verifying that I am over 18 years of age and agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.  My "click" is my expressed written consent to be contacted via email, text, SMS or phone (including the use of autodialed calls or prerecorded calls) by Budget Van Lines, inc. and its moving partners that can quote or service my move, as well as companies offering other useful products or services.  My consent supercedes any registration on any do-not-call list.  Consent is required to proceed, but is not a condition of any purchase.</p>
		<p>*Disclaimer: Once submitting a quote request on BudgetVanLines.com, based on your search criteria, our system will match you with licensed third party companies that can service your route.  Budget Van Lines Inc, a federally licensed moving broker, could also be one of the companies competing for your business.  Budget Van Lines is not a motor carrier and does not own moving trucks.  Budget Van Lines will generate a quote for you based on the details of your intended move, as well as the availability of licensed motor carriers in Budget Van Lines' network.</p>
		</div>
	</div>
	<footer class="steps">
		<div class="container">
			<p>Copyright 2015 &copy; <a href="http://www.budgetvanlines.com">www.BudgetVanLines.com</a></p>
		</div>
	</footer>
	<footer class="thanks">
		<div class="container">
			<div class="thanks-main">
				<div class="thanks-subsection">
					<h3>Taking the stress out of moving</h3>
					<p>The search for your movers is done.  You don't need to fill out any other forms, just sit back, relax, and multiple movers will be in touch with you to give you competing quotes for your specific move.</p>
				</div>
				<div class="thanks-subsection">
					<h3>Your quotes are on the way</h3>
					<p>Your estimated quote will be sent to your email and our movers will soon contact you by phone.  Be ready to speak with your movers regarding your inventory to receive a more accurate quote.</p>
				</div>
			</div>
			<div class="thanks-disclaimer">
				<p>*Disclaimer: Once submitting a quote request on <a href="#">BudgetVanLines.com</a>, based on your search criteria, our system will match you with licensed third party companies that can service your route.  Budget Van Lines Inc, a federally licensed moving broker, could also be one of the companies competing for your business.  Budget Van Lines is not a motor carrier and does not own moving trucks.  Budget Van Lines will generate a quote for you based on the details of your intended move, as well as the availability of licensed motor carriers in Budget Van Lines' network.</p> 
			</div>
			<div class="thanks-copyright">
				<p>Copyright 2015 &copy; <a href="#">www.BudgetVanLines.com</a>
			</div>
		</div>
	</footer>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.12.0-beta.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins.js"></script>

<script type="text/javascript" src="js/script.js"></script>
</body>
</html>