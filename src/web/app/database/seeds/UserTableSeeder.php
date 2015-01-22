<?php

class UserTableSeeder extends Seeder
{
	function run()
	{
		DB::table('users')->truncate();

		User::create(array(
			'first_name'	=>	'Jeroen',
			'last_name'	=>	'Kruis',
			'email'	=>	'kruisjeroen@gmail.com',
			'password'	=>	Hash::make('banaan')
		));
	}
}
