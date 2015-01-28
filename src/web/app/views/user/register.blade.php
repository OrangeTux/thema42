@extends('layouts.master')

@include('user.assets')

@section('content')
	<div id="page-title">
		<h2>Registreren</h2>
		<div id="bolded-line"></div>
	</div>
	<div class="sixteen columns">
		<div class="notification error closeable error-message" style="display: none !important;">
			<p>
				<span id="title">Error!</span><br />
				<p id="message">
					Please fill in all the fields required.
				</p>
			</p>
		</div>
		{{ Form::open(['class' => 'register']) }}
			<div class="register-form">
				<div class="field">
					{{ Form::label('first_name', 'Voornaam:') }}
					{{ Form::text(
						'first_name',
						null,
						[
							'class' => 'first_name',
							'id' => 'first_name',
						]) }}
				</div>
				<div class="field">
					{{ Form::label('last_name', 'Achternaam:') }}
					{{ Form::text(
						'last_name',
						null,
						[
							'class' => 'last_name',
							'id' => 'last_name',
						]) }}
				</div>
				<div class="field">
					{{ Form::label('email', 'E-mailadres:') }}
					{{ Form::text(
						'first_name',
						null,
						[
							'class' => 'email',
							'id' => 'email',
						]) }}
				</div>
				<div class="field">
					{{ Form::label('password', 'Wachtwoord:') }}
					{{ Form::password(
						'password',
						null,
						[
							'class' => 'password',
							'id' => 'password',
						]) }}
				</div>
				<div class="field">
					{{ Form::submit('Registreren', ['id' => 'register', 'class' => 'submit-form button color']) }}
				</div>
			</div>
		{{ Form::close() }}
	</div>
	<script type="text/javascript">
		$(function() {
			bindActions();
		});
	</script>
@stop

