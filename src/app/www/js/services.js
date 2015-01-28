angular.module('wobbe.services', ['ngResource'])

.factory('Lists', function ($resource, APIURL) {
	return $resource(
        APIURL + 'api/v1/list/:id', 
        {}, 
        {
            update: { 
                url: APIURL + 'api/v1/list/:id',
                method: 'PUT',
                params: {id: '@id'}
            }
        }
    );
})

.factory('Products', function ($resource, APIURL) {
	return $resource(APIURL + 'api/v1/product/:id');
})

.factory('Beacons', function ($q) {
	var deferred  = $q.defer();
	var callbacks = [];

	if (! window.cordova || ! cordova.plugins.locationManager) {
		console.log('[BEACON] Not supported.');
		deferred.reject('Not supported');
	} else {
		document.addEventListener('deviceready', function () {
			console.log('[BEACON] Initialize.');

			var delegate = new cordova.plugins.locationManager.Delegate();

			delegate.didDetermineStateForRegion = function (pluginResult) {
				console.log('[BEACON] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
			};

			delegate.didStartMonitoringForRegion = function (pluginResult) {
				console.log('[BEACON] didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
			};

			delegate.didRangeBeaconsInRegion = function (pluginResult) {
				console.log('[BEACON] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
				callbacks.forEach(function (cb) {
					cb(pluginResult);
				});
			};

			// var uuid = '00287661-76E4-237C-9E81-AD4BA1190000';
			var identifier = 'Wobbe2000Beacon';
			var uuid       = 'FABFA2BD-0146-7D6E-3804-ABAD05160A18';
			var major      = 1796;
			var minor      = 1289;
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

			cordova.plugins.locationManager.setDelegate(delegate);

			cordova.plugins.locationManager.requestWhenInUseAuthorization();

			cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();

			deferred.resolve();
		}, false);
	}

	return {
		addCallback: function (cb) {
			callbacks.push(cb);
		},
		promise: deferred.promise
	};
})

;
