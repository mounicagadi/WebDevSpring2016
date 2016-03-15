(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api =
        {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return api;

        function findUserById(userId){

            var deferred = $q.defer();

            $http.get("/api/assignment/user/"+userId).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;
        }

        function findUserByUsername(username){

            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username).success(function(users){
                deferred.resolve(users);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            console.log(username,password);
            console.log("/api/assignment/user?username="+ username + "&password=" + password);
            $http.get("/api/assignment/user?username="+ username + "&password=" + password).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;
        }

        function findAllUsers() {

            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/user", user).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;

        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/" + userId).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;
        }


        function updateUser(userId, newUser) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+userId, newUser).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;

        }
    }
})();