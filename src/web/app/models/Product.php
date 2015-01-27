<?php

class Product extends Eloquent {
    protected $table = 'products';
    protected $hidden = ['pivot'];
    protected $appends = ['quantity', 'scanned'];
    public $timestamps = false;

    public static $withoutAppends = false;

    public function shoppingLists() {
        return $this->belongsToMany('ShoppingList');
    }

    protected function getArrayableAppends()
    {
        if(self::$withoutAppends){
            return [];
        }
        return parent::getArrayableAppends();
    }

    public function getQuantityAttribute() {
        return $this->pivot->quantity;
    }

    public function getScannedAttribute() {
        return $this->pivot->scanned;
    }
}
