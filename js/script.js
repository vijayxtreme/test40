/*====================================  
 Test 40: Custom JS
=====================================*/
//Global: Privacy Policy, Terms & Conditions, Disclaimer



//Global: Animates each div left
function animateLeft(step1, step2){
	var lf = 0; 
	$(".zipcode-helper").hide();
	var intv = setInterval(function(){ 
		lf-=10;  
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
			lf2-=10; 
			// console.log(lf2); 
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
		$(".background, .disclaimer").hide();
		animateLeft(stepA, stepB);	
		$(".giant-loader").show();
		$("footer").addClass('giant-loader-active');
		var options = {
			div:'giant-parallelogram',
			maxWidth:766,
			seconds:4 //not true seconds because jquery takes 300ms per action, so eh
		}
		//50 x 766 width = 38,300 iterations
		//38,300 / 3600 ( iter / 60 milliseconds / 60 seconds) in sec
		//~10 seconds 
		function callback1(){
			$(".loader-text .calc").hide();
			$(".loader-text .search").show();
		}
				
		function callback2(){
			$(".loader-text .search").hide();
			$(".loader-text .found").show();
			$(".loader-circle").show();
			setTimeout(function(){
				$(".giant-loader").hide();
				$("footer").removeClass('giant-loader-active');
				$(".background, .disclaimer").show();
				$("#quotes-disc").show();	
			}, 2000);
		}
		
		animateGreenLdr(options, callback1, callback2);
	}

	if(stepB == "step4"){
		setTimeout(function(){
			$("footer.steps, .disclaimer").hide();
			$(".background").css('min-height', 'initial');
			$("footer.thanks").show();

		}, 500);
	}

	
};
//Step 2: Animate Green Loaders

function animateGreenLdr(options, callback1, callback2){
	if(options === undefined) return;

	options.seconds = (options.seconds == null) ? 10 : options.seconds; 
	
	console.log(options.seconds);
	var id = "#" + options.div;
	var width = parseInt($(id).css('width'));
	var maxWidth = options.maxWidth;
	var speed = (options.seconds * 3600) / maxWidth;
	console.log(speed);
	
	var intv = setInterval(function(){
		width +=1;
		console.log(width, maxWidth);
		$(id).css('width', width + 'px');
		var halftime = maxWidth / 2;
		
		//Fire off callback1 at the half
		if(parseInt($(id).css('width')) === halftime){
			callback1();
		}

		//Fire off callback2 when animation finished
		if(parseInt($(id).css('width')) === maxWidth){
			clearInterval(intv);
			callback2();
		}
	}, speed);
}

/*
var options = {
	div:'giant-parallelogram',
	maxWidth:766,
	speed:20
}
animateGreenLdr(options);
*/


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
$(".ziphelp").click(function(e){
	//stops body from also registering click
	e.stopPropagation();
	e.preventDefault();
	console.log(e.pageX, e.pageY);
	
	//can prob fix this to get end pos of link
	var posX, posY;
	posX = (e.pageX + 40) + "px";
	posY = (e.pageY - 20) + "px";

	setTimeout(function(){
		$("#zipfinder").focus();
	}, 200);

	$(".zipcode-helper").css({
		top: posY,
		left: posX
	});

	$(".zipcode-helper").toggle();
});

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
		from_zip:{
			required:true,
			minlength:5,
			maxlength:5
		}
	},
	errorPlacement:function(error, element){

	},
	focusInvalid:false,
	invalidHandler:function(form, validator){

	},
	errorClass:'validation-error',
	submitHandler:function(form){
		console.log('Go!');
		var submitBtn = $(form).find('.submit-form');
		validationSuccess(submitBtn);
	}
});
//Step 2: Validation
$("#f-step2").validate({
	rules: {
		move_from:{
			required:true
		},
		move_to:{
			required:true
		},
		move_date:{
			required:true
		},
		move_size:{
			required:true
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
		console.log('Calculate!')
		var submitBtn = $(form).find('.submit-form');
		validationSuccess(submitBtn);
	}
});
//Step 3: Validation
$("#f-step3").validate({
	rules: {
		first_name:{
			required:true
		},
		last_name:{
			required:true
		},
		email:{
			required:true
		},
		phone_number:{
			required:true
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
		console.log('Get My Quote!');
		//need conversion script to fire off
		//can use async conversion w/google
		//plus yahoo + bing
		var submitBtn = $(form).find('.submit-form');
		validationSuccess(submitBtn);
	}
});
//Step 3: Update Info Validation
$("#f-step3-u").validate({
	rules: {
		move_from:{
			required:true
		},
		move_to:{
			required:true
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
		console.log("Change Div Back");
		$("#update-my-info").hide();
		$("#show-my-info").show();
		//do some google redraw on the map
	}
})

//Individual Steps Only

//Step 1: Info Btn
$(".info").click(function(){
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
$(".moving-from input").blur(function(){
	$(".moving-from").hide();
	$(".moving-from.edit").show();
	//issue when clicking on any other button in same div
	//do some other stuff like update dom with ajax'd zip info
});
$(".moving-to input").blur(function(){
	$(".moving-to").hide();
	$(".moving-to.edit").show();

	//do some other stuff like update dom with ajax'd zip info
});

//Step 2: Edit Link for Zips
$("#moving-from-text-edit").click(function(){
	$(".moving-from").show();
	$(".moving-from.edit").hide();
});
$("#moving-to-text-edit").click(function(){
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
			console.log(text);
			$("#move-date").val(text);
			$("#move-date").removeClass('validation-error');
			$(".cal-area").hide();
		}
});
$("#move-date").click(function(e){
	console.log('clicked')
	$(".cal-area").toggle();
});

//Step 3: Update Field Trip Info
$("#field-trip-edit").click(function(e){
	e.preventDefault();
	$("#show-my-info").hide();
	$("#update-my-info").show();
});

//Step 3 + 4: Google Maps & Callback
function calculateDistances() {
	var start = '90036';
	var end = '90210';
	if($('#zip_from').val() != ''){
		start = $('#zip_from').val();
	}
	if($('#zip_to').val() != ''){
		end = $('#zip_to').val();
	}
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix(
	  {
		origins: [start],
		destinations: [end],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.IMPERIAL,
		avoidHighways: false,
		avoidTolls: false
	  }, callback);
}

function callback(response, status) {
	if (status != google.maps.DistanceMatrixStatus.OK) {
	} else {
	  var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
	  var test = '';
	  var str1 = origins.toString();
	  var str2 = destinations.toString();
	  if( str1.match(/\bUSA\b/) && str2.match(/\bUSA\b/)){
			try{
			  for (var i = 0; i < origins.length; i++) {
				var results = response.rows[i].elements;
				for (var j = 0; j < results.length; j++) {
				   test += results[j].distance.text;
				}
			  }
			  var rooms = 'six bedrooms and more house';
			  if($('#number_of_rooms').val() != ''){
				rooms = $('#number_of_rooms').val()
			  }	  
				$.post(
					'/validate/calculator/calc',
					{
						rooms: rooms,
						miles: test
					},
					function(data){
						var d = $.parseJSON(data);
						setTimeout(
							function(){
								var min = d.self_service_small.min;
								var max = d.full_service_p_large.max;
								console.log(d);
								$('#range').html('$' + min + ' to $' + max);
								$('#range-loader').hide('blind');
								$('#quote-range').show('blind');
							}
						, 5000 );
					}
				);	  
			  //alert(test);
			}catch(e){
				setTimeout(
					function(){
						$('#quote-range').html('Unable to calculate price range, one or more of your locations may not be accessible by moving trucks');
						$('#range-loader').hide('blind');
						$('#quote-range').show('blind');
					}
				, 5000 );
			}
		}
	  else{
		setTimeout(
			function(){
				$('#quote-range').html('Unable to calculate, Locations may not be in the USA');
				$('#range-loader').hide('blind');
				$('#quote-range').show('blind');
			}
		, 3000 );
	  }
	}
}
//Step 3: Google Maps Init
var directionDisplay,
	directionsService,
	map;

function initialize() {
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
	  disableDoubleClickZoom: true,
	  disableDefaultUI: true,
	  clickable: false,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	var directionsOptions = {
		markerOptions: {clickable: false}
	};
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions(directionsOptions);
	//calculateDistances();
	calcRoute();
}
//Step 3: Calculate Quote
function calcRoute() {
	var start = $('#zip_from').val();
	var end = $('#zip_to').val();
	var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
	  if (status == google.maps.DirectionsStatus.OK) {
		$('.google-map-wrap').animate({"height": "430px"}, 1000);
		directionsDisplay.setDirections(response);
	  }else{
		$('#map_canvas').hide();
		$('.google-map-wrap').animate({"height": "0px"}, "slow");
	  }
	});
}
//Step 3: Conversion Scripts 
function conversionScripts(){
	//Yahoo + Bing Conversions moved to Get My Quotes Button Click
	window.uetq = window.uetq || [];
	window.uetq.push({ 'ea':'quote'}); 
}

//Step 3: Google Conversion
(function($){
	$.fn.conversion = function(google_conversion_id,google_conversion_label){

		try{
			_gaq.push(['_trackEvent', 'desktop', '999moving', 'step3-test34']);
			setTimeout(
				function(){
					_gaq.push(['_trackEvent', 'Conversion', 'Landing-test34', 'Validate']);
				}, 100
			);
			__adroll.record_user({"adroll_segments": "quote_complete"});
		}catch(e){
			
		}
		//google conversion script
		var image = new Image(1,1); 
		image.src = "http://www.googleadservices.com/pagead/conversion/"+google_conversion_id+"/?label="+google_conversion_label + "&script=0";
	};
}(jQuery));

(function($){
	$.fn.queue_submission = function(){
		$.post(
			'/validate/validate/send',
			{
				source: $('#source').val()
			},
			function(data){
				var rooms =  {	'studio'	:	'Studio',
								'one bedrooms apartment'	:	'1 bedroom apartment',
								'one bedrooms house'		:	'1 bedroom house',
								'two bedrooms apartment'	:	'2 bedroom apartment',
								'two bedrooms house'		:	'2 bedroom house',
								'three bedrooms apartment'	:	'3 bedroom apartment',
								'three bedrooms house'		:	'3 bedroom house',
								'four bedrooms apartment'	:	'4 bedroom apartment',
								'four bedrooms house'		:	'4 bedroom house',
								'five bedrooms apartment'	:	'5 bedroom apartment',
								'five bedrooms house'		:	'5 bedroom house',
								'six bedrooms apartment'	:	'6 bedroom apartment',
								'six bedrooms house'		:	'6 bedroom house',
								'six bedrooms and more apartment'	:	'6 or more bedroom apartment',
								'six bedrooms and more house'		:	'6 or more bedroom house'};
				$('.google-map-wrap').animate({"height": "0px"}, 200);
				$('.slide-wrapp').animate({"height": "510px"}, 200);
				$('.regulation-terms-w').hide('blind');
				$('#full_name').html($('#first_name').val() + ' ' + $('#last_name').val());
				$('#room').html(rooms[$('#number_of_rooms').val()]);
				$(".third-slide").closest(".slide-wrapp").hide("slide",{direction:"left"}, function(){
						$(".forth-slide").closest(".slide-wrapp").show("slide",{direction:"right"});
					});
				calculateDistances();
				//$(this).thankyou();
				conversionScripts();
				$(this).conversion(1070276245,"Ls4OCOWhRhCVvaz-Aw");
			}
		);
		
	};
}(jQuery));