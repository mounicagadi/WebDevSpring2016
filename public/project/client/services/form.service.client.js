(function () {

    "use strict";

    angular
        .module("EatOutApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };
        return api;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post('/api/assignment/user/' + userId + '/form', form).success(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllFormsForUser(userID) {
            var deferred = $q.defer();
            $http.get('/api/assignment/user/' + userID + '/form').success(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteFormById(userId,id) {
            var deferred = $q.defer();
            $http.delete('/api/assignment/form/' + formID).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateFormById(formID, newForm) {
            var deferred = $q.defer();
            $http.put('/api/assignment/form/' + formID, newForm).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findFormById(formID) {
            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);
            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
})();