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
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOAFjKE8xQUWxlVds1COiroKVmYjH8SoM&sensor=true&callback=initialize&v=3.20')

		var start = $('#zip_from').val();
		var end = $('#zip_to').val();

		$(".background, .disclaimer").hide();
		animateLeft(stepA, stepB);	
		$(".giant-loader").show();
		$("footer").addClass('giant-loader-active');
		var options = {
			div:'giant-parallelogram',
			maxWidth:766,
			seconds:3 //not true seconds because jquery takes 300ms per action, so eh
		}
		//50 x 766 width = 38,300 iterations
		//38,300 / 3600 ( iter / 60 milliseconds / 60 seconds) in sec
		//~10 seconds 
		function callback1(){
			$(".loader-text .calc").hide();
			$(".loader-text .search").show();
			calculateDistance(start, end, function(result){
				console.log(result);
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
					//quote calculation

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
	
	console.log(options.seconds);
	var id = "#" + options.div;
	var width = parseInt($(id).css('width'));
	var maxWidth = options.maxWidth;
	var speed = (options.seconds * 3600) / maxWidth;
	console.log(speed);
	
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
// $("body").click(function(e){
// 	var target = $(e.target);
// 	//if the target element is inside the zipcode helper
// 	//return true or false
// 	var childOfZip = !!(target.closest('.zipcode-helper').length);
// 	//if zipcode-helper is visible and clicking 
// 	//is not inside the zipcode helper, hide zipcode-helper
// 	if($(".zipcode-helper").is(":visible") && !childOfZip){
// 	 	//$(".zipcode-helper").hide();
// 	}

// 	//on focus input -- need to show an absolute
// 	//div next to input with lis of all ajax'd 
// 	//cities and states
// });

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

	var target = $(e.target);
	var zipf = target.attr('data-zip');
	var input = $('input[data-zip='+zipf+']');

	$("#zipfinder").one('blur', function(e){
		input.val($('#zipfinder').val());
		input.trigger('change');
	});

	$(".zipcode-helper input").on('keypress', function(e){
		var code = e.keyCode || e.which;

		if(code == 13){
			e.preventDefault();
			$(".zipcode-helper").hide();
		}
	})

});

$("#move-date").on('change', function(){
	var date = $("#move-date").val();
	
	date = new Date(date);
	var months = ['Jan', 'Feb', 'Mar', 
				 'Apr', 'May', 'Jun', 'Jul', 'Aug',
				 'Sep', 'Oct', 'Nov', 'Dec'];

	var month = months[date.getMonth()];
	var day = date.getDate();
	var year = date.getFullYear(); //getYear returns Y2K bug lol

	var formatted_date = month + " " + day + ", " + year;

	$('#field-trip-date').text(formatted_date);
});

$("#move_size").on('change', function(){
	var size = $(this).val();
	var map = {
		'Moving Boxes Only':'BOX',
		'Studio':'STDI',
		'1 Bedroom':'1 BR',
		'2 Bedrooms':'2 BR',
		'3 Bedrooms':'3 BR',
		'4 Bedrooms':'4 BR',
		'5 Bedrooms':'5 BR',
		'6 Bedrooms':'6 BR',
		'Commercial Move':'COMM'
	}
	size = map[size];
	$('#field-trip-size').text(size);
});


$(".zipc").on('change', function(e){
	var zip = $(this).val();
	var dataZip = $(this).attr('data-zip');
	console.log(dataZip)
	$('.edit span[data-zip='+dataZip+']').text('');
	$.get('https://maps.googleapis.com/maps/api/geocode/json?&address='+zip)
		.done(function(data){
			var address = data.results[0].formatted_address;
			console.log(data);
			$('.edit span[data-zip='+dataZip+'], .field-trip2 span[data-zip='+dataZip+']').text(address);
		});

});

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


//Step 3: Google Maps Init
var directionDisplay,
	directionsService,
	map;
function initialize() {
	console.log('initialized map')
}
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
	//calculateDistances();
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
		
		var start = $('input[name=move_from2]').val();
		var end = $('input[name=move_to2]').val();

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
			calculateDistance(start,end,function(result){
				console.log(result);
				$("#field-trip-length").text("Trip length " + result);
				$(".loader-area").hide();
				$(".movers-found").show();	
				$("#update-my-info").hide();
				$("#show-my-info").show();
				$("#loader3").css('width', '0px');
			});
		});
	}
});

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
			$("#move-date").trigger('change');
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


//Step 3: Loader

