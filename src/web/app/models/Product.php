<?php

class Product extends Eloquent
{
	public $timestamps = false;

	protected $table = 'products';

	function lists()
	{
		return $this->hasMany('ListProduct', 'product_id', 'product_id');
	}
}
