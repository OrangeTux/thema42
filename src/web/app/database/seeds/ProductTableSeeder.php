<?php

class ProductTableSeeder extends Seeder
{
	function run()
	{
		DB::table('products')->truncate();

		$products = [
			['Melk', 1.00],
			['Brood', 1.49],
			['Kaas', 2.75],
			['Appel', 0.35],
			['Banaan', 0.75]
		];

		foreach ($products as & $product)
		{
			Product::create([
				'name' => $product[0],
				'price'	=> $product[1]
			]);
		}
	}
}
