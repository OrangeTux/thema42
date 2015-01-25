<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
use Validator;
use Input;
use Request;
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
		$validator = Validator::make(Input::all(), ['shopping_list' => 'required', 'shopping_list.title' => 'required']);

		if ($validator->fails()) {
			return Response::json([
				'error' => [
					'message' => 'Malformed request'
				]
			], 400);
		}

		$shoppingListData = [
			'user_id' => 1, // get user_id from auth in the future
			'title' => Input::get('shopping_list.title')
		];

		$shoppingList = ShoppingList::create($shoppingListData);

		return Response::json([
			'data' => $shoppingList,
			'meta' => [
				'add_products' => Request::url() . '/' . $shoppingList->id . '/product'
			]
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

	public function update($listId) {
		try
		{
			$shoppingList = ShoppingList::findOrFail($listId);
		}
		catch (ModelNotFoundException $exception)
		{
			return Response::json([
				'error' => [
					'message' => 'Shopping list does not exist'
				]
			], 404);
		}
		
		$title = Input::get('data.title');
		$products = Input::get('data.products');

		if ($title) {
			$shoppingList->title = $title;
			$shoppingList->save();
		}

		if ($products) {
			foreach ($products as $product) {
				$productId = $product['id'];
				unset($product['id']);

				$shoppingList->products()->updateExistingPivot($productId, $product);
			}
		}
	}

	public function destroy($listId) {
		$shoppingList =	ShoppingList::destroy($listId);

		return $shoppingList;
	}
}
