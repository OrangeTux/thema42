<?php

class List extends Eloquent
{
	function user()
	{
		return $this->belongsTo('User');
	}	
}

