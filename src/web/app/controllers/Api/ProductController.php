<?php

namespace Api;

use BaseController;
use Input;
use Response;
use Product;
use ShoppingList;

class ProductController extends BaseController {
	
	public function store($userId, $listId) {
		$shoppingList = ShoppingList::find($listId);
		
		$product = $shoppingList->products()->attach(Input::get('product_id'), [
			'shopping_list_id' => $shoppingList->id, 
			'quantity' => Input::get('quantity'), 
			'scanned' => Input::get('scanned')
		]);

		return Response::json([
			'data' => $product
		], 201);	
	}

	public function update($userId, $listId, $productId) {
		$shoppingList = ShoppingList::find($listId);

		$product = $shoppingList->products()->updateExistingPivot(Input::get('id'), [
			'shopping_list_id' => $shoppingList->id,
			'quantity' => Input::get('quantity'),
			'scanned' => Input::get('scanned')
		]);

		return Response::json([
			'data' => $product
		], 200);
	}
}
