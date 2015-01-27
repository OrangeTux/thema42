angular.module('wobbe.services', ['ngResource'])

.factory('Lists', function ($resource, APIURL) {
	return $resource(APIURL + 'api/v1/list/:id');
})

.factory('Products', function ($resource, APIURL) {
	return $resource(APIURL + 'api/v1/product/:id');
})

.factory('Beacons', function () {
	var delegate = new cordova.plugins.locationManager.Delegate();

	document.addEventListener('deviceready', function () {
		delegate.didDetermineStateForRegion = function (pluginResult) {
			console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		};

		delegate.didRangeBeaconsInRegion: function (pluginResult) {
			console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
			// Do stuff here..
		};

		var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
		var identifier = 'beaconOnTheMacBooksShelf';
		var minor = 1000;
		var major = 5;
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

		cordova.plugins.locationManager.setDelegate(delegate);

		cordova.plugins.locationManager.requestWhenInUseAuthorization();

		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done();

		deferred.resolve();
	}, false);

	return deferred.promise;
})

;
