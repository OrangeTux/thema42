<?php

class UserController extends BaseController {

	function login()
	{
		return View::make('user.login');
	}

	function doLogin()
	{
		$email    = Input::get('email');
		$password = Input::get('password');

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
			return Redirect::intended(URL::route('home.index'));
		} else {
			// Invalid credentials
		}
	}

	function logout()
	{
		Auth::logout();
		return Redirect::intended(URL::route('home.index'));
	}

}
