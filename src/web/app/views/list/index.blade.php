@extends('layouts.master')

@include('list.assets')

@section('content')
	@include('layouts.my_wobbe')
	@foreach($shoppingLists as $shoppingList)
		<div class="five columns all-lists">
			<div class="large-notice shoppinglist">

				<div class="shoppinglist-actions">
					<span class="edit" onclick="window.location.href='{{ URL::route('list.edit', $shoppingList->id) }}'"></span>
					<span class="delete"></span>
				</div>

				<h3>{{ $shoppingList->title }}</h3>
				<ul>
					@foreach($shoppingList->products->slice(0,8) as $product)
						<li>
							<span class="product-info {{ $product->scanned ? 'scanned' : "" }}">
								<span class="name">
									{{ $product->name }}
								</span>
								<span class="quantity">
									{{ $product->quantity }}x
								</span>
							</span>
						</li>
					@endforeach
				</ul>

				<div class="shoppinglist-show-more">
					<span class="show-more"><a href="{{ URL::route('list.show', $shoppingList->id) }}">Toon meer...</a></span>
				</div>
			</div>
		</div>
	@endforeach
@stop
