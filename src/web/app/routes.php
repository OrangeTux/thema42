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

Route::get('/', ['as' => 'home.index', 'uses' => 'HomeController@index']);

Route::group(['prefix' => 'api', 'namespace' => 'Api'], function()
{
	Route::post('/user/create', ['uses' => 'UserController@store']);
	Route::post('/user/auth', ['uses' => 'UserController@login']);
});

Route::resource('list', 'ListController');
