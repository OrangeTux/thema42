<?php

class UserTableSeeder extends Seeder
{
	function run()
	{
		DB::table('users')->truncate();

		$newUser = Sentry::createUser([
			'name'	=>	'John',
			'surname'	=>	'Doe',
			'email'	=>	'johndoe@foobar.com',
			'password'	=>	'banana'
		]);
	}
}
