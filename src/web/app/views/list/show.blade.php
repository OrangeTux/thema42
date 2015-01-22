@extends('layouts.master')

@section('content')
	<h1>Mijn Wobbe</h1>
	<h2>Boodschappenlijst {{ $shoppingList['title'] }}</h2>
	<div class="single-shoppinglist">
		<div class="large-notice shoppinglist">

			<div class="shoppinglist-actions">
				<span class="edit"><a href="{{ URL::route('list.edit', $shoppingList['id']) }}">Edit</a></span>
				<span class="delete">Delete</span>
			</div>

			<h2>{{ $shoppingList['title'] }}</h2>
			<ul>
				@foreach($shoppingList['products'] as $product)
					<li>
						<span class="product-info {{ $product['scanned'] ? 'scanned' : "" }}">
							<span class="name">
								{{ $product['name'] }}
							</span>
							<span class="quantity">
								{{ $product['quantity'] }}x
							</span>
						</span>
					</li>
				@endforeach
			</ul>

			<input type="button" class="button goto-edit-list" onclick="window.location.href='{{ URL::route('list.edit', $shoppingList['id']) }}'" value="Wijzigen" />
		</div>
	</div>
@stop
