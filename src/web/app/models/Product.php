<?php

class Product extends Eloquent {
	protected $table = 'products';
	protected $hidden = ['pivot'];
	protected $appends = ['quantity', 'scanned'];	
	public $timestamps = false;

	public function shoppingLists() {
		return $this->belongsToMany('ShoppingList');
	}

	public function getQuantityAttribute() {
		return $this->pivot->quantity;
	}

	public function getScannedAttribute() {
		return $this->pivot->scanned; 
	}
}
