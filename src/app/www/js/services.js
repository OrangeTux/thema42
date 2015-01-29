angular.module('wobbe.services', ['ngResource'])

.factory('Lists', function ($resource, APIURL) {
	return $resource(
        APIURL + 'api/v1/list/:id', 
        {}, 
        {
			// Custom resource action for updating an entire list.
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

    if (window.cordova) {
		// Start beacon ranging as soon as device is ready.
		document.addEventListener('deviceready', function () {
			console.log('[BEACON] Initialize.');

			var delegate = new cordova.plugins.locationManager.Delegate();

			delegate.didDetermineStateForRegion = function (pluginResult) {
				console.log('[BEACON] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
			};

			delegate.didStartMonitoringForRegion = function (pluginResult) {
				console.log('[BEACON] didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
			};

			delegate.didEnterRegion = function (pluginResult) {
				console.log('[BEACON] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
				callbacks.forEach(function (cb) {
					cb(pluginResult);
				});
			};

			var identifier = 'Wobbe2000Beacon';
			var uuid       = 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E'
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

			cordova.plugins.locationManager.setDelegate(delegate);

			cordova.plugins.locationManager.requestWhenInUseAuthorization();

			cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();

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
