(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api =
        {
            login: login,
            findAllUsers: findAllUsers,
            registerUser: registerUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFavourite : addFavourite,
            getFavourites :getFavourites,
            deleteFavourites : deleteFavourites,
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
            return $http.post("/api/assignment/user/logout");

        }

        function addFavourite(userId,favourite){

            console.log(favourite);
            return $http.post("/api/project/user/"+userId+"/favourites",favourite);
        }

        function getFavourites(userID){

            console.log("inside client favourites");
            return $http.get("/api/project/user/"+userID+"/favourites");

        }

        function deleteFavourites(userId,favourite){

            return $http.delete("/api/project/user/"+userId+"/deletefavourite/"+ favourite);
        }

        function login(credentials) {

            return $http.post("/api/project/login", credentials);
        }


        function findAllUsers() {

            return $http.get("/api/project/users");
        }


        function registerUser(user) {

            return $http.post("/api/project/register", user);

        }

        function deleteUserById(userId) {

            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/project/profile/"+userId, newUser);

        }
    }
})();