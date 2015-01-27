<?php

class ListController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$shoppingLists = App::make('Api\ListController')->getLists(1);

		// print_r($shoppingLists);

		return View::make('list.index')->with('shoppingLists', $shoppingLists);
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('list.create');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$shoppingList = App::make('Api\ListController')->show($id);
		return View::make('list.show')->with('shoppingList', $shoppingList);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $list
	 * @return Response
	 */
	public function edit($list)
	{
		$shoppingList = App::make('Api\ListController')->show($list);

		return View::make('list.edit')->with('shoppingList', $shoppingList);

		// $shoppingList = [
		// 	'id' => 2,
		// 	'title' => 'Afterpartees',
		// 	'products' => [
		// 		['product_id' => 6, 'name' => 'Melk (halfvolle), 2L', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 7, 'name' => 'Coca Cola', 'price' => 1.95, 'quantity' => 10, 'scanned' => false],
		// 		['product_id' => 12, 'name' => 'Coca Cola, Light', 'price' => 1.95, 'quantity' => 3, 'scanned' => false],
		// 		['product_id' => 13, 'name' => 'Coca Cola, Zero', 'price' => 1.95, 'quantity' => 4, 'scanned' => false],
		// 		['product_id' => 14, 'name' => 'Mayonaise', 'price' => 1.95, 'quantity' => 2, 'scanned' => false],
		// 		['product_id' => 15, 'name' => 'Ketchup', 'price' => 1.95, 'quantity' => 2, 'scanned' => false],
		// 		['product_id' => 16, 'name' => 'Bitterballen', 'price' => 1.95, 'quantity' => 10, 'scanned' => false],
		// 	]
		// ];
	}
}
