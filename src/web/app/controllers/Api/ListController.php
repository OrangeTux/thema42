<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
use Validator;
use Input;
use User;
use ShoppingList;

class ListController extends BaseController {

	public function index() {
	       	try
		{
			$shoppingLists = User::findOrFail(Input::get('user_id'))->shoppingLists;

			foreach ($shoppingLists as $shoppingList) {
				$shoppingList->products;
			}
		}
		catch (ModelNotFoundException $exception)
		{
			return Response::json([
				'error' => [
					'message' => 'User does not exist'
				]
			], 404);
		}	
		
		return Response::json([
			'data' => $shoppingLists
		], 200);
	}
	
	public function store() {
		$validator = Validator::make(Input::all(), ['data' => 'required', 'data.title' => 'required', 'data.products' => 'required']);

		if ($validator->fails()) {
			return Response::json([
				'error' => [
					'message' => 'Malformed request'
				]
			], 400);
		}

		$shoppingList = [
			'user_id' => 1,
			'title' => Input::get('data.title')
		];
		$products = Input::get('data.products');

		$newShoppingList = ShoppingList::create($shoppingList);

		foreach ($products as $product) {
			$productData = [
				'product_id' => (integer) $product['id'],
				'quantity' => (integer) $product['quantity'],
				'scanned' => (boolean) false 
			];
			
			$newShoppingList->products()->attach($newShoppingList->id, $productData);	
		}

		$newShoppingList->products;

		return Response::json([
			'data' => $newShoppingList
		], 201);

	}

	public function show($listId) {
		try 
		{
			$shoppingList = ShoppingList::findOrFail($listId);
			$shoppingList->products;
		}
		catch (ModelNotFoundException $exception) 
		{
			return Response::json([
				'error' => [
					'message' => 'Shopping list does not exist'
				]
			], 404);
		}
		
		return Response::json([
			'data' => $shoppingList 
		], 200);
	}

	public function destroy($listId) {
		$shoppingList =	ShoppingList::destroy($listId);

		return $shoppingList;
	}
}
