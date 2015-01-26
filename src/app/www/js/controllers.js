angular.module('wobbe.controllers', [])

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, Lists, $ionicPopup, $location) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.lists = Lists.query();

	$scope.showOverlay = function (title, content) {
		$ionicPopup.alert({
			title: title,
			template: content
		});
	};
	$scope.showAdvertisement = function () {
		$scope.showOverlay(
			'De laatste aanbieding!',
			'<span class="advertisement">Deze week:<br/>een GRATIS album van<br/>The Afterpartees<br/>bij aanschaf van de Tina.</span>'
		);
	};

	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
})

.controller('SignInCtrl', function ($scope, $state) {
	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('menu.about');
	};
})

.controller('HomeCtrl', function ($scope, $state) {
	return $scope.lists.$promise.then(function (lists) {
		$scope.list = lists[0];
	});
})

.controller('ListCtrl', function ($scope, $stateParams, Lists) {
	var listId = $stateParams.listId;
	$scope.list = Lists.get({ id: listId });
})

.controller('PaymentCtrl', function ($scope, $stateParams, Lists) {
	var listId = $stateParams.listId;

	$scope.list = Lists.get({ id: listId });

    $scope.total = function() {
        if (!$scope.list.products) {
            return 0
        }

        var total = 0;
        $scope.list.products.forEach(function (product) {
            total += product.scanned * product.price
        });
        return total;
    };
})
;

