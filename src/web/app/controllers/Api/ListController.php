<?php

namespace Api;

use DB;
use Basecontroller;
use User;
use ShoppingList;

class ListController extends BaseController {

	public function index($user_id)
	{
		$shoppingLists = User::find($user_id)->shoppingLists;

		return $shoppingLists;
	}

	public function show($user_id, $list_id)
	{
		$shoppingList = ShoppingList::find($list_id)->products;

		return $shoppingList;
	}
}
