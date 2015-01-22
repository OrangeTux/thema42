<?php

class ListProductTableSeeder extends Seeder
{
	function run()
	{
		DB::table('lists_products')->truncate();

		ListProduct::create([
			'list_id'	=>	1,
			'product_id'	=>	1,
			'quantity'	=>	2,
			'scanned'	=>	false
			]);
	}
}
