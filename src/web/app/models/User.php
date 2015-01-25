<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {
	protected $table = 'users';
	protected $hidden = ['password'];
	protected $fillable = ['first_name', 'last_name', 'email', 'password'];

	public function shoppingLists() {
		return $this->hasMany('ShoppingList');
	}

	public function getAuthIdentifier() {
		return $this->getKey();
	}

	public function getAuthPassword() {
		return $this->password;
	}

	public function getRememberToken() {
		return $this->remember_token;
	}

	public function setRememberToken($value) {
		$this->remember_token = $value;
	}

	public function getRememberTokenName() {
		return 'remember_token';
	}

	public function getReminderEmail() {
		return $this->email;
	}

}
