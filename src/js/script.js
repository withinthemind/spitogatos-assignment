$(document).ready(function(){

	// function to show input error
	function showError(element) {
		
		$(element).addClass('error');
		$(element).next('label').addClass('error');
		$(element).nextAll('span.checkmark').css('display', 'none');
		
	}
	
	// function to hide input error
	function hideError(element) {
		
		$(element).removeClass('error');
		$(element).next('label').removeClass('error');
		$(element).nextAll('span.checkmark').css('display', 'inline-block');	
	
	}

	// floating label input
    $('.floated input').focusout(function(){
		
        var text_value = $(this).val();

        if (text_value === "") {
            $(this).removeClass('float-label');
        }
		else {
           $(this).addClass('float-label');
        }
		
    });

	// floating label textarea	
    $('.floated textarea').focusout(function(){
		
        var text_value = $(this).val();

        if (text_value === "") {
            $(this).removeClass('float-label');
        }
		else {
           $(this).addClass('float-label');
        }
		
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
		});		
	});
	
	// filter subCategories
	$('#category').change(function() {
		var category = $(this).val();
		$('#subcategory').html('');
			$.each(subs,function(key, value) {
				if (category == value['categoryId']) {
					$.each(value['subCategories'],function(key, value) {
						$('#subcategory').append('<option value=' + value['subCategoryId'] + '>' + value['name'] + '</option>');
					});
				}
			});		
	});	
});