@extends('layouts.master')

@section('content')
	<h1>Mijn Wobbe</h1>
	<h2>Boodschappenlijst {{ $shoppingList['title'] }}</h2>
	<div class="single-shoppinglist">
		<div class="large-notice shoppinglist">
			<h2>{{ $shoppingList['title'] }}</h2>
			<ul>
				@foreach($shoppingList['products'] as $product)
					<li>
						<span class="product-name {{ $product['scanned'] ? 'scanned' : "" }}">
							{{ $product['name'] }}
						</span>
						<span class="product-quantity">
							{{ $product['quantity'] }}x
						</span>
					</li>
				@endforeach
			</ul>
		</div>
	</div>
@stop
