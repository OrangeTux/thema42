<?php

class UserTableSeeder extends Seeder
{
	function run()
	{
		DB::table('users')->truncate();

		User::create(array(
			'name'	=>	'Jeroen',
			'surname'	=>	'Kruis',
			'email'	=>	'kruisjeroen@gmail.com',
			'password'	=>	'Hash::make('banaan')'
		));
	}
}
