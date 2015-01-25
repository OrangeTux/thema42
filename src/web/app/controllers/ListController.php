<?php

class ListController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$shoppingLists = App::make('Api\ListController')->index(1);

		// print_r($shoppingLists);

		// $shoppingLists[] = [
		// 	'id' => 1,
		// 	'title' => 'Gourmetten',
		// 	'products' => [
		// 		['product_id' => 1, 'name' => 'Lorem', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 2, 'name' => 'ipsum', 'price' => 1.95, 'quantity' => 1, 'scanned' => true],
		// 		['product_id' => 3, 'name' => 'dolor', 'price' => 1.95, 'quantity' => 1, 'scanned' => true],
		// 		['product_id' => 8, 'name' => 'elit.', 'price' => 1.95, 'quantity' => 1, 'scanned' => true],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 2,
		// 	'title' => 'Afterpartees',
		// 	'products' => [
		// 		['product_id' => 9, 'name' => 'Cras', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 10, 'name' => 'eu', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 11, 'name' => 'nibh', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 4, 'name' => 'sit', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 5, 'name' => 'amet,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 6, 'name' => 'consectetur', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 7, 'name' => 'adipiscing', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 12, 'name' => 'tempus,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 13, 'name' => 'blandit', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 14, 'name' => 'purus', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 15, 'name' => 'convallis,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 16, 'name' => 'elementum', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 3,
		// 	'title' => 'Pokeren',
		// 	'products' => [
		// 		['product_id' => 17, 'name' => 'odio.', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 18, 'name' => 'Phasellus', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 19, 'name' => 'volutpat', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 20, 'name' => 'mi', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 21, 'name' => 'ut', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 23, 'name' => 'venenatis', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 24, 'name' => 'tempor.', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 4,
		// 	'title' => 'Pokeren',
		// 	'products' => [
		// 		['product_id' => 25, 'name' => 'Suspendisse', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 26, 'name' => 'placerat', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 32, 'name' => 'Nunc', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 5,
		// 	'title' => 'Pokeren',
		// 	'products' => [
		// 		['product_id' => 33, 'name' => 'facilisis,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 34, 'name' => 'turpis', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 35, 'name' => 'quis', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 36, 'name' => 'iaculis', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 40, 'name' => 'porta', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 6,
		// 	'title' => 'Pokeren',
		// 	'products' => [
		// 		['product_id' => 41, 'name' => 'tortor,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 42, 'name' => 'sed', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 43, 'name' => 'congue', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 37, 'name' => 'ultrices,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 38, 'name' => 'tortor', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 39, 'name' => 'lorem', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 44, 'name' => 'libero', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 45, 'name' => 'quam', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 46, 'name' => 'a', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 47, 'name' => 'mi.', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 48, 'name' => 'Quisque', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

		// $shoppingLists[] = [
		// 	'id' => 7,
		// 	'title' => 'Pokeren',
		// 	'products' => [
		// 		['product_id' => 41, 'name' => 'tortor,', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 42, 'name' => 'sed', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 45, 'name' => 'quam', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 46, 'name' => 'a', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 47, 'name' => 'mi.', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 		['product_id' => 48, 'name' => 'Quisque', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
		// 	]
		// ];

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
		$shoppingList = App::make('Api\ListController')->show(1, $id);
		return View::make('list.show')->with('shoppingList', $shoppingList);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$shoppingList = [
			'id' => 2,
			'title' => 'Afterpartees',
			'products' => [
				['product_id' => 6, 'name' => 'Melk (halfvolle), 2L', 'price' => 1.95, 'quantity' => 1, 'scanned' => false],
				['product_id' => 7, 'name' => 'Coca Cola', 'price' => 1.95, 'quantity' => 10, 'scanned' => false],
				['product_id' => 12, 'name' => 'Coca Cola, Light', 'price' => 1.95, 'quantity' => 3, 'scanned' => false],
				['product_id' => 13, 'name' => 'Coca Cola, Zero', 'price' => 1.95, 'quantity' => 4, 'scanned' => false],
				['product_id' => 14, 'name' => 'Mayonaise', 'price' => 1.95, 'quantity' => 2, 'scanned' => false],
				['product_id' => 15, 'name' => 'Ketchup', 'price' => 1.95, 'quantity' => 2, 'scanned' => false],
				['product_id' => 16, 'name' => 'Bitterballen', 'price' => 1.95, 'quantity' => 10, 'scanned' => false],
			]
		];

		return View::make('list.edit')->with('shoppingList', $shoppingList);
	}
}
