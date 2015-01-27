<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeScannedTypeToInteger extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product_shopping_list', function(Blueprint $table)
        {
            DB::unprepared('ALTER TABLE product_shopping_list MODIFY COLUMN scanned integer unsigned not null');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product_shopping_list', function(Blueprint $table)
        {
            DB::unprepared('ALTER TABLE product_shopping_list MODIFY COLUMN scanned boolean');
		});
	}

}
