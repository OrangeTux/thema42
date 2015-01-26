angular.module('wobbe', ['ionic', 'wobbe.controllers', 'wobbe.services'])

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('signin', {
			url: '/sign-in',
			templateUrl: 'templates/sign-in.html',
			controller: 'SignInCtrl'
		})
		.state('menu', {
			url: '/menu',
			abstract: true,
			templateUrl: 'templates/menu.html'
		})
		.state('menu.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
				}
			}
		})
		;

	// $urlRouterProvider.otherwise('/sign-in');
	$urlRouterProvider.otherwise('/menu/about');
})

;

