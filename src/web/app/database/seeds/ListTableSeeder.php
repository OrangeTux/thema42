<?php

class ListTableSeeder extends Seeder
{
	function run()
	{
		DB::table('lists')->truncate();

		List::create(array(
			'title'	=>	'Morgenavond',
			'user_id'	=>	1
		));
	}
}
