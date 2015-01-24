<?php

class User extends Eloquent {
	protected $table = 'users';
	protected $hidden = ['password'];
	protected $fillable = ['first_name', 'last_name', 'email', 'password'];

	public function shoppingLists() {
		return $this->hasMany('ShoppingList');
	}
}
