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
	}
}
