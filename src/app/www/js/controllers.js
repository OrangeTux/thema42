angular.module('wobbe.controllers', [])

.controller('SignInCtrl', function ($scope, $state) {
	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('tabs.home');
	};
})

.controller('HomeTabCtrl', function($scope) {
	console.log('HomeTabCtrl');
});

