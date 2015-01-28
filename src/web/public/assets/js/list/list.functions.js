// > Global variables.
// >> Characters to split ID of element.
// (used for storing and parsing data in element ID)
var blockSplitString = "___";
var elementSplitString = "__";
var api_version = 'v1';

// >> Field name prefixes
var fieldNamePrefixes = {
	'increment_product_quantity' : 'action__increment___',
	'list_id' : 'shopping_list_id__',
	'product_id' : 'product_id__',
	'product_name' : 'field__name___',
	'product_quantity' : 'field__quantity___',
	'product_row' : 'field__product_row___',
	'product_scanned' : 'field__scanned___',
	'remove_product' : 'action__remove___',
	'remove_shopping_list' : 'field__remove_shopping_list___',
	'search_result_product_row' : 'field__search_result_product_row___',
	'shopping_list_id' : 'shopping_list_id__',
	'shopping_list_info' : 'field__list_info___',
	'shopping_list_row' : 'field__shopping_list_row___',
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
	new_product_row : '#tpl_new_product_row',
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

function createList() {
	$.ajax({
		url: '/api/' + api_version + '/list/',
		type: 'POST',
		dataType: 'JSON',
		data: {
			shopping_list: {
				'title' : $('.title').val()
			}
		},
	})
	.done(function(response) {
		console.group("success");
			console.group('Response Object:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
			$(location).attr('href', '/list/' + response.id + '/edit');
	})
	.fail(function(response) {
		console.group("error");
			console.group('Response Object:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	})
	.always(function(response) {
		console.group("complete");
			console.group('Response Object:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	});
}

function removeShoppingList(shoppingListID) {
	$.ajax({
		url: '/api/' + api_version + '/list/' + shoppingListID,
		type: 'DELETE',
		dataType: 'JSON',
	})
	.done(function(response) {
		console.group("success");
			console.group('response data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
		hideShoppingList(shoppingListID);
	})
	.fail(function(response) {
		console.group("error");
			console.group('response data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	})
	.always(function(response) {
		console.group("complete");
			console.group('response data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
	});
}

function hideShoppingList(shoppingListID) {
	var fieldNamePrefix = getFieldNamePrefix('shopping_list_row');
	var listIDPrefix = getFieldNamePrefix('list_id');

	$("[id^='" + fieldNamePrefix + listIDPrefix + shoppingListID + "']").parent().animate({
		'width' : 'toggle',
		'height' : 'toggle',
		'opacity' : 'toggle',
	}, 500, function() {
		$(this).remove();
	});
}

function isProductOnList(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_row');
	var productIDPrefix = getFieldNamePrefix('product_id');

	return $("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").length > 0;
}

function addProductToList(productID) {
	var listID = getShoppingListID();

	// If product is already on list, just increment.
	if (isProductOnList(productID)) {
		incrementQuantity(productID);
		return;
	}

	$.ajax({
		url: '/api/' + api_version + '/list/' + listID + '/product',
		type: 'POST',
		dataType: 'JSON',
		data: {
			products: [
				{
					"id" : productID,
					"quantity" : 1,
				}
			]
		},
	})
	.done(function(response) {
		console.group("success");
			console.group('Response Data:');
				console.log(response);
				console.groupEnd();
			console.groupEnd();
		var productData = getNewProductFromResponse(productID, response);
		addProductRowToList(productData);
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

function getNewProductFromResponse(productID, response) {
	var newProduct;

	$(response).each(function(index, product) {
		if (product.id == productID) {
			newProduct = product;
			return false;
		}
	});

	return newProduct;
}

function addProductRowToList(productData) {

	var template = buildNewProductRow(productData);

	$('.products').append(template);

	bindActionsToProduct(productData.id);
}

function buildNewProductRow(productData) {
	var template = getTemplate('new_product_row');
	console.log(template);

	params = {
		product_id : productData.id,
		product_name : productData.name,
		product_quantity : productData.quantity,
		product_scanned : productData.scanned,
	};

	template = replaceValuesInContent(template, params);

	return template.toString();
}

function buildShoppingListObject() {
	var shoppingListObject = {
		'title' : $('[name=title]').val()
	};

	return shoppingListObject;
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
		data: shoppingList,
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

function getListProductName(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_name');
	var productIDPrefix = getFieldNamePrefix('product_id');
	var elementID = $("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").attr('id');
	var listProductData = parseElementID(elementID);
	return listProductData.name;
}

function getListProductScanned(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_scanned');
	var productIDPrefix = getFieldNamePrefix('product_id');
	var elementID = $("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").attr('id');
	var listProductData = parseElementID(elementID);
	return listProductData.is_scanned;
}

function getListProductData(productID) {
	var listProductData = {
		'id' : parseInt(productID),
		'quantity' : getCurrentQuantity(productID),
		'scanned' : getListProductScanned(productID),
	};
	return listProductData;
}

function updateProduct(productID) {
	var listProductData = getListProductData(productID);
	var listID = getShoppingListID();

	delete listProductData.id;

	console.group("List Product Data:");
		console.log(listProductData);
		console.groupEnd();

	$.ajax({
		url: '/api/v1/list/' + listID + '/product/' + productID,
		type: 'PATCH',
		dataType: 'JSON',
		data: { product : listProductData }
	})
	.done(function(response) {
		console.group("success");
			console.log(response);
			console.groupEnd();
	})
	.fail(function(response) {
		console.group("error");
			console.log(response);
			console.groupEnd();
		displayErrorMessage('Uw product kon niet gewijzigd worden. Onze excuses voor het ongemak.');
		shakeRow(productID);
	})
	.always(function(response) {
		console.group("complete");
			console.log(response);
			console.groupEnd();
	});

}

function removeProductRow(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_row');
	$('#' + fieldNamePrefix + 'product_id__' + productID)
	.animate({
		'height': 'toggle',
		'opacity': 'toggle'},
		500, function(){
			$(this).remove();
		});
}

function removeProduct(productID) {
	var listID = getShoppingListID();

	$.ajax({
		url: '/api/v1/list/' + listID + '/product/' + productID,
		type: 'DELETE',
		dataType: 'JSON',
	})
	.done(function(response) {
		console.group("success");
			console.log('Response Data:');
			console.log(response);
			console.groupEnd();

		removeProductRow(productID);
	})
	.fail(function(response) {
		console.group("error");
			console.log('Response Data:');
			console.log(response);
			console.groupEnd();

		displayErrorMessage('Uw product kon niet verwijderd worden. Dat worden dus extra boodschappen voor u!');
		shakeRow(productID);
	})
	.always(function(response) {
		console.group("complete");
			console.log('Response Data:');
			console.log(response);
			console.groupEnd();
	});
}

function decrementQuantity() {
	console.log('Not implemented yet');
}

function incrementQuantity(productID) {
	var currentQuantity = getCurrentQuantity(productID);
	var newQuantity = currentQuantity + 1;
	setQuantity(productID, newQuantity);

	updateProduct(productID);
}

function getCurrentQuantity(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_quantity');
	var productIDPrefix = getFieldNamePrefix('product_id');
	return parseInt($("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").val());
}

function setQuantity(productID, quantity) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('product_quantity');
	var productIDPrefix = getFieldNamePrefix('product_id');

	// Set quantity.
	$("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").val(quantity);
}

function bindAddAction(productID) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('increment_product_quantity');
	var productIDPrefix = getFieldNamePrefix('product_id');

	// Bind action.
	$("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").on('click', function() {
		incrementQuantity(productID);
	});
}

function bindRemoveAction(productID) {
	// Get field name prefix.
	var fieldNamePrefix = getFieldNamePrefix('remove_product');
	var productIDPrefix = getFieldNamePrefix('product_id');

	// Bind action.
	$("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").on('click', function() {
		removeProduct(productID);
	});
}

function bindQuantityChangeAction(productID) {
	var fieldNamePrefix = getFieldNamePrefix('product_quantity');
	var productIDPrefix = getFieldNamePrefix('product_id');

	$("[id^='" + fieldNamePrefix + productIDPrefix + productID + "']").on('change', function() {
		updateProduct(productID);
	});
}

function bindActionsToProduct(productID) {
	bindAddAction(productID);
	bindRemoveAction(productID);
	bindQuantityChangeAction(productID);
}

function bindActionsToEditForm() {
	$('.product-row').each(function() {
		// Get product ID.
		var elementData = parseElementID($(this).attr('id'));

		// Bind actions to product.
		bindActionsToProduct(elementData.product_id);
	});

	bindActionToSaveButton();
	bindActionsToSearchBoxes();
}

function bindActionsToCreateForm() {
	bindActionToCreateButton();
}

function bindActionToSaveButton() {
	$('#send').on('click', function() {
		saveChanges();
	});
}

function bindActionToCreateButton() {
	$('#create').on('click', function() {
		createList();
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

	var timer;

	$(searchBox).on('focus', function() {
		clearTimeout(timer);
		$(searchBox).autocomplete("search");
	});

	$(searchBox).on('focusout', function() {
		timer = setTimeout(function() {
			var resultBlock = getClosestResultBlock(searchBox);
			$(resultBlock).html('');
		}, 200);
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
		if ((this.name).toLowerCase().indexOf(term.toLowerCase()) >= 0) {
			resultData.push(this);
		}
	});

	return resultData;
}

function showMatchingProducts(searchBox, products) {
	var searchResult = buildSearchResults(products);
	var resultsBlock = getClosestResultBlock(searchBox);

	// Store the location of the search box in de product row
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
		bindActionsToSearchResultProductRow({'row' : this, 'searchBox' : searchBox});
	});
}

function bindActionsToSearchResultProductRow(data) {
	elementID = $(data.row).attr('id');
	var elementData = parseElementID(elementID);

	$(data.row).on('click', function() {
		clearSearchBox(data.searchBox);
		addProductToList(elementData.product_id);
	});
}

function clearSearchBox(searchBox) {
	var searchBoxLocation = getSearchBoxLocation(searchBox);
	$('.search-products-block #location__' + searchBoxLocation).val('');
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

function bindActionsToShoppingLists() {
	$('.shoppinglist').each(function() {
		var elementID = $(this).attr('id');
		var elementData = parseElementID(elementID);
		bindActionsToShoppingList(elementData.shopping_list_id);
	});
}

function bindActionsToShoppingList(shoppingListID) {
	bindRemoveActionToShoppingList(shoppingListID);
}

function bindRemoveActionToShoppingList(shoppingListID) {
	var fieldNamePrefix = getFieldNamePrefix('remove_shopping_list');
	var listIDPrefix = getFieldNamePrefix('shopping_list_id');

	$("[id^='" + fieldNamePrefix + listIDPrefix + shoppingListID + "']").on('click', function() {
		removeShoppingList(shoppingListID);
	});
}

function getTemplate(templateName) {
	return $(templates[templateName]).html();
}
