//Validations + Steps

//Step1
$("#f-step1").validate({
	

});

//Step2

//Step3

//Step4

//Testing Only - Can Delete or Comment Out When Code Finished
function changeDiv(toggle){
	if(toggle){
		$(".movers-found").hide();
		$(".loader-area").show();
	}else{
		$(".movers-found").show();
		$(".loader-area").hide();
	}
}

//Slide 1: Subslides Carousel
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

//Step 2: Select Arrow 
$("#select-arrow").click(function(){
	$(this).next('select').openSelect();
});

$("#moving-from-text-edit").click(function(){
	$(".moving-from").show();
	$(".moving-from.edit").hide();
});

$("#moving-to-text-edit").click(function(){
	$(".moving-to").show();
	$(".moving-to.edit").hide();
});

//Slide 2: Datepicker
$("#cal").datepicker({
		minDate: 0,
		maxDate: '+90D',
		dayNamesMin: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
		onSelect:function(text){
			console.log(text);
			$("#move-date").val(text);
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
})


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
			console.log(lf2); 
			$('#' + step2).css('margin-left', lf2 + 'px');

			if(lf2 == 0){
				clearInterval(intv);

			}
			
		}, 1);
	}
}
//Global: Submit Form Data -> Animate
$(".submit-form").click(function(e){
	e.preventDefault();
	if($(this).attr('id') == "update")
		return;

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

	$("#zipfinder").on('keyup', function(e){
	

	})

	$(".zipcode-helper").css({
		top: posY,
		left: posX
	});

	$(".zipcode-helper").toggle();
});

$(".info").click(function(){
	$("#sidebar").toggle();
});


//Global: Mask Inputs (Prevent Bad Numbers)
$("input[type=tel]").mask('99999', {
	placeholder:""
});
$("#phone_number").mask('(999) 999-9999', {
	placeholder: ""
});