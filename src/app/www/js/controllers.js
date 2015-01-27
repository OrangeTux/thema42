angular.module('wobbe.controllers', ['ngCordova'])

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, Lists, $ionicPopup, $location, $cordovaBarcodeScanner) {
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

    $scope.scan = function() { $cordovaBarcodeScanner.scan().then(function(data) {
            alert(data.text);
            console.log('Wobbe: scanned!');
        }, function(error) {
            alert('Scan is misgegaan. Probeer het opnieuw.')
            console.log('Wobbe: scan failed!');
        });
    };

	window.$scope = $scope;
	document.addEventListener('deviceready', function () {
		if (window.nfc) {
			window.nfc.addTagDiscoveredListener(
				function () {
					console.log('NFC tag discovered.');
					$scope.$broadcast('nfc-detected');
				},
				function () { // success callback
				},
				function (error) { // error callback
					console.log('Error adding NFC listener!' + JSON.stringfy(error));
				}
			);
		}
	}, false);
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
		}, function (error) {
			console.log(error);
			switch (error.status) {
				default:
					$scope.message = 'Er is een fout opgetreden. Probeer het opnieuw.';
					break;
				case 200:
					$scope.message = 'Uw inloggegevens zijn onjuist.';
					break;
			}
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

.controller('PaymentCtrl', function ($scope, $stateParams, Lists, $location) {
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

	if (Math.random() > 0.6) {
		$scope.showOverlay(
			'"Willekeurige" steekproef',
			'Helaas, u bent geselecteerd voor een steekproef. Een medewerker komt zo snel mogelijk bij u. Deze steekproef is volledig "willekeurig" en is bepaald ongeacht uw etniciteit.'
		);
	}

	$scope.paymentCompletePopup = function () {
		$scope.showOverlay(
			'Betaling afgerond',
			'Uw betaling is afgerond.<br/><br/>Bedankt voor uw aankauf bei WOBBE ZWEITAUSEND!'
		);
	};

	$scope.$on('nfc-detected', function () {
		if ( ! $location.path().match(/^\/menu\/payment/)) {
			return;
		}
		$scope.paymentCompletePopup();
	});
})
;

