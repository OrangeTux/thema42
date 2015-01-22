@extends('layouts.master')

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
					<input type="text" name="title" class="text title" placeholder="Titel van uw boodschappenlijst" />
				</div>

				<div class="field">
					<input type="text" name="new_article" class="text new_article search_article" placeholder="Nieuw artikel toevoegen, begin met typen om te zoeken." />
				</div>

				<div class="products">
					<h2>Uw producten</h2>
					@foreach($shoppingList['products'] as $product)
						<div class="field product-row">
							<input type="text" name="products[][name]" class="text name" value="{{ $product['name'] }}" />
							<input type="number" name="products[][quantity]" class="text quantity" value="{{ $product['quantity'] }}" />
							<div class="actions">
								<div class="add"></div>
								<div class="remove"></div>
							</div>
						</div>
					@endforeach
				</div>

				<div class="field">
					<input type="text" name="new_article" class="text new_article search_article" placeholder="Nieuw artikel toevoegen, begin met typen om te zoeken." />
				</div>

				<div class="field">
					<input type="button" id="send" class="button-save" value="Opslaan"/>
				</div>

			{{ Form::close() }}
		</div>
	</div>
@stop
