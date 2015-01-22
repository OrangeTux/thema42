<?php

namespace Api;

use BaseController;
use User;
use Input;
use Response;
use Auth;
use Hash;

class UserController extends BaseController 
{
	public function login()
	{
		$password = Input::get('password');
		$email = Input::get('email');

		if (Auth::attempt(array('email' => $email, 'password' => $password))) {
			return User::where('email', '=', $email)->firstOrFail(); 
		} else {
			return Response::JSON(['message' => 'Invalid credentials'], 404);
		}
	}

	public function store()
	{
		$user = Input::all();

		$user['password'] = Hash::make($user['password']);

		User::create($user);
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return User::findOrFail($id);
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
