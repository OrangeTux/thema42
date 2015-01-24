<?php

class DatabaseSeeder extends Seeder {

	public function run() {
		Eloquent::unguard();
		
		DB::statement('SET FOREIGN_KEY_CHECKS = 0');

		DB::table('users')->truncate();
		DB::table('products')->truncate();
		DB::table('shopping_lists')->truncate();
		DB::table('product_shopping_list')->truncate();

		$this->call('UserTableSeeder');
		$this->call('ProductTableSeeder');
		$this->call('ShoppingListTableSeeder');

		$this->command->info('Database is successfully seeded!');

		DB::statement('SET FOREIGN_KEY_CHECKS = 1');
	}
}
