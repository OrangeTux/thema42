<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
use User;
use ShoppingList;

class ListController extends BaseController {

	public function index($user_id)
	{
		$shoppingLists = User::find($user_id)->shoppingLists;
		
		return Response::json([
			'data' => $shoppingLists
		], 200);
	}

	public function show($user_id, $list_id)
	{
		try 
		{
			$shoppingList = ShoppingList::where('user_id', '=', $user_id)->findOrFail($list_id)->products;
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
