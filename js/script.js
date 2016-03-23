/*====================================  
 Test 40: Custom JS
=====================================*/

$(document).ready(function(){
	$("button").removeAttr('disabled');
	
	//Global: Cache 
	var cache = {
		distance:0,
		moveSize:0,
		moveDate:'',
		toZip:'',
		fromZip:'',
	};
	
	function lazyloadImages(images){
		function imgLoad(imgId, link){
			$img = $("<img>");
			$img.load(function(){
				$(imgId).attr("src", $(this).attr("src"));
			});
			$img.attr('src',link);
		}		
		images.forEach(function(value, index){
			var id = value.id,
				link = "img/test40/"+value.link;
				imgLoad(id, link);
		});		
			
	}
	
	//Global: Privacy Policy, Terms & Conditions, Disclaimer
	$(".privacy-policy").click(function(e){
		e.preventDefault();
		var w = screen.width;
		var left = w - 350;
		var top = 0;
		window.open(
			'/info/privacy-policy',
			'Privacy_Policy',
			'width=350,height=550,scrollbars=1,top='+top+',left='+left
		);
	});
	$(".terms-of-use").click(function(e){
		e.preventDefault();
		var w = screen.width;
		var left = w - 350;
		var top = 0;
		window.open(
			'/info/terms-of-use',
			'Terms_of_Use',
			'width=350,height=550,scrollbars=1,top='+top+',left='+left
		);
	});
	//Global: Animates each div left
	function animateLeft(step1, step2){
		var lf = 0; 
		$(".zipcode-helper").hide();
		var intv = setInterval(function(){ 
			lf-=15;  
			$('#' + step1).css('margin-left', lf + 'px');
	
			if(lf < -1500){
				clearInterval(intv);
				var px = parseInt($('#' + step2).css('margin-left'));
				$('#' + step1).hide();
	
				callback(px);
			}	
		}, 1);
		function callback(lf2){
			$('#' + step2).show();
			var intv = setInterval(function(){ 
				lf2-=15; 
				$('#' + step2).css('margin-left', lf2 + 'px');
	
				if(lf2 == 0){
					clearInterval(intv);
	
				}
				
			}, 1);
		}
	}
	
	//Global: Submit Form Data -> Animate
	function validationSuccess(submitBtn){
	
		if($(submitBtn).attr('id') == "update")
			return;
	
		var stepA = $(submitBtn).closest('section').attr('id');
		
		var step = stepA.substr(0, 4);
		var num = parseInt(stepA.slice(-1));
		num++;
		
		var stepB = step + num;
		
		//Hide whatever absolute divs are on screen
		if($("aside#sidebar").is(':visible')){
			$("aside#sidebar").hide();
		}
		if(stepB == "step2"){
			animateLeft(stepA, stepB);
		}
	
		if(stepB == "step3"){
			//show giant loader
			$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOAFjKE8xQUWxlVds1COiroKVmYjH8SoM&sensor=true&callback=initialize&v=3.20')
			cache.fromZip = $("#f-step2 input[name=zip_from]").val();
			cache.toZip = $("#f-step2 input[name=zip_to]").val();
	
			var start = cache.fromZip;
			var end = cache.toZip;
	
			$(".background, .disclaimer").hide();
			animateLeft(stepA, stepB);	
			$(".giant-loader").show();
			
			//Cache current from and to zip values
	
			
			$("footer").addClass('giant-loader-active');
			var options = {
				div:'giant-parallelogram',
				maxWidth:766,
				seconds:2.2 //not true seconds because jquery takes 300ms per action, so eh
			}
			//50 x 766 width = 38,300 iterations
			//38,300 / 3600 ( iter / 60 milliseconds / 60 seconds) in sec
			//~10 seconds 
			
			function callback1(){
				$(".loader-text .calc").hide();
				$(".loader-text .search").show();
				calculateDistance(start, end, function(result){
					cache.distance = result;
					$("#field-trip-length").text("Trip length " + result);
				});
			}
					
			function callback2(){
				$(".loader-text .search").hide();
				$(".loader-text .found").show();
				$(".loader-circle").show();
	
				setTimeout(function(){
					googleMap(start, end);
					$(".giant-loader").hide();
					$("footer").removeClass('giant-loader-active');
					$(".disclaimer p").css('width', '923px');
					$(".background, .disclaimer").show();
					$("#quotes-disc").show();	
				}, 1000);
			}
			
			animateGreenLdr(options, callback1, callback2);
		}
	
		if(stepB == "step4"){
			animateLeft(stepA, stepB);
			$(".background").css('min-height', 'initial');
			$("footer.steps, .disclaimer").hide();
			$("footer.thanks").show();
			$(".thank-you-area .finished").hide();
			$(".thank-you-area .loading").show();
			
			
			setTimeout(function(){
	
				setTimeout(function(){
					var time = 0;
					var timer = setInterval(function(){
						time++;
						$("#current-percent4").html(time + "%");
						if(time >= 100){
							clearInterval(timer);
						}
					}, 37);
	
					animateGreenLdr({
						div:'loader4',
						maxWidth:940,
						seconds:1
					}, function(){
						
						var fullname = $("#first_name").val() + " " + $("#last_name").val();
						$(".thank-you-area.finished h4").text("Thank you "+ fullname);					
						$.post('/validate/calculator/calc', {rooms:cache.moveSize, miles:cache.distance}).done(function(result){
							result = JSON.parse(result);
							
							var min = result.self_service_small.min;
							var max = result.full_service_p_large.max;
							$(".thank-you-area.finished #current-percent").text("Estimated quote is $" + min + " - $" + max);
							
						});
											
					}, function(){
						$(".thank-you-area").hide();
						$(".thank-you-area.finished").show();
					});
				}, 600);
			}, 600);
		}
	};
	//Step 2: Animate Green Loaders
	function animateGreenLdr(options, callback1, callback2){
		if(options === undefined) return;
	
		options.seconds = (options.seconds == null) ? 10 : options.seconds; 
		
		var id = "#" + options.div;
		var width = parseInt($(id).css('width'));
		var maxWidth = options.maxWidth;
		var speed = (options.seconds * 3600) / maxWidth;
		
		var intv = setInterval(function(){
			width +=1;
	
			$(id).css('width', width + 'px');
			var halftime = maxWidth / 2;
			
			//Fire off callback1 at the half
			if(parseInt($(id).css('width')) === halftime){
				callback1();
			}
	
			//Fire off callback2 when animation finished
			if(parseInt($(id).css('width')) >= maxWidth){
				clearInterval(intv);
				callback2();
			}
		}, speed);
	}
	
	//Global: Ziphelp
	 $("body").click(function(e){
	 	var target = $(e.target);
	 	//if the target element is inside the zipcode helper
	 	//return true or false
	 	var childOfZip = !!(target.closest('.zipcode-helper').length);
	 	//if zipcode-helper is visible and clicking 
	 	//is not inside the zipcode helper, hide zipcode-helper
	 	if($(".zipcode-helper").is(":visible") && !childOfZip){
	 	 	$(".zipcode-helper").hide();
	 	}
	 	//on focus input -- need to show an absolute
	 	//div next to input with lis of all ajax'd 
	 	//cities and states
	 });
	
	var input, 
		target, 
		zipf, 
		form;
		var i=0;

	var isKeyPress = false;
	
	document.onkeydown = function(event) {
	   if (event.keyCode == 13) {
	      isKeyPress = true;
	   }
	}

	$(".ziphelp").on('click', function(e){
		//stops body from also registering click
		e.stopPropagation();
		e.preventDefault();
		
		//if(isKeyPress) return;
		//$(document).clearQueue();
		//can prob fix this to get end pos of link
		var posX, posY;
		//console.log(e.pageX, e.pageY);
		if(e.pageX !==0 && e.pageY !==0){
			posX = (e.pageX + 40) + "px";
			posY = (e.pageY - 20) + "px";
			var code = e.keyCode || e.which;

			setTimeout(function(){
				$("#zipfinder").focus();
			}, 200);
		
			$(".zipcode-helper").css({
				top: posY,
				left: posX
			});
					
			$(".zipcode-helper").toggle();
		
			target = $(this);
	
			zipf = target.find('span').attr('data-zip');
			form = target.closest('form');
			input = form.find('input[data-zip='+zipf+']');
			
			$(".zipcode-helper input").unbind();
		}
		
		$(".zipcode-helper input").on('keyup', function(e){
			$(document).clearQueue();
			var code = e.keyCode || e.which;
			var letter = String.fromCharCode(code);
			var inputZ = $(this);
			var searchTerm = inputZ.val();
			
			inputZ.removeClass('validation-error');
			
			if(searchTerm == "") {
				$("input.open").removeClass("open");
				$(".zipline").hide();
				$("#results").hide();
			}
			else if(letter.match(/[a-zA-Z0-9]+/) !== null){
				
				function getJSON(results){
					$("#results ul").html("");
					//results = JSON.parse(results);
					
					$.each(results, function(k,v){
	
						var li = "<li><a class='result-zipcode' href='' data-zipcode='"+v+"'>" + k + "</a></li>"
						$("#results ul").append(li);
	
					});
					
					//Mouse Click
					$(".result-zipcode").click(function(e){
						e.preventDefault();
						var zip = $(this).attr('data-zipcode');
						//console.log(zipf);
						if(zipf == "from_zip"){
							$('input[data-zip='+zipf+']').val(zip).trigger('change').closest('form').valid();
						}
						if(zipf == "move_to"){ 
							$('input[data-zip='+zipf+']').val(zip).trigger('change').closest('form').valid();
						}
						$("input").removeClass('open');
						$(".zipcode-helper input").val('');
						$("#results ul").html('');
						$(".zipline").hide();
						$(".zipcode-helper").hide();

					});
	
					$(".zipline").show();

					if(results.length !==0){
						$("input").addClass('open');
						$("#results").show();
						$(".zipline").show();
						$("#results li:first-child").addClass('active');
					}else {
						$("input").removeClass('open');
						$(".zipline").hide();
						$("#results ul").html('');
						$("#results").hide();
						
					}
				}
				// $.post('validate/CityState/searchForCityState',{search_term:searchTerm}).done(getJSON);
				$.get('http://localhost:1337').done(getJSON);
			}			
			
			//keyboard support
			var curr = $(".zipcode-helper #results ul li.active");
			var prev = curr.prev();
			var next = curr.next();
			var results = $("#results ul");
			results.scrollTop(0);

			//down
			if(code == 40 && next.length!==0){

				results.scrollTop(curr.position().top)
				curr.removeClass('active');
				next.addClass('active');
					
			//up							
			}else if(code == 38 && prev.length!==0) {
				//up
				results.scrollTop(prev.position().top)
				curr.removeClass('active');
				prev.addClass('active');
			
			//enter
			}else if (code == 13){
			
				e.preventDefault();
				
				var zip = curr.find('a').attr('data-zipcode');
				//console.log(zipf, zip);

				if(zipf == "from_zip"){
					if(zip !==undefined && zipf !==undefined){
					
						$('input[data-zip='+zipf+']').val(zip).trigger('change').closest('form').valid();
					}else {
						inputZ.addClass('validation-error');
					}
				}
				if(zipf == "move_to" && zipf !==undefined){ 
					if(zip!==undefined){

						$('input[data-zip='+zipf+']').val(zip).trigger('change').closest('form').valid();
					}else {
						inputZ.addClass('validation-error');
					}
				}
				if(zip !== undefined && zipf !== undefined) {
					$(".zipcode-helper input").val('');
					$("input.open").removeClass("open");
					$(".zipline").hide();
					$("#results ul").html('');
					$(".zipcode-helper").hide();
					
				}

			}
		});
	});
	
	function cacheMoveDate(){
		var date = $("#move-date").val();
		cache.moveDate = date;
		date = new Date(date);
		var months = ['Jan', 'Feb', 'Mar', 
					 'Apr', 'May', 'Jun', 'Jul', 'Aug',
					 'Sep', 'Oct', 'Nov', 'Dec'];
	
	
		var month = months[date.getMonth()];
		var day = date.getDate();
		day = day.toString();
		var mapper = {
			'1':'st',
			'2':'nd',
			'3':'rd'
		}
		if(day.length > 1){
			if(day.charAt(0) == "1"){
				day = day + "th";
			}else {
				if(day.charAt(1) == "1" || day.charAt(1) == "2" || day.charAt(1) == "3"){
					day = day + mapper[day.substr(1)];			
				}else {
					day = day + "th";
				}
			}
		}
		else if(day.length == 1) {
			if(day == "1" || day == "2" || day == "3"){
				day = day + mapper[day];			
			}else {
				day = day + "th";
			}
		}
	
		var year = date.getFullYear(); //getYear returns Y2K bug lol
	
		var formatted_date = month + " " + day;
	
		$('#field-trip-date').text(formatted_date);
	}
	
	function cacheMoveSize(){
		var size = $("#move_size").val();
		cache.moveSize = size;
		var map = {
			'moving boxes only':'BOX',
			'studio':'STDI',
			'one bedrooms apartment':'1 BR',
			'one bedrooms house':'1 BR',
			'two bedrooms apartment':'2 BR',
			'two bedrooms house':'2 BR',
			'three bedrooms apartment':'3 BR',
			'three bedrooms house':'3 BR',
			'four bedrooms apartment':'4 BR',
			'four bedrooms house':'4 BR',
			'five bedrooms apartment':'5 BR',
			'five bedrooms house':'5 BR',
			'six bedrooms apartment':'6 BR',
			'six bedrooms house':'6 BR',
			'six bedrooms and more apartment':'COMM',
			'six bedrooms and more house':'COMM'
		}
		size = map[size];
		$('#field-trip-size').text(size);
	}
	
	$("#move-date").on('change', cacheMoveDate());
	$("#move_size").on('change', cacheMoveSize());
	
	//Step 2: Show City via ZipCode (Google Maps Ajax)
	$(".zipc").on('change', function(e){
		var zip = $(this).val();
		var dataZip = $(this).attr('data-zip');
		
		$('.edit span[data-zip='+dataZip+']').text('');
		$.get('https://maps.googleapis.com/maps/api/geocode/json?&address='+zip)
			.done(function(data){
				try {
					var address = data.results[0].formatted_address;
					
					var delimeter = ",";
					address = address.split(delimeter);
					address = address[0] + ", " + address[1]; 
					
					
				$('.edit span[data-zip='+dataZip+'], .field-trip2 span[data-zip='+dataZip+']').text(address);
				}catch(e){
					//
				}
			});
	
	});
	
	//Step 3: Calculate Distance between two zips (Google Maps)
	//Requires a callback function
	function calculateDistance(start, end, cb){
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
			origins: [start],
			destinations: [end],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			avoidHighways: false,
			avoidTolls: false
		}, function callback(response, status){
			if(status == "OK"){
				cb(response.rows[0].elements[0].distance.text);
			}
		});
	}
	
	//Step 3: Initialize Google Maps after Step 2 Loader
	var directionDisplay,
		directionsService,
		map;

	//Step 3: Draw & Update Google Map given two zips, start and end
	function googleMap(start, end){
		var mapOptions = {
			zoom:8,
			scrollwheel:true,
			navigationControl:true,
			mapTypeControl:true,
			scaleControl:true,
			draggable:true,
			disableDoubleClickZoom:true,
			disableDefaultUI:true,
			mapTypeId: google.maps.MapTypeId.DEFAULT
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
		var directionsOptions = {
			markerOptions: {clickable: false}
		};
		
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		directionsDisplay.setOptions(directionsOptions);
	
		var request = {
			origin:start,
			destination:end,
			optimizeWaypoints:true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
				var route = response.routes[0];
		  }
		});
	}
	
	//Global: Mask Inputs (Prevent Bad Numbers)
	$("input[type=tel]").mask('99999', {
		placeholder:""
	});
	$("#phone_number").mask('(999) 999-9999', {
		placeholder: ""
	});
	
	//Global: Validations
	//Step 1: Validation
	$("#f-step1").validate({
		rules: {
			zip_from:{
				required:true,
				minlength:5,
				maxlength:5,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/from-zipcode'
				// }
			}
		},
		errorPlacement:function(error, element){
		},
		focusInvalid:false,
		invalidHandler:function(form, validator){
		},
		errorClass:'validation-error',
		submitHandler:function(form){
	
			var submitBtn = $(form).find('.submit-form');
			try{
				_gaq.push(['_trackEvent', 'desktop', '999moving', 'step1-test40']);
			}catch(e){
				
			}
			cache.fromZip = $("#f-step1 input[name=zip_from]").val();
			
			//Lazy load step2 images
			var stepTwoImages = [{
				link:'stock-img-1.png',
				id:'#moving-people-img'
			},
			{
				link:'usa-map.png',
				id:'.movers img'
			},
			{
				link:'large-check.png',
				id:'.loader-circle img'
			}];
	
			lazyloadImages(stepTwoImages);

			$("#f-step2 input[name=zip_from]").val(cache.fromZip);
			validationSuccess(submitBtn);
		}
	});
	

	
	
	//Step 2: Validation
	$("#f-step2").validate({
		rules: {
			zip_from:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/from-zipcode'
				// }
			},
			zip_to:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/to-zipcode'
				// }
			},
			move_date:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/movedate'
				// }
			},
			number_of_rooms:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/rooms'
				// }
			}
		},
		messages:{
		},
		errorPlacement:function(error, element){
		},
		focusInvalid:false,
		invalidHandler:function(form, validator){
		},
		errorClass:'validation-error',
		submitHandler:function(form){
			var submitBtn = $(form).find('.submit-form');
			try{
				_gaq.push(['_trackEvent', 'desktop', '999moving', 'step2-test40']);
			}catch(e){
				
			}
			cache.toZip = $("#f-step2 input[name=to_zip]").val();
			cacheMoveDate();
			cacheMoveSize();
			
			//Lazy load step3 images
			var stepThreeImages = [{
				link:'check-green.png',
				id:'#green-check-img'
			},
			{
				link:'check-gray.png',
				id:'#gray-check-img'
			},
			{
				link:'tiny-cal.png',
				id:'#tiny-cal'
			},
			{
				link:'tiny-bed.png',
				id:'#tiny-bed'
			},
			{
				link:'tiny-car.png',
				id:'#tiny-car'
			}];
	
			lazyloadImages(stepThreeImages);
			
	
			var zipFrom3 = $('#f-step3-u input[name=zip_from]').val(),
				zipTo3 = $('#f-step3-u input[name=zip_to]').val();
		
			$(zipFrom3).val(cache.fromZip);
			$(zipTo3).val(cache.toZip);
			
		
			validationSuccess(submitBtn);
		}
	});
	//Step 3: Validation
	$("#f-step3").validate({
		rules: {
			first_name:{
				required:true,
				minlength: 2,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/firstname'
				// }
			},
			last_name:{
				required:true,
				minlength: 2,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/lastname'		
				// }
			},
			email_address:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/email'
				// }
			},
			phone_number:{
				required:true,
				phoneUS: true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/phone'
				// }
			}
		},
		messages:{
		},
		errorPlacement:function(error, element){
		},
		focusInvalid:false,
		invalidHandler:function(form, validator){
		},
		errorClass:'validation-error',
		submitHandler:function(form){
			
			queueSubmission();
			
			var submitBtn = $(form).find('.submit-form');
			validationSuccess(submitBtn);
		}
	});
	//Step 3: Update Info Validation
	$("#f-step3-u").validate({
		rules: {
			zip_from:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/from-zipcode'
				// }
			},
			zip_to:{
				required:true,
				// remote: {
				// 	type: 'post',
				// 	url: '/validate/validate/to-zipcode'
				// }
			},
		},
		messages:{
		},
		errorPlacement:function(error, element){
		},
		focusInvalid:false,
		invalidHandler:function(form, validator){
		},
		errorClass:'validation-error',
		submitHandler:function(form){
			var zipFrom = $('#f-step3-u input[name=zip_from]').val(),
				zipTo = $('#f-step3-u input[name=zip_to]').val();
			
			if((zipFrom == cache.fromZip) && ( zipTo == cache.toZip))
			{
				//Don't update because the zips are the same
				$("#update-my-info").hide();
				$("#show-my-info").show();
			}else {
				//Redraw map
				(cache.fromZip == zipFrom) ? '': cache.fromZip = zipFrom;
				(cache.toZip == zipTo) ? '' : cache.toZip = zipTo;
			
				var start = cache.fromZip;
				var end = cache.toZip;
		
				$(".movers-found").hide();	
				$(".loader-area").show();
		
				//Animate Green Loader
				var options = {
					div:'loader3',
					maxWidth:692,
					seconds:1 
				}
				var time = 0;
				var timer = setInterval(function(){
					time++;
					$("#current-percent").html(time + "%");
					if(time >= 100){
						clearInterval(timer);
					}
				}, 35);
		
				animateGreenLdr(options, function(){
					
				}, function(){
		
		
					var request = {
						origin:start,
						destination:end,
						optimizeWaypoints:true,
						travelMode: google.maps.DirectionsTravelMode.DRIVING
					};
					directionsService.route(request, function(response, status) {
					  if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
							var route = response.routes[0];
		
					  }
					});
					
					//After we update the zip, we need to get and cache the new distance.  Distance + moveSize are the arguments we need for our equate validate/calc controller
					calculateDistance(start,end,function(result){
						cache.distance = result;
						$("#field-trip-length").text("Trip length " + result);
						$(".loader-area").hide();
						$(".movers-found").show();	
						$("#update-my-info").hide();
						$("#show-my-info").show();
						$("#loader3").css('width', '0px');
					});
				});
	
			}
		}
	});
	
	//Individual Steps Only
	var asideImg = {
		loaded:false
	};
		
	//Step 1: Info Btn
	$(".info").click(function(){
		var images = [
		{
			link:'list.png',
			id:'.col.list img'
		},
		{
			link:'coins.png',
			id:'.col.coins img'
		},
		{
			link:'cash.png',
			id:'.col.cash img'
		},
		{
			link:'view2-box.png',
			id:'.col2.weight img'
		},
		{
			link:'view2-map.png',
			id:'.col2.distance img'
		},
		{
			link:'view2-cal.png',
			id:'.col2.timing img'			
		},
		{
			link:'view2-hands.png',
			id:'.col2.extra img'
		},
		{
			link:'view2-gps.png',
			id:'.col2.origin img'
		}];
		

		if(!asideImg.loaded){
			lazyloadImages(images);
			asideImg.loaded=true;
		}
		$("#sidebar").toggle();
	});
	
	//Step 1: Subslides Carousel
	$(".substep-arrow.left a").click(function(e){
		e.preventDefault();
		var subSteps = $(".sub-step");
		var activeSlide = $(".sub-step.active");
		
		if(activeSlide.is('.sub-step1')){
			activeSlide.removeClass('active');
			$(".sub-step3").addClass('active');
	
		}else {
			activeSlide.removeClass('active');
			activeSlide.prev().addClass('active');
		}
	});
	$(".substep-arrow.right a").click(function(e){
		e.preventDefault();
		var subSteps = $(".sub-step");
		var activeSlide = $(".sub-step.active");
		
		if(activeSlide.is('.sub-step3')){
			activeSlide.removeClass('active');
			$(".sub-step1").addClass('active');
	
		}else {
			activeSlide.removeClass('active');
			activeSlide.next().addClass('active');
		}
	});
	
	//Step 1: Subslides Mouseover Third Step
	$(".sub-step3").mouseover(function(e){
		var target = $(e.target);
		var id = target.attr('id');
		if(id != undefined){
			var num = id.substr(1);
			var a = '#a'+num;
			$(".answers p").hide();
			$(a).show();
		}
	});
	
	//Step 2: Blur Edit Inputs
	$(".moving-from input").on('change', function(){
		var valid = $(this).valid();
		
		if(valid){
			$("#f-step2 .moving-from").hide();
			$(".moving-from.edit").show();
		}
	});
	$(".moving-to input").on('change', function(){
		var valid = $(this).valid();
		
		if(valid){
			$("#f-step2 .moving-to").hide();
			$(".moving-to.edit").show();
		}
	});
	
	//Step 2: Edit Link for Zips
	$("#moving-from-text-edit").click(function(e){
		e.preventDefault();
		$(".moving-from").show();
		$(".moving-from.edit").hide();
	});
	$("#moving-to-text-edit").click(function(e){
		e.preventDefault();
		$(".moving-to").show();
		$(".moving-to.edit").hide();
	});
	
	//Step 2: Select Arrow 
	$("#select-arrow").click(function(){
		$(this).next('select').openSelect();
	});
	
	//Step 2: Datepicker
	$("#cal").datepicker({
			dateFormat: 'mm/dd/yy',
			minDate: 0,
			maxDate: '+90D',
			dayNamesMin: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
			onSelect:function(text){
				$("#move-date").val(text);
				$("#move-date").removeClass('validation-error');
				$(".cal-area").hide();
				$("#move-date").trigger('change');
			}
	});
	$("#move-date").click(function(e){
		$(".cal-area").toggle();
	});
	
	//Step 3: Update Field Trip Info
	$("#field-trip-edit").click(function(e){
		e.preventDefault();
		$("#show-my-info").hide();
		$("#update-my-info").show();
	});
	
	//Step 3: Queue Submission
	function queueSubmission(){
		$.post('/validate/validate/send',{
			source: $('#source').val()
		});
		//conversionScripts();
	}
	
	//Step 3: Conversion Scripts
	function conversionScripts(){
		//Yahoo DOT
		window.dotq=window.dotq||[];
		window.dotq.push({projectId:'10001059850032',properties:{pixelId:'431153',qstrings:{et:'custom',ea:'conversion'}}});
		
		//UETQ	
		window.uetq = window.uetq || [];
		window.uetq.push({ 'ea':'quote'}); 
		
		//Google
		var google_conversion_id = 1070276245,
			google_conversion_label = "Ls4OCOWhRhCVvaz-Aw";
			
		try{
			_gaq.push(['_trackEvent', 'desktop', '999moving', 'step3-test40']);
			setTimeout(
				function(){
					_gaq.push(['_trackEvent', 'Conversion', 'Landing-test40', 'Validate']);
				}, 100);
			__adroll.record_user({"adroll_segments": "quote_complete"});
		}catch(e){
			
		}
		//google conversion script
		var image = new Image(1,1); 
		image.src = "http://www.googleadservices.com/pagead/conversion/"+google_conversion_id+"/?label="+google_conversion_label + "&script=0";
		$('body').append(image);
		
	}
});

function initialize() {

}

