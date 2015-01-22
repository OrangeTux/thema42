<?php

class ListTableSeeder extends Seeder
{
	function run()
	{
		DB::table('lists')->truncate();

		ShoppingList::create(array(
			'title'	=>	'Morgenavond',
			'user_id'	=>	1
		));
	}
}
