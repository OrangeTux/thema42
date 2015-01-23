<?php

class ShoppingList extends Eloquent
{
	protected $table = 'lists';
	protected $fillable = array('title');

	function user()
	{
		return $this->belongsTo('User');
	}	
}

