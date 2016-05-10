/*====================================  
 Test 40: Custom JS
=====================================*/

$(document).ready(function(){
	$("button").removeAttr('disabled');
	
	var mapLoaded, session;

	var s1cache = {
		zipf:null
	};
	var s2cache = {
		zipf:null,
		zipt:null
	};


	//if zip is cached
	// if($("#f-step1 input").val().length == 5 && $("#f-step1 input").val() !="")	{
	// 	session = true;
				
	// 	zipToCity("#step1 .zipc");
		
	// 	var q = $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOAFjKE8xQUWxlVds1COiroKVmYjH8SoM&callback=initialize&v=3');
		
	// 	q.done(function(){
	// 		setTimeout(function(){
	// 			changeGoogleMap($("#f-step1 input").val(), "google-map1")
	// 		}, 500);
	// 	});
	// 	mapLoaded = true;
	// }else {
	// 	$("#cover_people").hide();
	// }

	$("#f-step1 input").on('focus', function(){
		if(!mapLoaded){
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOAFjKE8xQUWxlVds1COiroKVmYjH8SoM&callback=initialize&v=3');
		mapLoaded = true;
		}
	});


	//Global: Cache 
	var cache = {
		distance:0,
		moveSize:0,
		moveDate:'',
		toZip:'',
		fromZip:'',
		mapsLoaded:false
	};

	//Select Styling (default gray)
	if($(".select-inactive option:selected").val() !== ""){
		$(".select-inactive").removeClass('select-inactive');
	}
	
	$(".select-inactive").on('change', function(){
		console.log($('option:selected', this).val())
		if($('option:selected', this).val()!==""){
			$(".select-inactive").removeClass('select-inactive');
		}	
	});
	
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
			$(".zipcode-helper").hide();
		}
		// if(stepB == "step2"){
		// 	var q = new Promise(function(resolve, reject){
		// 		resolve((function(){
		// 			$('#step1').hide().css('margin-left', '-1500px');
		// 			$('#step2').css('margin-left', '0px').show();
		// 		}()));
		// 	});

		// 	q.then(function(){
		// 		changeGoogleMap(s1cache.zipf, "google-map2", 600)
		// 	});
		// }

		
	
		if(stepB == "step3"){
			//show giant loader

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
				seconds:1 //not true seconds because jquery takes 300ms per action, so eh
			}
			//50 x 766 width = 38,300 iterations
			//38,300 / 3600 ( iter / 60 milliseconds / 60 seconds) in sec
			//~10 seconds 
			
			function callback1(){
				$(".loader-text .calc").hide();
				$(".loader-text .search").show();
				calculateDistance(start, end, function(result){
					result = result.slice(0,result.indexOf('m')) + "miles";
					cache.distance = result;
					
					var re = new RegExp(/Out of Bounds/i);
						if(re.test(result)){
							$("#field-trip-length").text(result);				
						}else{
							$("#field-trip-length").text("Move dist: " + result);
						}
				});
			}
					
			function callback2(){
				$(".loader-text .search").hide();
				$(".loader-text .found").show();
				$(".loader-circle").show();
	
				setTimeout(function(){
					var zipFrom3 = $('#f-step3-u input[name=zip_from]'),
						zipTo3 = $('#f-step3-u input[name=zip_to]');

					$(zipFrom3).val(cache.fromZip);
					$(zipTo3).val(cache.toZip);
					setTimeout(function(){googleMap(start, end);}, 500);
					$(".giant-loader").hide();
					$("footer").removeClass('giant-loader-active');
					$(".disclaimer p").css('width', '923px');
					$(".background, .disclaimer").show();
					$("#quotes-disc").show();	
				}, 2000);
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
		if($("#cal").is(":visible")){
			
		 	if(!target.hasClass("hasDatepicker") && 
	        !target.hasClass("ui-datepicker") && 
	        !target.hasClass("ui-icon") && 
	        !target.hasClass("ui-datepicker-next") && 
	        !target.hasClass("ui-datepicker-prev") && 
	        (target.attr('id') != "move-date") && 
	        !$(target).parents(".ui-datepicker").length){
	            $('.cal-area').hide();
	    	}
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
			

			//down
			if(code == 40 && next.length!==0){
				results.scrollTop(0);
				results.scrollTop(curr.position().top)
				curr.removeClass('active');
				next.addClass('active');
					
			//up							
			}else if(code == 38 && prev.length!==0) {
				//up
				results.scrollTop(0);
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


	function changeGoogleMap(zip, id){
		var lat, lng;
		var speed = arguments[2] || 100;

		var q = $.get('https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyD-8Xx0A4yRvS6UsQ7YzY75KxgufqUJ_d4&address='+zip);
		var div = document.getElementById(id);
		//$(div).html('');
		//var movers = $(div).parentsUntil('.movers');
		//movers.remove();
		//$(".movers:eq(0)").css('transform', 'skew(157.45deg)');
		$(div).show();
		$(".overlay-gm1, .overlay-gm3").show();

		q.done(function(data){	
			 try {
				lat = data.results[0].geometry.location.lat.toString();
				lng = data.results[0].geometry.location.lng.toString();

				console.log(lat,lng)

				var latlng = new google.maps.LatLng(lat, lng);
				console.log(latlng)
				var myOptions = {
				    zoom: 8,
			        scrollwheel: true,
				    zoomControl:true,
				    center: latlng,
				    mapTypeId: google.maps.MapTypeId.ROADMAP,
				    navigationControl: false,
			        mapTypeControl: false,
			        scaleControl: false,
			        draggable: true,
			        streetViewControl:false,
			        disableDoubleClickZoom: true,
			         styles: [{
				        stylers: [{
				                hue: "#00c3ff"
				            }, {
				                gamma: .84
				            }, {
				                saturation: 53
				            }, {
				                lightness: -16
				            }]
				      }]
				}

				setTimeout(function(){
					map = new google.maps.Map(document.getElementById(id), myOptions);


					var marker = new google.maps.Marker({
					    position: latlng,
					    map: map,
					     icon: '../bvl40/img/test40/marker_icon.png'
					  });
				}, speed);

				// $("#step2 #zip_to").val('');
				$(".moving-to").show();
				$(".moving-to.edit").hide();

				if($("#step1 .price-text").is(':visible')){
					$("#moving-price-calculator").css('color', 'transparent')
					$("#step1 .price-text").fadeOut();
					cache.fromZip = $("#f-step1 input[name=zip_from]").val();
					$("#f-step2 input[name=zip_from]").val(cache.fromZip);
					setTimeout(function(){
						// $("#step1 .price-text").fadeIn();
						var op = 0;

						
						$('#step1').hide().css('margin-left', '-1500px');
						$('#step2').show().css({
							'margin-left': '0px',
						});
						$('#step2 .steps-completed, #step2 .form-area').css('opacity', 0)
						var intv = setInterval(function(){
							if(op < 1){
								op += 0.1;
								$('#step2 .steps-completed, #step2 .form-area').css('opacity',op)
							}else if(op >= 1.0){
								clearInterval(intv);
							}
						}, 70);

						
					},1000)
				}
					

			 }catch (e){
				console.log(e);
			}
			
		});
	}
	
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
	
	function zipToCity(){
		//takes an input 
		var zip, dataZip, input;
		
		if(typeof arguments[0] === "string"){ 
			input = $(arguments[0]);
			//jquery input string
			zip = $(arguments[0]).val();
			
			dataZip = $(arguments[0]).attr('data-zip');
		}else {
			zip = $(this).val();
			dataZip = $(this).attr('data-zip');
			
		}
		
		$('.edit span[data-zip='+dataZip+']').text('');
		$.get('https://maps.googleapis.com/maps/api/geocode/json?&address='+zip)
			.done(function(data){
				try {
					var address = data.results[0].formatted_address;
					
				var delimeter = ",";
				address = address.split(delimeter);
				address = address[0] + ", " + address[1]; 
					
				//some other placeholder
				if(dataZip == "from_zip"){
					$("#move_from_pl").text(address);
				}
				
				$('.edit span[data-zip='+dataZip+'], .field-trip2 span[data-zip='+dataZip+']').text(address);
				}catch(e){
					//
				}
			});
		}


	$("#step2 .zipc").on('blur', zipToCity);

	
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
		directionsService;

	//Step 3: Draw & Update Google Map given two zips, start and end
	function googleMap(start, end){
		var mapOptions = {
			zoom:8,
			scrollwheel:true,
			navigationControl:true,
			mapTypeControl:true,
			scaleControl:false,
			draggable:true,
			disableDoubleClickZoom:true,
			disableDefaultUI:true,
			mapTypeId: google.maps.MapTypeId.DEFAULT,
			styles: [{
		        stylers: [{
		                hue: "#00c3ff"
		            }, {
		                gamma: .84
		            }, {
		                saturation: 53
		            }, {
		                lightness: -16
		            }]
		      }]
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
		var directionsOptions = {
			markerOptions: {clickable: false}
		};
		
		directionsService = new google.maps.DirectionsService();

	
		var request = {
			origin:start,
			destination:end,
			optimizeWaypoints:true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
 			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);
			directionsDisplay.setOptions(directionsOptions);
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

	//On string greater than 4, run validation
	$("input.zipc").on('keyup', function(){
		if($(this).val().length == 5){
			$(this).valid();
		}
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
		success:function(label, element){

			//prevents extra bubbling
			if($(element).val() != "" && $(element).val().length == 5){
				s1cache.zipf = $(element).val();
				zipToCity("#zip_from");
				
				changeGoogleMap(s1cache.zipf, 'google-map1')
			}
			//prevents extra bubbling
			if(s1cache.zipf != $(element).val()){
				s1cache.zipf = $(element).val();
				changeGoogleMap(s1cache.zipf, 'google-map1')
			}

			
		},
		submitHandler:function(form){
			$('#step1 .movers').hide();
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
		success:function(label, element){
			if(s2cache.zipf == null){
				s2cache.zipf = s1cache.zipf;
			}
			if(element.dataset.zip == "from_zip" && $(element).val().length === 5){
				if(s2cache.zipf != $(element).val()){
					s2cache.zipf = $(element).val();
					changeGoogleMap(s2cache.zipf, "google-map1");
				}
			}


			if(element.id == "zip_to" && $(element).val().length === 5){
				if(s2cache.zipt != $(element).val()){
					s2cache.zipt = $(element).val();
					
					var start = s2cache.zipf;
					var end = s2cache.zipt;
					console.log(element.id)
					var div = document.getElementById("google-map1");
					
					//$(div).html('');
					//var movers = $(div).parentsUntil('.movers');
					//movers.remove();
					//$(".movers:eq(0)").css('transform', 'skew(157.45deg)');
					
				var q = $.get('https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyD-8Xx0A4yRvS6UsQ7YzY75KxgufqUJ_d4&address='+end);

				q.done(function(data){	
				 try {
					lat = data.results[0].geometry.location.lat.toString();
					lng = data.results[0].geometry.location.lng.toString();

					console.log(lat,lng)

					var latlng = new google.maps.LatLng(lat, lng);


						var myOptions = {
						    zoom: 8,
						    zoomControl:false,
						    center: latlng,
						    mapTypeId: google.maps.MapTypeId.ROADMAP,
						    navigationControl: false,
					        mapTypeControl: false,
					        scaleControl: false,
					        streetViewControl:false,
					        disableDoubleClickZoom: true,
					        styles: [{
						        stylers: [{
						                hue: "#00c3ff"
						            }, {
						                gamma: .84
						            }, {
						                saturation: 53
						            }, {
						                lightness: -16
						            }]
						      }]
						}
						console.log(myOptions);

						map = new google.maps.Map(document.getElementById("google-map1"), myOptions);
						

						var directionsOptions = {
							markerOptions: {clickable: false},
							preserveViewport:true
						};

						
						directionsService = new google.maps.DirectionsService();
					
					
						var request = {
							origin:start,
							destination:end,
							optimizeWaypoints:true,
							travelMode: google.maps.DirectionsTravelMode.DRIVING
						};
 						var icons = {
					        start: new google.maps.MarkerImage(
					        // URL
					        '../bvl40/img/test40/marker_iconA_50.png',
					        // (width,height)
					        new google.maps.Size(53, 64),
					        // The origin point (x,y)
					        new google.maps.Point(0, 0),
					        // The anchor point (x,y)
					        new google.maps.Point(22, 32)),
					        end: new google.maps.MarkerImage(
					        // URL
					        '../bvl40/img/test40/marker_iconB_50.png',
					        // (width,height)
					        new google.maps.Size(53, 64),
					        // The origin point (x,y)
					        new google.maps.Point(0, 0),
					        // The anchor point (x,y)
					        new google.maps.Point(22, 32))
					    };

					    function makeMarker(position, icon, title, map) {
					        new google.maps.Marker({
					            position: position,
					            map: map,
					            icon: icon,
					            title: title
					        });
					    }

						directionsService.route(request, function(response, status) {
						  if (status == google.maps.DirectionsStatus.OK) {
								directionsDisplay = new google.maps.DirectionsRenderer({
		                    	map: map,
		                    	directions: response,
		                    	suppressMarkers: true,
		                	});
							directionsDisplay.setMap(map);
							directionsDisplay.setOptions(directionsOptions);
							var route = response.routes[0];

			                var leg = response.routes[0].legs[0];
							 makeMarker(leg.start_location, icons.start, "title", map);
			                 makeMarker(leg.end_location, icons.end, 'title', map);
			    			map.panBy(-300, 0)
						  }
						});

					}catch(e){
					   console.log(e)
					}
				});	
				}
			}
			//prevents extra bubbling
			

		},
		submitHandler:function(form){
			var submitBtn = $(form).find('.submit-form');
			try{
				_gaq.push(['_trackEvent', 'desktop', '999moving', 'step2-test40']);
			}catch(e){
				
			}
			zipToCity("#f-step2 input[name=zip_from]");
			zipToCity("#f-step2 input[name=zip_to]");

			cache.toZip = $("#f-step2 input[name=to_zip]").val();
			cacheMoveDate();
			cacheMoveSize();
			$("#google-map1").hide()


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

				zipToCity("#f-step3-u input[name=zip_from]");
				zipToCity("#f-step3-u input[name=zip_to]");
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
						var re = new RegExp(/Out of Bounds/i);
						if(re.test(result)){
							$("#field-trip-length").text(result);				
						}else{
							$("#field-trip-length").text("Trip length " + result);
						}
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
	
	$('#f-step2').on('keypress', function(e){
		e.preventDefault();
	});	
	

	//Step 2: Blur Edit Inputs
	$(".moving-from input").on('blur', function(){
	
		var input = $(this);
		var valid = input.valid();

		setTimeout(function(){
			var error = input.hasClass('validation-error');	
				
			if(error){
				
			}else {
				$("#f-step2 .moving-from").hide();
				$(".moving-from.edit").show();
				$('#f-step2').off('keypress');
			}
		}, 350);
	});
	$(".moving-to input").on('blur', function(){

		var input = $(this);
		var valid = input.valid();

		setTimeout(function(){
			var error = input.hasClass('validation-error');			
			if(error){

			}else {
				$("#f-step2 .moving-to").hide();
				$(".moving-to.edit").show();
				$('#f-step2').off('keypress');
			}
		},350);
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
			minDate: '+0D',
			maxDate: '+94D',
			numberOfMonths:2,
			dayNamesMin: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
			onSelect:function(text, inst){
				console.log(inst);
				$("#move-date").val(text);
				$("#move-date").removeClass('validation-error');
				$(".cal-area").hide();
				$("#move-date").trigger('change');
				//updateMonths(inst);  
			},
			beforeShow: function(){  
				//var id = document.getElementById('cal');
				//var inst = window.$.datepicker._getInst(id);
				//updateMonths(inst);  
		    }
	});

	// function updateMonths(inst){
	// 	var next_day = new Date(
	// 	    inst.selectedYear,
	// 	    inst.selectedMonth,
	// 	    inst.selectedDay
	// 	    );        
	//         next_day.setDate(next_day.getDate()+1);
	//         console.log(inst.selectedMonth);
	//         console.log(next_day.getMonth());
	//         if(inst.selectedMonth != next_day.getMonth()){
	// 			$('#cal').datepicker('option',{
	//             	showOtherMonths:true,
	// 				selectOtherMonths:true
	// 			});
	// 		}
	//         else{
	//         	$('#cal').datepicker('option',{
	//             	showOtherMonths:false,
	// 				selectOtherMonths:false
	// 			});
	// 		}
	// }
	
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
	
	//Step 3: Close Update Window
	$("#close-update").click(function(e){
		e.preventDefault();
		$("#update-my-info").hide();
		$("#show-my-info").show();
	});

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

var map;

function initialize() {
	var latlng = new google.maps.LatLng(-34.397, 150.644);
	    var myOptions = {
	        zoom: 8,
	        center: latlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        styles: [{
				        stylers: [{
				                hue: "#00c3ff"
				            }, {
				                gamma: .84
				            }, {
				                saturation: 53
				            }, {
				                lightness: -16
				            }]
				      }]
	    };
	    map = new google.maps.Map(document.getElementById("google-map1"),
	            myOptions);
}
