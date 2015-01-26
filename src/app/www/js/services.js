angular.module('wobbe.services', ['ngResource'])


.factory('Lists', function ($resource) {
    return $resource('http://private-anon-a27e4c66b-wobbe1.apiary-mock.com/api/v1/list/:id')
});
