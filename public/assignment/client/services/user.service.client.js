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
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout


        };
        return api;


        function getCurrentUser() {
            console.log("calling loggedin function");
            return $http.get("/api/assignment/users/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function logout() {
            return $http.post("/api/assignment/user/logout")
                .success(function () {
                    // $rootScope.user = null;
                    console.log('Returning null');
                    $rootScope.user = null;
                    // return null;
                });
        }

        function findUserById(userId){

            return $http.get("/api/assignment/user/"+userId);
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserByCredentials(username, password) {
            console.log(username,password);
            console.log("/api/assignment/user?username="+ username + "&password=" + password);
            return $http.get("/api/assignment/user?username="+ username + "&password=" + password);

        }

        function findAllUsers() {

            return $http.get("/api/assignment/user");
        }

        function createUser(user) {

            console.log("inside client create user");
            console.log(user);
            return $http.post("/api/assignment/user", user);
            //
            //var deferred = $q.defer();
            //
            //$http.post("/api/assignment/user", user)
            //    .success(function(response) {
            //        deferred.resolve(response);
            //    });
            //// sends user to the web service endpoint
            //return deferred.promise;

        }

        function deleteUserById(userId) {

            return $http.delete("/api/assignment/user/" + userId);
        }


        function updateUser(userId, newUser) {

            return $http.put("/api/assignment/user/"+userId, newUser);

        }
    }
})();