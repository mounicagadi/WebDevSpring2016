(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q) {

        var api =
        {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserById: updateUserById,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout,
            login :login,
            register : register


        };
        return api;


        function logout() {
            return $http.post("/api/assignment/user/logout");

        }

        function getCurrentUser() {
            console.log("calling loggedin function");
            return $http.get("/api/assignment/users/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function findUserByCredentials(username, password) {

            return $http.get("/api/assignment/user?username="+ username + "&password=" + password);

        }

        function findAllUsers() {

            return $http.get("/api/assignment/admin/user");
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=" + username);

        }

        function register(user){

            return $http.post("/api/assignment/register",user);
        }

        function createUser(user) {

            return $http.post("/api/assignment/admin/user", user);

        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/assignment/user/"+userId, newUser);

        }

        function updateUserById(userId, newUser) {

            return $http.put("/api/assignment/admin/user/"+userId, newUser);

        }

        function findUserById(userId){

            return $http.get("/api/assignment/admin/user/"+userId);
        }













    }
})();