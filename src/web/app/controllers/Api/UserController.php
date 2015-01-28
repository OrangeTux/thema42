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
	public function auth()
	{
		$email    = Input::get('email');
		$password = Input::get('password');

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user          = Auth::user();
            $user['token'] = 'Basic ' . base64_encode($user->email . ':' . $password);
			return $user;
		}
		
		return Response::json([
			'error' => [
				'message' => 'Invalid credentials'
			]
		], 404);
	}

	public function store()
	{
		$user = Input::all();

		$user['password'] = Hash::make($user['password']);

        User::create($user);

        return Response::json($user, 201);
	}
}
