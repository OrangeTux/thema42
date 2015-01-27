angular.module('wobbe.services', ['ngResource'])

.factory('Lists', function ($resource, APIURL) {
	return $resource(APIURL + 'api/v1/list/:id');
})

;
