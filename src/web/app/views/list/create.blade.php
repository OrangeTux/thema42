@extends('layouts.master')

@include('list.assets')

@section('content')
	@include('layouts.my_wobbe')
	<h3>Nieuwe boodschappenlijst maken</h3>

	<div class="sixteen columns">
		<div class="large-notice new-shoppinglist">
			{{ Form::open(['class' => 'new-shoppinglist-form']) }}
				<div class="field">
					<input type="text" name="title" class="text title" placeholder="Titel van uw boodschappenlijst"/>
				</div>

				<div class="field">
					<input type="button" id="create" class="button-save" value="Producten toevoegen"/>
				</div>

			{{ Form::close() }}
		</div>
	</div>

	<script type="text/javascript">
		$(function() {
			bindActionsToCreateForm();
		});
	</script>
@stop
