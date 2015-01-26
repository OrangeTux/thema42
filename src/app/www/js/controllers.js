angular.module('wobbe.controllers', ['ngRoute'])

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, Lists) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.lists = Lists.query();
})

.controller('SignInCtrl', function ($scope, $state) {
	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('menu.about');
	};
})

.controller('HomeCtrl', function ($scope, $state) {
	$scope.list = $scope.lists[0];
})

.controller('ListCtrl', function ($scope, $routeParams) {
	console.log($routeParams);
	// $scope.list = Lists.get(parseInt($routeParams.listId));
})

;

