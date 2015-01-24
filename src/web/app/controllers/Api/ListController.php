<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
use Input;
use User;
use ShoppingList;

class ListController extends BaseController {

	public function index($userId) {
		$shoppingLists = User::find($userId)->shoppingLists;
		
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

	public function show($userId, $listId) {
		try 
		{
			$shoppingList = ShoppingList::where('user_id', '=', $userId)->findOrFail($listId)->products;
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
			'data' => $this->transform($shoppingList)
		], 200);
	}

	public function destroy($userId, $listId) {
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
