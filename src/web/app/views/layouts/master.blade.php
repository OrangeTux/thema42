<!DOCTYPE html>
	<!--[if IE 7 ]><html class="ie ie7" lang="en"><![endif]-->
	<!--[if IE 8 ]><html class="ie ie8" lang="en"><![endif]-->
	<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<title>Centum</title>
		<!-- Mobile Specific
		================================================== -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		@include('layouts.stylesheets')
		@include('layouts.javascript')
		@yield('javascript')
	</head>
	<body>
		<div id="wrapper">
			<div class="container ie-dropdown-fix">
				@include('layouts.header')
				@include('layouts.navbar')
			</div>
			<div class="container">
				@yield('content')
			</div>
	 	</div>

		@include('layouts.footer')

	</body>
</html>
