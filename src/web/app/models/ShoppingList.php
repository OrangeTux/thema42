<?php

class ShoppingList extends Eloquent
{
	protected $table = 'lists';
	protected $fillable = array('title');

	function products()
	{
		return $this->hasManyThrough('Product', 'ListProduct', 'list_id', 'product_id');
	}
}

