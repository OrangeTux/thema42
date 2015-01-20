<?php

class UserTableSeeder extends Seeder
{
	function run()
	{
		DB::table('users')->truncate();

		User::create(array(
			'name'	=>	'John',
			'surname'	=>	'Doe',
			'email'	=>	'johndoe@foobar.com',
			'password'	=>	'banana'
		));
	}
}
