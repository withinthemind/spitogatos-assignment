$(document).ready(function(){

	// burger menu
	$('nav .icon').on('click', function () {
		$(this).toggleClass('expanded');
		if ($('nav .icon').hasClass('expanded')) {
			$('.menu').addClass('responsive');
			$('body').addClass('overflow');
		} 
		else {
			$('.menu').removeClass('responsive');
			$('body').removeClass('overflow');
		}
	});	

	// slider
	var slideIndex = 1;
	showSlides(slideIndex);

	$('.slider-dot').on('click', function () {
		var index = $(this).data('slide');
		showSlides(slideIndex = index);
	});

	function showSlides(n) {
	  var i;
	  var slides = document.getElementsByClassName("slider-img");
	  var dots = document.getElementsByClassName("slider-dot");
	  if (n > slides.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
	  }
	  for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active", "");
	  }
	  slides[slideIndex-1].style.display = "block";
	  dots[slideIndex-1].className += " active";
	}		

	// function to show input error
	function showError(element) {
		
		$(element).addClass('error');
		$(element).next('label').addClass('error');
		$(element).nextAll('span.checkmark').css('display', 'none');
		$(element).nextAll('span.help-text').html('Error message').addClass('error');
		
	}
	
	// function to hide input error
	function hideError(element) {
		
		$(element).removeClass('error');
		$(element).next('label').removeClass('error');
		$(element).nextAll('span.checkmark').css('display', 'inline-block');
		$(element).nextAll('span.help-text').html('Help Text').removeClass('error');		
	
	}
	// floating label input
	$(function () {

		$('.input-box .label').on('click', function () {
			$(this).closest('.input-box').find('input').focus();
		});
		$('.input-box input').on('keyup', function () {
			var value = $.trim($(this).val());
			if (value) {
				$(this).closest('.input-box').addClass('hasValue');
			} else {
				$(this).closest('.input-box').removeClass('hasValue');
			}
		});

		$('.input-box .label').on('click', function () {
			$(this).closest('.input-box').find('textarea').focus();
		});

		$('.input-box textarea').on('keyup', function () {
			var value = $.trim($(this).val());
			if (value) {
				$(this).closest('.input-box').addClass('hasValue');
			} else {
				$(this).closest('.input-box').removeClass('hasValue');
			}
		});

	});	
	
	// textarea validation
	$('#message').on('input', function(){
		var maxlength = 100;
		var value = $(this).val();
		var currentLength = value.length;

		if( currentLength >= maxlength ){
			$('.char-count').html('0');
			$('#message').val(value.substring(0, maxlength));
		}else{
			$('.char-count').html(maxlength - currentLength);
		}
	});

	// name validation
	$('#name').focusout(function() {
		
		var userinput = $(this).val();
		var pattern = /^[a-zA-Z\s]*$/

		if(!pattern.test(userinput) || userinput == '') {
			showError('#name');
		}​
		else {
			hideError('#name');
		}	
	});
	
	// email validation
	$('#email').focusout(function() {
		
		var userinput = $(this).val();
		var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

		if(!pattern.test(userinput) || userinput == '') {
			showError('#email');
		}​
		else {
			hideError('#email');
		}	
	});
	
	// phone validation
	$('#phone').focusout(function() {
		
	var userinput = $(this).val();	
	var pattern = /^\d*$/;
	
	if(!pattern.test(userinput) || userinput == '') {
		showError('#phone');
	}​
	else {
		hideError('#phone');
		}	
	});

	// remove errors when user is typing
    $(document).on('keyup', 'input.error', function () {
        $(this).removeClass('error');
		$(this).next('label').removeClass('error');
    });
	
	// form submit
	$('#submit').click(function() {
		$('input[type=text]').focus();
		if ($('input[name=options]:checkbox:checked').length == 0) {
			$('.checkbox-text').addClass('error');
		}
		else {
			$('.checkbox-text').removeClass('error');
		}
	});
	
	// load select menu data
	var subs = [];
	$.getJSON('https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b', function(data) {
		subs = data;
		$.each(data,function(key, value) {
			$('#category').append('<option value=' + value['categoryId'] + '>' + value['name'] + '</option>');
				$.each(value['subCategories'],function(key, value) {
					$('#subcategory').append('<option value=' + value['subCategoryId'] + '>' + value['name'] + '</option>');
				});			
		});		
	});
	
	// filter subCategories
	$('#category').change(function() {
		var category = $(this).val();
		$('#subcategory').html('');
			$.each(subs,function(key, value) {
				if (category == 0) {
					$.each(value['subCategories'],function(key, value) {
						$('#subcategory').append('<option value=' + value['subCategoryId'] + '>' + value['name'] + '</option>');
					});					
				}
				else {
					if (category == value['categoryId']) {
						$.each(value['subCategories'],function(key, value) {
							$('#subcategory').append('<option value=' + value['subCategoryId'] + '>' + value['name'] + '</option>');
						});
					}
				}
			});		
	});	
});