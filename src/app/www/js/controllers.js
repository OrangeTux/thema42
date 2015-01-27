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

	$scope.signOut = function () {
		delete $http.defaults.headers.common['Authorization'];
		$state.go('sign-in');
	};
})

.controller('SignInCtrl', function ($scope, $state, $http, APIURL) {
	$scope.message = '';

	$scope.signIn = function(user) {
		if ( ! user || ! user.username || ! user.password) {
			$scope.message = 'Vul a.u.b. alle velden in.';
			return;
		}
		$scope.message = '';
		$http({
			method: 'POST',
			url: APIURL + 'api/v1/user/auth',
			data: {
				email: user.username,
				password: user.password
			}
		}).then(function (response) {
			$http.defaults.headers.common['Authorization'] = response.data.token;
			$scope.message = '';
			$state.go('menu.home');
		}, function () {
			$scope.message = 'Uw inloggegevens zijn onjuist.';
			console.log(arguments);
		});
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

