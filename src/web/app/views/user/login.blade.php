@extends('layouts.master')

@section('content')

	<div class="sixteen columns">
		{{ Form::open(['route' => 'user.doLogin', 'method' => 'POST']) }}
			{{ Form::text('email') }}
			{{ Form::password('password') }}
			{{ Form::submit('Inloggen') }}
		{{ Form::close() }}
	</div>

@stop

