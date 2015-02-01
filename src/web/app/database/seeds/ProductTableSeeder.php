<?php

class ProductTableSeeder extends Seeder {
	
	public function run() {
		$products = [
			[8718770, 'Goudkuipje Naturel', 1.00],
			[23065369, 'Geraspte Kaas', 1.90],
            [23044012, 'Zilveruitjes', 3.45],
            [87316278, 'Peterselie', 0.89],
            [87316261, 'Oregano', 0.78]
		];

		foreach ($products as & $product) {
            Product::create([
                'id' => $product[0],
				'name' => $product[1],
				'price' => $product[2]				
			]);
		}
	}
}
