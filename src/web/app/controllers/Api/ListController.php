<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
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

			return $shoppingLists;
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
	
	public function store($userId) {
		$shoppingList = ShoppingList::create([
			'title' => Input::get('title'),
			'user_id' => $userId
		]);

		return Response::json([
			'data' => $shoppingList
		], 201);
	}

	public function show($listId) {
		try 
		{
			// $shoppingList = ShoppingList::where('user_id', '=', $userId)->findOrFail($listId)->products;
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

	private function transform($shoppingList) {
		return array_map(function($shoppingList) {
			return [
				'id' => (integer) $shoppingList['id'],
				'name' => $shoppingList['name'],
				'price' => (float) $shoppingList['price'],
				'quantity' => (integer) $shoppingList['pivot']['quantity'],
				'scanned' => (boolean) $shoppingList['pivot']['scanned']
			];
		}, $shoppingList->toArray());	
	}
}
