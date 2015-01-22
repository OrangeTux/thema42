<?php

class ShoppingList extends Eloquent
{
	protected $table = 'lists';
	
	function user()
	{
		return $this->belongsTo('User');
	}	
}

