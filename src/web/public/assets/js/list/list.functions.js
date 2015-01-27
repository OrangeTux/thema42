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
	'search_result_product_row' : 'field__search_result_product_row___',
	'shopping_list_info' : 'field__list_info___',
};

// >> Default values.
var defaults = {
	error_msg_duration_hide : 400,
	error_msg_duration_show : 400,
	error_msg_title : 'Oops!',
	rumble_time : 1500,
	wait_for_rumble : 1000,
};

// >> Template IDs.

var templates = {
	product_search_result_row : '#tpl_search_result_product_row',
};

// >> Temporary list with all products.
var products = {
	"data" : {
		"products" : [
			{
				"id" : 1,
				"name" : "Melk",
				"price" : 1.00
			},
			{
				"id" : 2,
				"name" : "Brood",
				"price" : 1.90
			},
			{
				"id" : 3,
				"name" : "Kaas",
				"price" : 3.45
			},
			{
				"id" : 4,
				"name" : "Worst",
				"price" : 2.30
			},
			{
				"id" : 5,
				"name" : "Appel",
				"price" : 0.35
			},
			{
				"id" : 6,
				"name" : "Banaan",
				"price" : 0.65
			},
			{
				"id" : 7,
				"name" : "Gehakt",
				"price" : 2.50
			},
			{
				"id" : 8,
				"name" : "Hamlappen",
				"price" : 6.55
			},
			{
				"id" : 9,
				"name" : "Toiletpapier",
				"price" : 3.55
			},
			{
				"id" : 10,
				"name" : "Vuilniszakken",
				"price" : 2.25
			},
		]
	}
};

function addProductToList(productID) {
	console.log('Adding product with ID: ' + productID);
}

function buildShoppingListObject() {
	return shoppingListObject = {
		'title' : $('[name=title]').val()
	};
}

function getShoppingListData() {
	var fieldNamePrefix = getFieldNamePrefix('shopping_list_info');
	var elementID = $("[id^='" + fieldNamePrefix + "']").attr('id');
	return parseElementID(elementID);
}

function getShoppingListID() {
	var shoppingListData = getShoppingListData();
	return shoppingListData.list_id;
}

function saveChanges() {
	// Build default shopping list as object.
	var shoppingList = buildShoppingListObject();

	var shoppingListID = getShoppingListID();

	$.ajax({
		url: '/api/v1/list/' + shoppingListID,
		type: 'PATCH',
		data: {shopping_list: shoppingList},
		statusCode : {
			404 : 	function() {
						displayErrorMessage('Er ging iets mis aan onze kant, de pagina kon niet gevonden worden.', '404 Page not found.');
					},
			500 : 	function() {
						displayErrorMessage('Server could not be reached.', '500 Server probz.');
					}
		}
	})
	.done(function(response) {
		console.log("success");
		console.log(response);
	})
	.fail(function(response) {
		console.log("error");
		console.log(response);
	})
	.always(function(response) {
		console.log("complete");
	});
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

	bindActionToSaveButton();
	bindActionsToSearchBoxes();
}

function bindActionToSaveButton() {
	$('#send').on('click', function() {
		saveChanges();
	});
}

function bindActionsToSearchBoxes() {
	$('.search_product').each(function() {
		bindActionsToSearchBox($(this));
	});
}

function bindActionsToSearchBox(searchBox) {
	// Autocomplete when typing in box
	addSearchAutocomplete(searchBox);

	// Hide results when focus loose
	$(searchBox).parent('.search-products-block').on('blur', function() {
		var resultBlock = getClosestResultBlock(searchBox);
		$(resultBlock).html('');
	});

	// When focusing on the search box, show suggestions
	$(searchBox).on('focus', function() {
		$(searchBox).autocomplete("search");
	});
}

function addSearchAutocomplete(searchBox) {
	$(searchBox).autocomplete({
		source: function(request, response) {
			var resultData = searchProducts(request.term);
			showMatchingProducts(searchBox, resultData);
		}
	});
}

function searchProducts(term) {
	var resultData = [];

	$.each(products.data.products, function(){
		if ((this.name).toLowerCase().indexOf(term) >= 0) {
			resultData.push(this);
		}
	});

	return resultData;
}

function showMatchingProducts(searchBox, products) {
	var searchResult = buildSearchResults(products);
	var resultsBlock = getClosestResultBlock(searchBox);

	// Store the location of the searchbox in de product row
	var searchBoxLocation = getSearchBoxLocation(searchBox);
	searchResult = searchResult.join("");
	searchResult = replaceValuesInContent(searchResult, {location : searchBoxLocation});

	$(resultsBlock).html(searchResult);

	bindActionToSearchResults(searchBox);
}

function bindActionToSearchResults(searchBox) {
	var searchBoxLocation = getSearchBoxLocation(searchBox);
	var fieldNamePrefix = getFieldNamePrefix('search_result_product_row');

	$("[id^='" + fieldNamePrefix + "location__" + searchBoxLocation + "']").each(function() {
		bindActionsToSearchResultProductRow(this);
	});
}

function bindActionsToSearchResultProductRow(row) {
	elementID = $(row).attr('id');
	var elementData = parseElementID(elementID);

	$(row).on('click', function() {
		addProductToList(elementData.product_id);
	});
}

function getSearchBoxLocation(searchBox) {
	var elementData = parseElementID($(searchBox).attr('id'));
	return elementData.location;
}

function getClosestResultBlock(searchBox) {
	return $(searchBox).next('.search_results');
}

function buildSearchResults(products) {
	var searchResults = [];

	$(products).each(function(index, product) {
		var searchResult = buildSearchResult(product);
		searchResults.push(searchResult);
	});

	return searchResults;
}

function buildSearchResult(product) {
	var template = $(templates.product_search_result_row).html();

	params = {
		product_name : product.name,
		product_id : product.id
	};

	template = replaceValuesInContent(template, params);

	return template.toString();
}

function replaceValuesInContent( content, values ){
	$.each(values, function(index, value){
		if (! (parseInt(index) >= 0)) { // jshint ignore:line
			content = replaceValueInContent( content, index, value);
		}
	});

	return content;
}

function replaceValueInContent( content, search, value ){
	return content.replace(new RegExp( '{#'+search+'#}' , 'g'), value);
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

function getAllProducts() {
	$.ajax({
		url: '/api/v1/product',
		type: 'GET',
		dataType: 'JSON',
	})
	.done(function(response) {
		console.log("success");
		console.log(response);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

}

$(function() {
	// Bind actions to some buttons
	bindActions();

	// getAllProducts();
});
