<?php

namespace Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use BaseController;
use Validator;
use Input;
use Request;
use Response;
use Product;
use ShoppingList;

class ProductController extends BaseController {

    public function index() {
        try
        {
            Product::$withoutAppends = true;
            $products = Product::all();
        }
        catch (ModelNotFoundException $exception)
        {
            return Response::json([
                'error' => [
                    'message' => 'No products available'
                ]
            ], 404);
        }

        return Response::json($products, 200);
    }

    public function store($listId) {
        $validator = Validator::make(Input::all(), ['products' => 'required']);

        if ($validator->fails()) {
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

        $products = Input::get('products');

        foreach ($products as $product) {
            $productData = [
                'product_id' => (integer) $product['id'],
                'quantity' => (integer) $product['quantity'],
                'scanned' => (integer) false
            ];

            $shoppingList->products()->attach($shoppingList->id, $productData);
        }

        return Response::json($shoppingList->products, 201);
    }

    public function update($listId, $productId) {
        $validator = Validator::make(Input::all(), ['product' => 'required']);

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

        $productData = Input::get('product');

        $shoppingList->products()->updateExistingPivot($productId, $productData);

        return Response::json($shoppingList->products, 200);
    }

    public function destroy($listId, $productId) {
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

        $shoppingList->products()->detach($productId);

        return Response::json($shoppingList->products, 200);
    }
}
