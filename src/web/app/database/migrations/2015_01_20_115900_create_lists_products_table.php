<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListsProductsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lists_products', function(Blueprint $table)
		{
			$table->increments('id')->unsigned();
			$table->integer('list_id');
			$table->integer('product_id');
			$table->integer('quantity')->unsigned();
			$table->boolean('scanned');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('lists_products');
	}

}
