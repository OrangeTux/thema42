<?php

class ProductTableSeeder extends Seeder {
	
	public function run() {
		$products = [
			['Melk', 1.00],
			['Brood', 1.90],
			['Kaas', 3.45],
			['Worst', 2.30],
			['Appel', 0.35],
			['Banaan', 0.65],
			['Gehakt', 2.50],
			['Hamlappen', 6.55],
			['Toiletpapier', 3.55],
			['Vuilniszakken', 2.25]
		];

		foreach ($products as & $product) {
			Product::create([
				'name' => $product[0],
				'price' => $product[1]				
			]);
		}
	}
}
