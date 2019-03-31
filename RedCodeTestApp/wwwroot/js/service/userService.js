(function () {
    'use strict';
        app.factory('userService', ['$http', '$q', function ($http, $q) {
            var service = [];

            service.getUsers = function () {

                var deffered = $q.defer();
                $http.get('/User/Get').then(function (result) {
                    deffered.resolve(result.data);
                }, function () {
                    deffered.reject();
                });
                return deffered.promise;
            };

            service.getUserById = function (id) {
                var deffered = $q.defer();
                $http.get('/User/GetById/' + id).then(function (result) {
                    deffered.resolve(result.data);
                }, function () {
                    deffered.reject();
                });
                return deffered.promise;
            };

            service.addUser = function (user) {
                var deferred = $q.defer();
                $http.post('/User/Add', user).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editUser = function (user) {
                var deferred = $q.defer();
                $http.put('/User/Edit', user).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteUser = function (id) {
                var deferred = $q.defer();
                $http({
                    url: "/User/Delete/" + id,
                    method: "Delete"
                }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();