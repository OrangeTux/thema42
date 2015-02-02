
```javascript
// src/app/www/js/controllers.js

// Show popup
$scope.showOverlay = function (title, content) {
	$ionicPopup.alert({
		title: title,
		template: content
	});
};

// Advertisement popup
$scope.showAdvertisement = function () {
	var name = window.user.first_name;
	$scope.showOverlay(
		'De laatste aanbieding!',
		'<span class="advertisement">' + name + ', speciaal voor jou:<br/>een GRATIS album van<br/>The Afterpartees<br/>bij aanschaf van de TINA.</span>'
	);
};

// Show advertisement when in range of a beacon.
Beacons.addCallback(function (beacons) {
	$scope.showAdvertisement();
});
```

Hieronder wordt het relevante gedeelte uit services.js getoond. Het hele bestand kan online worden gevonden op: [http://goo.gl/gYyziM](http://goo.gl/gYyziM).


```javascript
// src/app/www/js/services.js:

.factory('Beacons', function ($q) {
	var deferred  = $q.defer();
	var callbacks = [];

    if (window.cordova) {
		// Start beacon ranging as soon as device is ready.
		document.addEventListener('deviceready', function () {
			console.log('[BEACON] Initialize.');

			...

			delegate.didEnterRegion = function (pluginResult) {
				console.log('[BEACON] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
				callbacks.forEach(function (cb) {
					cb(pluginResult);
				});
			};

			...

			deferred.resolve();
		}, false);
    } else {
        console.log('[BEACON] Not supported.');
        deferred.reject('Not supported');
    }

	return {
		addCallback: function (cb) {
			callbacks.push(cb);
		},
		promise: deferred.promise
	};
})

;
```

