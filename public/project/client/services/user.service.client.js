(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api =
        {
            login: login,
            findAllUsers: findAllUsers,
            registerUser: registerUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFavourite : addFavourite,
            getFavourites :getFavourites,
            deleteFavourites : deleteFavourites

        };
        return api;

        function addFavourite(userId,favourite){

            console.log(favourite);
            return $http.post("/api/project/user/"+userId+"/favourites",favourite);
        }

        function getFavourites(userID){

            console.log("inside client favourites");
            return $http.get("/api/project/user/"+userID+"/favourites");

        }

        function deleteFavourites(userId,id){

            return $http.delete("/api/project/user/"+userId+"/deletefavourite/"+ id);
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