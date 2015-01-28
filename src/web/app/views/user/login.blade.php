@extends('layouts.master')

@section('content')
	<div id="page-title">
		<h2>Inloggen</h2>
		<div id="bolded-line"></div>
	</div>
	<div class="sixteen columns">
		{{ Form::open(['route' => 'user.doLogin', 'method' => 'POST', 'class' => 'login']) }}
			<div class="login-form">
				<div class="field">
					{{ Form::text('email', null, ['class' => 'email']) }}
				</div>
				<div class="field">
					{{ Form::password('password', null, ['class' => 'password']) }}
				</div>
				<div class="field">
					{{ Form::submit('Inloggen', ['class' => 'submit-form button color']) }}
				</div>
			</div>
		{{ Form::close() }}
	</div>

@stop

