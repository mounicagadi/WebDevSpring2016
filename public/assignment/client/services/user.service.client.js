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

        function findUserByUsername(){

            var deferred = $q.defer();
            $http.get("/api/assignment/user/username=" + username).success(function(users){
                deferred.resolve(users);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            console.log(username,password);
            $http.get("/api/assignment/user?username="+ username + "&password=" + password).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;
        }

        function findAllUsers() {

            var deferred = $q.defer();
            $http.get("/api/assignment/user/").success(function(users){
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


        function updateUser(userid, newUser) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+userid, newUser).success(function(users){
                deferred.resolve(users);
            });
            return deferred.promise;

        }
    }
})();