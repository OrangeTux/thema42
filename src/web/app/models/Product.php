<?php

class Product extends Eloquent {
	protected $table = 'products';
	public $timestamps = false;

	public function shoppingLists() {
		return $this->belongsToMany('ShoppingList');
	}
}
