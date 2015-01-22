@extends('layouts.master')

@section('content')
	@foreach($shoppingLists as $shoppingList)
		<div class="five columns all-lists">
			<div class="large-notice shoppinglist">

				<div class="shoppinglist-actions">
					<span class="edit">Edit</span>
					<span class="delete">Delete</span>
				</div>

				<h3>{{ $shoppingList['title'] }}</h3>
				<ul>
					@foreach(array_slice($shoppingList['products'], 0, 8) as $product)
						<li>
							<span class="{{ $product['scanned'] ? 'scanned' : "" }}">
								{{ $product['name'] }} {{ $product['quantity'] }}x
							</span>
						</li>
					@endforeach
				</ul>

				<div class="shoppinglist-show-more">
					<span class="show-more"><a href="{{ URL::route('list.show', $shoppingList['id']) }}">Toon meer...</a></span>
				</div>
			</div>
		</div>
	@endforeach
@stop
