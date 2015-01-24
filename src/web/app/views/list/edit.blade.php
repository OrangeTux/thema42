@extends('layouts.master')

@include('list.assets')

@section('content')
	@include('layouts.my_wobbe')
	<h3>Wijzigen boodschappenlijst {{ $shoppingList['title'] }}</h3>

	<div class="sixteen columns">
		<div class="large-notice edit-shoppinglist">

			<!-- Success Message -->
			<div class="success-message">
				<div class="notification success closeable">
					<p><span>Success!</span> Your message has been sent.</p>
				</div>
			</div>

			{{ Form::open() }}
				<div class="field">
					<input type="text" name="title" class="text title" placeholder="Titel van uw boodschappenlijst" value="{{ $shoppingList['title'] }}"/>
				</div>

				<div class="field">
					<input type="text" name="new_product" class="text new_product search_product" placeholder="Nieuw product toevoegen, begin met typen om te zoeken." />
					<div class="search_results" id="search-results-top"></div>
				</div>

				<div class="notification error closeable error-message" style="display: none !important;">
					<p>
						<span id="title">Error!</span><br />
						<p id="message">
							Please fill in all the fields required.
						</p>
					</p>
				</div>

				<div class="products">
					<h2>Uw producten</h2>
					@foreach($shoppingList['products'] as $product)
						<div class="field product-row" id="field__product_row___product_id__{{ $product['product_id'] }}">
							<input type="text" name="products[][name]" id="field__name___product_id__{{ $product['product_id'] }}" class="text name" value="{{ $product['name'] }}" />
							<input type="number" name="products[][quantity]" id="field__quantity___product_id__{{ $product['product_id'] }}" class="text quantity" value="{{ $product['quantity'] }}" />
							<div class="actions">
								<div id="action__increment___product_id__{{ $product['product_id'] }}" class="add"></div>
								<div id="action__remove___product_id__{{ $product['product_id'] }}" class="remove"></div>
							</div>
						</div>
					@endforeach
				</div>

				<div class="field">
					<input type="text" name="new_product" class="text new_product search_product" placeholder="Nieuw product toevoegen, begin met typen om te zoeken." />
					<div class="search_results" id="search-results-bottom"></div>
				</div>

				<div class="field">
					<input type="button" id="send" class="button-save" value="Opslaan"/>
				</div>

			{{ Form::close() }}
		</div>
	</div>
@stop
