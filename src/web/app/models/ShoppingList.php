<?php

class ShoppingList extends Eloquent {
	protected $table = 'shopping_lists';
	protected $fillable = ['title', 'user_id'];

	public function user() {
		return $this->belongsTo('User');
	}

	public function products() {
		return $this->belongsToMany('Product')->withPivot('quantity', 'scanned');
	}
}
