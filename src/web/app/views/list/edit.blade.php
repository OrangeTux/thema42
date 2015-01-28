@extends('layouts.master')

@include('list.assets')

@section('content')
	@include('layouts.my_wobbe')
	<h3>Wijzigen boodschappenlijst {{ $shoppingList->title }}</h3>

	<div class="sixteen columns">
		<div class="large-notice edit-shoppinglist">

			<!-- Success Message -->
			<div class="success-message">
				<div class="notification success closeable">
					<p><span>Success!</span> Your message has been sent.</p>
				</div>
			</div>

			{{ Form::open(['class' => 'edit-shoppinglist-form']) }}
				<span id="field__list_info___list_id__{{ $shoppingList->id }}" style="display: none;"></span>
				<div class="field">
					<input type="text" name="title" class="text title" placeholder="Titel van uw boodschappenlijst" value="{{ $shoppingList->title }}"/>
				</div>

				<div class="field search-products-block">
					<input type="text" id="location__top" name="new_product" class="text new_product search_product" placeholder="Nieuw product toevoegen, begin met typen om te zoeken." />
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
					@foreach($shoppingList->products as $product)
						<div class="field product-row" id="field__product_row___product_id__{{ $product->id }}">
							<div id="field__name___product_id__{{ $product->id }}" class="text name">{{ $product->name }}</div>
							<input type="number" id="field__quantity___product_id__{{ $product->id }}" class="text quantity" value="{{ $product->quantity }}" />
							<span id="field__scanned___product_id__{{ $product->id }}___is_scanned__{{ $product->scanned }}" style="display: none;"></span>
							<div class="actions">
								<div id="action__increment___product_id__{{ $product->id }}" class="add"></div>
								<div id="action__remove___product_id__{{ $product->id }}" class="remove"></div>
							</div>
						</div>
					@endforeach
				</div>

				<div class="field search-products-block">
					<input type="text" id="location__bottom" name="new_product" class="text new_product search_product" placeholder="Nieuw product toevoegen, begin met typen om te zoeken." />
					<div class="search_results" id="search-results-bottom"></div>
				</div>

				<div class="field">
					<input type="button" id="send" class="button-save" value="Opslaan"/>
				</div>

			{{ Form::close() }}
		</div>
	</div>

	<!--
		 ########################
		 # 		Templates 		#
		 ########################
	 -->

	 <!-- Template search result product row. -->
	<div id="tpl_search_result_product_row" style="display: none;">
		<div class="search-result-product-row" id="field__search_result_product_row___location__{#location#}___product_id__{#product_id#}">
			<span class="product-name">{#product_name#}</span>
			<span class="add-product"></span>
		</div>
	</div>

	<!-- Template new product row. -->
	<div id="tpl_new_product_row" style="display: none;">
		<div class="field product-row new-product-row" id="field__product_row___product_id__{#product_id#}">
			<div id="field__name___product_id__{#product_id#}" class="text name">{#product_name#}</div>
			<input type="number" id="field__quantity___product_id__{#product_id#}" class="text quantity" value="{#product_quantity#}" />
			<span id="field__scanned___product_id__{#product_id#}___is_scanned__{#product_scanned#}" style="display: none;"></span>
			<div class="actions">
				<div id="action__increment___product_id__{#product_id#}" class="add"></div>
				<div id="action__remove___product_id__{#product_id#}" class="remove"></div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		$(function() {
			getAllProducts();
			bindActionsToEditForm();
		});
	</script>
@stop
