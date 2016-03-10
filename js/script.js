/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

//Allow Select to Be Opened via JQuery
(function($) {
    "use strict";
    $.fn.openSelect = function()
    {
        return this.each(function(idx,domEl) {
            if (document.createEvent) {
                var event = document.createEvent("MouseEvents");
                event.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                domEl.dispatchEvent(event);
            } else if (element.fireEvent) {
                domEl.fireEvent("onmousedown");
            }
        });
    }
}(jQuery));


//Validations + Steps

//Step1

//Step2

//Step3

//Step4





//Select Arrow Step 2
$("#select-arrow").click(function(){
	$(this).next('select').openSelect();
});


//Moving From & Moving To Edit Buttons
$(".moving-from.edit, .moving-to.edit").show();

$("#moving-from-text-edit").click(function(){
	$(".moving-from").show();
	$(".moving-from.edit").hide();
});

$("#moving-to-text-edit").click(function(){
	$(".moving-to").show();
	$(".moving-to.edit").hide();
});

//Subslides
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
$("#datepicker").datepicker({
		minDate: 0,
		maxDate: '+90D',
		onSelect:function(text){
			$("#move-date").val(text);
		}
});

//ziphelp
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


//Slide 3
$("#field-trip-edit").click(function(){
	console.log('clicked');
});

//Masks
$("input[type=tel]").mask('99999', {
	placeholder:""
});
$("#phone_number").mask('(999) 999-9999', {
	placeholder: ""
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
