angular.module('wobbe', ['ionic', 'wobbe.controllers', 'wobbe.services'])

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('signin', {
			url: '/sign-in',
			templateUrl: 'templates/sign-in.html',
			controller: 'SignInCtrl'
		})
		.state('forgotpassword', {
			url: '/forgot-password',
			templateUrl: 'templates/forgot-password.html'
		})
		.state('tabs', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html'
		})
		.state('tabs.home', {
			url: '/home',
			views: {
				'home-tab': {
					templateUrl: 'templates/home.html',
					controller: 'HomeTabCtrl'
				}
			}
		})
		.state('tabs.about', {
			url: '/about',
			views: {
				'about-tab': {
					templateUrl: 'templates/about.html'
				}
			}
		});

	$urlRouterProvider.otherwise('/sign-in');
});

