<?php

class ProductTableSeeder extends Seeder
{
	function run()
	{
		DB::table('products')->truncate();

		Product::create([
			'name'	=>	'melk',
			'price'	=>	1.00
			],[
			'name' =>	'brood',
			'price'	=>	1.49
			],[
			'name'	=>	'kaas',
			'price'	=>	2.79
			],[
			'name'	=>	'appel',
			'price'	=>	0.32
		]);
	}
}
