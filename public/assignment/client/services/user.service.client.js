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

        //function checkAdmin(user){
        //    return $http.get("/api/assignment/user", user);
        //}

        function findAllUsers() {

            $http.get("/api/assignment/user");
        }

        function createUser(user) {

            return $http.post("/api/assignment/user", user);

        }

        function deleteUserById(userId) {

            return $http.delete("/api/assignment/user/" + userId);
        }


        function updateUser(userId, newUser) {

            return $http.put("/api/assignment/user/"+userId, newUser);

        }
    }
})();