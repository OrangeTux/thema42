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
		.state('menu.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'templates/list.html',
					controller: 'HomeCtrl'
				}
			}
		})
		.state('menu.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
				}
			}
		})
		.state('menu.list', {
			url: '/list/:listId',
			views: {
				'menuContent': {
					templateUrl: 'templates/list.html',
					controller: 'ListCtrl'
				}
			}
		})
		;

	// $urlRouterProvider.otherwise('/sign-in');
	$urlRouterProvider.otherwise('/menu/home');
})

;

