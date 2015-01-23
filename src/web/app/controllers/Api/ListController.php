<?php

namespace Api;

use DB;
use Basecontroller;
use User;
use ShoppingList;

class ListController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($user_id)
	{
		// Retrieve user lists
		$lists = User::find($user_id)->lists;

		// Add products to lists
		foreach ($lists as $list) {
			$list->products;
		}

		return $lists;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($user_id, $list_id)
	{
		$list = ShoppingList::find($list_id)
					->where('user_id', '=', $user_id)
					->firstOrFail();

		$list->products;

		return $list;
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
