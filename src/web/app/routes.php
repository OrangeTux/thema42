<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
    header('Access-Control-Allow-Credentials: true');
}

Route::group(['prefix' => 'api/v1', 'namespace' => 'Api'], function() {
    Route::post('/user/auth', ['uses' => 'Api\UserController@auth']);
    Route::resource('user', 'UserController', ['only' => ['store']]);
});

Route::group(['prefix' => 'api/v1', 'namespace' => 'Api', 'before' => 'basic.once'], function()
{
	Route::resource('list', 'ListController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
	Route::resource('list.product', 'ProductController', ['only' => ['store', 'update', 'destroy']]);
	Route::resource('product', 'ProductController', ['only' => ['index']]);
});

Route::get('/', ['as' => 'home.index', 'uses' => 'HomeController@index']);
Route::get('/login', ['as' => 'user.login', 'uses' => 'UserController@login']);
Route::post('/login', ['as' => 'user.doLogin', 'uses' => 'UserController@doLogin']);
Route::get('/logout', ['as' => 'user.logout', 'uses' => 'UserController@logout']);

Route::group(['before' => 'auth.basic'], function()
{
	Route::resource('list', 'ListController');
});

Route::get('/register', ['as' => 'user.register', 'uses' => 'UserController@register']);
