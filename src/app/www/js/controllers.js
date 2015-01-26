angular.module('wobbe.controllers', [])

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, Lists) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.lists = Lists.all();
})

.controller('SignInCtrl', function ($scope, $state) {
	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('menu.about');
	};
})

;

