<?php

class ListProduct extends Eloquent
{
	public $timestamps = false;

	protected $table = 'lists_products';
	
	protected $fillable = array('title');
	function product()
	{
		return $this->belongsTo('Product');	
	}
}
