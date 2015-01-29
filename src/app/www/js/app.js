angular.module('wobbe', ['ionic', 'wobbe.controllers', 'wobbe.services'])

// Define API url, the resources (defined in services.js) will use this for API requests
//.constant('APIURL', 'http://private-a4221-wobbe1.apiary-mock.com/')
.constant('APIURL', 'http://188.166.58.49/')

// Configure routes
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('sign-in', {
			url: '/sign-in',
			templateUrl: 'templates/sign-in.html',
			controller: 'SignInCtrl'
		})
		.state('menu', {
			url: '/menu',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'MainCtrl'
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
        .state('menu.payment', {
            url: '/payment/:listId',
			views: {
				'menuContent': {
					templateUrl: 'templates/payment.html',
					controller: 'PaymentCtrl'
				}
			}
		})
		;

	// Default route
    $urlRouterProvider.otherwise('/sign-in');
})
;

