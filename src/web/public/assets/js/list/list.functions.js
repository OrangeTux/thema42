// > Global variables.
// >> Characters to split ID of element.
// (used for storing and parsing data in element ID)
var blockSplitString = "___";
var elementSplitString = "__";

// >> Field name prefixes
var fieldNamePrefixes = {
	'increment_product_quantity' : 'action__increment___',
	'product_name' : 'field__name___',
	'product_row' : 'field__product_row___',
	'quantity' : 'field__quantity___',
	'remove_product' : 'action__remove___',
};

// >> Default values
var defaults = {
	error_msg_duration_hide : 400,
	error_msg_duration_show : 400,
	error_msg_title : 'Oops!',
	rumble_time : 1500,
	wait_for_rumble : 1000,
};

function saveChanges() {

}

function createProduct() {

}

function removeProductRow(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_row');
	$('#' + fieldNamePrefix + 'product_id__' + productID)
	.animate({
		'height': 'toggle',
		'opacity': 'toggle'},
		500, function(){
			$(this).empty();
		});
}

function removeProduct(productID) {
	$.ajax({
		url: '/api/route/to/remove/',
		type: 'POST',
		dataType: 'JSON',
		data: {product_id: productID},
	})
	.done(function(data) {
		console.log("success");
		removeProductRow(productID);
	})
	.fail(function() {
		console.log("error");
		displayErrorMessage('Uw product kon niet verwijderd worden. Dat worden dus extra boodschappen voor u!');
		shakeRow(productID);
	})
	.always(function() {
		console.log("complete");
	});
}

function decrementQuantity() {
	console.log('Not implemented yet');
}

function incrementQuantity(productID) {
	$.ajax({
		url: '/api/route/to/increment/',
		type: 'POST',
		dataType: 'JSON',
		data: {product_id: productID},
	})
	.done(function(data) {
		console.log("success");
		var currentQuantity = getCurrentQuantity(productID);
		var newQuantity = currentQuantity + 1;
		setQuantity(productID, newQuantity);
	})
	.fail(function() {
		console.log("error");
		displayErrorMessage('Het aantal van uw product kon niet verhoogd worden. Onze excuses voor het ongemak.');
		shakeRow(productID);
	})
	.always(function() {
		console.log("complete");
	});
}

function getCurrentQuantity(productID) {
	var fieldNamePrefix = getFieldNamePrefix('quantity');
	return parseInt($('#' + fieldNamePrefix + 'product_id__' + productID).val());
}

function setQuantity(productID, quantity) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('quantity');

	// Set quantity.
	$('#' + fieldNamePrefix + 'product_id__' + productID).val(quantity);
}

function bindAddAction(productID) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('increment_product_quantity');

	// Bind action.
	$('#' + fieldNamePrefix + 'product_id__' + productID).on('click', function() {
		incrementQuantity(productID);
	});
}

function bindRemoveAction(productID) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('remove_product');

	// Bind action.
	$('#' + fieldNamePrefix + 'product_id__' + productID).on('click', function() {
		removeProduct(productID);
	});
}

function bindActionsToProduct(productID) {
	bindAddAction(productID);
	bindRemoveAction(productID);
}

function bindActions() {
	$('.product-row').each(function() {
		// Get product ID.
		var elementData = parseElementID($(this).attr('id'));

		// Bind actions to product.
		bindActionsToProduct(elementData.product_id);
	});
}

function parseElementID(elementID) {
	var blocks = elementID.split(blockSplitString);
	var elements = [];
	$.each( blocks, function( key, block ) {
		var block_elements = block.split(elementSplitString);
		var value = block_elements.pop();
			key = block_elements.pop();
		elements[key] = value;
	});
	return elements;
}

function getFieldNamePrefix(fieldName) {
	return fieldNamePrefixes[fieldName];
}

function hideErrorMessage(duration) {
	if (typeof duration == 'undefined') {
		duration = defaults.error_msg_duration_hide;
	}

	$('div .error-message').slideUp(duration);
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

function shakeRow(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_row');
	var element = $('#' + fieldNamePrefix + 'product_id__' + productID);

	$(element).jrumble({
		x: 1,
		y: 0.05,
		speed : 20,
		rotation: 0.5
	});

	setTimeout(function() {
		$(element).trigger('startRumble');
	}, defaults.wait_for_rumble);

	setTimeout(function() {
		$(element).trigger('stopRumble');
	}, defaults.rumble_time);
}

$(function() {
	// Bind actions to some buttons
	bindActions();
});
