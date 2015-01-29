// >> Default values.
var defaults = {
	error_msg_duration_hide : 400,
	error_msg_duration_show : 400,
	error_msg_title : 'Oops!',
	wait_for_rumble : 1000,
};

function bindActions() {
	bindActionsToSubmitButton();
}

function bindActionsToSubmitButton() {
	$('#register').on('click', function() {
		if (validateFields()) {
			registerUser();
		}
		return false;
	});
}

function validateFields() {
	if (	! validateFirstName() 	||
			! validateLastName() 	||
			! validateEmail() 		||
			! validatePassword()) {
		return false;
	} else {
		return true;
	}
}

function validateFirstName() {
	var firstName = $('#first_name').val();
	if (firstName.length < 3) {
		displayErrorMessage('Voornaam te kort.');
		console.log('Voornaam te kort.');
		return false;
	}
	return true;
}

function validateLastName() {
	var lastName = $('#last_name').val();
	if (lastName.length < 3) {
		displayErrorMessage('Achternaam te kort.');
		console.log('Achternaam te kort.');
		return false;
	}
	return true;
}

function validateEmail() {
	var email = $('#email').val();
	if (email.length < 3) {
		displayErrorMessage('Email te kort.');
		console.log('Email te kort.');
		return false;
	}
	return true;
}

function validatePassword() {
	var password = $('#password').val();
	if (password.length < 3) {
		displayErrorMessage('Wachtwoord te kort.');
		console.log('Wachtwoord te kort.');
		return false;
	}
	return true;
}


function showErrors() {
	console.log('Errors, should not register user.');
}

function registerUser() {
	$.ajax({
		url: '/api/v1/user',
		type: 'POST',
		dataType: 'JSON',
		data: {
			first_name : $('#first_name').val(),
			last_name : $('#last_name').val(),
			email : $('#email').val(),
			password : $('#password').val(),
		},
	})
	.done(function(response) {
		console.group("success");
			console.group('Response Data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
		$(location).attr('href', '/');
	})
	.fail(function(response) {
		console.group("error");
			console.group('Response Data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	})
	.always(function(response) {
		console.group("complete");
			console.group('Response Data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	});
}

function displayErrorMessage(message, title, duration) {
	if (typeof title == 'undefined') {
		title = defaults.error_msg_title;
	}

	if (typeof duration == 'undefined') {
		duration = defaults.error_msg_duration_show;
	}

	$('div .error-message #title').text(title);
	$('div .error-message #message').text(message);
	$('div .error-message').css("opacity", 1);
	$('div .error-message').slideDown(duration);
}
