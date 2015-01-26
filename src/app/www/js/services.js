angular.module('wobbe.services', ['ngResource'])


.factory('Lists', function($resource) {
    var URL = 'http://private-anon-a27e4c66b-wobbe1.apiary-mock.com/api/v1/'

    return $resource('lists/:id')
});
