//Animates each div left
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
			console.log(lf2); 
			$('#' + step2).css('margin-left', lf2 + 'px');

			if(lf2 == 0){
				clearInterval(intv);

			}
			
		}, 1);
	}
}

$(".submit-form").click(function(e){
	e.preventDefault();
	var step1 = $(this).closest('section').attr('id');
	
	var step = step1.substr(0, 4);
	var num = parseInt(step1.slice(-1));
	num++;
	
	var step2 = step + num;
	if($("aside#sidebar").is(':visible')){
		$("aside#sidebar").hide();
	}

	if(step2 == "step4"){
		setTimeout(function(){
			$("footer.steps, .disclaimer").hide();
			$(".background").css('min-height', 'initial');
			$("footer.thanks").show();
		}, 500);
	}

	animateLeft(step1, step2);
});

//datepicker

$("#datepicker").datepicker();

//ziphelp

$("body").click(function(e){
	var target = $(e.target);
	//if the target element is inside the zipcode helper
	//return true or false
	var childOfZip = !!(target.closest('.zipcode-helper').length);
	//if zipcode-helper is visible and clicking 
	//is not inside the zipcode helper, hide zipcode-helper
	if($(".zipcode-helper").is(":visible") && !childOfZip)
	 	$(".zipcode-helper").hide();
});


$(".ziphelp").click(function(e){
	//stops body from also registering click
	e.stopPropagation();
	console.log(e.pageX, e.pageY);
	
	//can prob fix this to get end pos of link
	var posX, posY;
	posX = (e.pageX + 40) + "px";
	posY = (e.pageY - 20) + "px";

	$(".zipcode-helper").css({
		top: posY,
		left: posX
	});

	$(".zipcode-helper").toggle();
});

$(".info").click(function(){
	$("#sidebar").toggle();
});


//Slide 3
$("#field-trip-edit").click(function(){
	console.log('clicked');
});

//subslides carousel
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


if($("#step1").is(":visible")){
	//$("#sidebar").show();
}
