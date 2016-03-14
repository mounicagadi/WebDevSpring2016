(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

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

            $http.get("/api/assignment/user/"+userId);
        }

        function findUserByUsername(){

            $http.get("/api/assignment/user/username=" + username);

        }

        function findUserByCredentials(username, password) {
            console.log(username,password);
            $http.get("/api/assignment/user?username="+ username + "&password=" + password);

        }

        function findAllUsers() {

            $http.get("/api/assignment/user/");
        }

        function createUser(user) {

            $http
                .post("/api/assignment/user", user);


        }

        function deleteUserById(userId) {

            $http.delete("/api/assignment/user/" + userId);
        }


        function updateUser(userid, newUser) {

            $http.put("/api/assignment/user/"+userid, newUser);

        }
    }
})();