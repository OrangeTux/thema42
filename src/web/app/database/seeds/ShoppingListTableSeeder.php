<?php

use Seeder;

class ShoppingListTableSeeder extends Seeder {
	
	public function run() {
		$shoppingLists = [
			[1, 'Weekboodschappen'],
			[1, 'Zaterdag'],
			[2, 'Zondag'],
			[2, 'Weekboodschappen'],
			[3, 'Vakantieboodschappen'],
			[3, 'Weekendboodschappen'],
			[4, 'Woensdagmiddag'],
			[4, 'Maandboodschappen']
		];

		foreach ($shoppingLists as & $shoppingList) {
			ShoppingList::create([
				'user_id' => $shoppingList[0],
				'title' => $shoppingList[1]
			]);
		}
	}
}
