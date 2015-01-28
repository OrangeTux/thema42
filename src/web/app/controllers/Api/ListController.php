<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Basecontroller;
use Response;
use Validator;
use Input;
use Auth;
use Request;
use User;
use ShoppingList;

class ListController extends BaseController {

    public function index() {
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        if(!Auth::check()) {
            return Response::json([
                'error' => [
                    'message' => 'Malformed request'
                ]
            ], 400);
        }

        try
        {
            $shoppingLists = User::findOrFail($userId)->shoppingLists;

            foreach ($shoppingLists as $shoppingList) {
                $shoppingList->products;
            }
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'User does not exist'
                ]
            ], 404);
        }

        return Response::json($shoppingLists, 200);
    }

    public function getLists($user_id) {
        try
        {
            $shoppingLists = User::findOrFail($user_id)->shoppingLists;

            foreach ($shoppingLists as $shoppingList) {
                $shoppingList->products;
            }
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'User does not exist'
                ]
            ], 404);
        }

        return $shoppingLists;
    }

    public function store() {
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $validator = Validator::make(Input::all(), ['shopping_list' => 'required', 'shopping_list.title' => 'required']);

        if ($validator->fails()) {
            return Response::json([
                'error' => [
                    'message' => 'Malformed request'
                ]
            ], 400);
        }

        $shoppingListData = [
            'user_id' => $userId,
            'title' => Input::get('shopping_list.title')
        ];

        $shoppingList = ShoppingList::create($shoppingListData);

        return $shoppingList;
    }

    public function show($listId) {
        try
        {
            $shoppingList = ShoppingList::findOrFail($listId);
            $shoppingList->products;
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'Shopping list does not exist'
                ]
            ], 404);
        }

        return $shoppingList;
    }

    public function update($listId) {
        $validator = Validator::make(Input::all(), ['title' => 'required']);

        if($validator->fails()) {
            return Response::json([
                'error' => [
                    'message' => 'Malformed request'
                ]
            ], 400);
        }

        try
        {
            $shoppingList = ShoppingList::findOrFail($listId);
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'Shopping list does not exist'
                ]
            ], 404);
        }

        $title = Input::get('title');

        if ($title) {
            $shoppingList->title = $title;
            $shoppingList->save();
        }

        if(Input::get('products')) {
            $products = $shoppingList->products;
            foreach ($products as $product) {
                $shoppingList->products()->detach($product->id);
            }

            foreach (Input::get('products') as $product) {
                $productId = $product['id'];
                unset($product['id']);
                unset($product['price']);
                unset($product['name']);

                $shoppingList->products()->attach($productId, $product);
            }
        }

        return Response::json(Input::all(), 200);
    }

    public function destroy($listId) {
        try
        {
            $shoppingList = ShoppingList::findOrFail($listId);
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'Shopping list does not exist'
                ]
            ], 404);
        }

        $shoppingList->delete();

        return Response::json([
            'success' => [
                'message' => 'Shopping list has been removed'
            ]
        ], 200);
    }
}
