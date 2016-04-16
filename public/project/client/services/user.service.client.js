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
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            addFavourite : addFavourite,
            getFavourites :getFavourites,
            deleteFavourites : deleteFavourites,
            addfollowers : addfollowers,
            getUsersIFollow : getUsersIFollow,
            deleteUsersIFollow : deleteUsersIFollow,
            userFollowedby : userFollowedby,
            getMyFollowers : getMyFollowers,
            deleteMyFollowers : deleteMyFollowers,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout

        };
        return api;

        function addfollowers(userId,username){

            return $http.post("/api/project/user/"+userId+"/follows/"+username);
        }

        function getUsersIFollow(userId){

            return $http.get("/api/project/user/"+userId+"/follows");
        }

        function deleteUsersIFollow(userId,username){

            return $http.delete("/api/project/user/"+userId+"/follows/"+username)
        }

        function userFollowedby(username,currUser){

            return $http.post("/api/project/user/"+username+"/followedBy/"+currUser);
        }

        function getMyFollowers(userId){
            return $http.get("/api/project/user/"+userId+"/followedBy");
        }

        function deleteMyFollowers(userId,username){
            return $http.delete("/api/project/user/"+userId+"/followedBy/"+username)
        }

        function getCurrentUser() {
            console.log("calling loggedin function");
            return $http.get("/api/project/users/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function logout() {
            return $http.post("/api/project/user/logout");

        }

        function addFavourite(userId,favourite){

            return $http.post("/api/project/user/"+userId+"/favourites",favourite);
        }

        function getFavourites(userID){

            return $http.get("/api/project/user/"+userID+"/favourites");

        }

        function deleteFavourites(userId,favId){

            return $http.delete("/api/project/user/"+userId+"/deletefavourite/"+ favId);
        }



        function login(credentials) {

            return $http.post("/api/project/login", credentials);
        }

        function findUserById(userId){

            return $http.get("/api/project/user/"+userId);
        }

        function findUserByUsername(username){
            console.log(username);
            return $http.get("/api/project/userbyname/"+username);
        }


        function findAllUsers() {

            return $http.get("/api/project/users");
        }


        function registerUser(user) {

            console.log("inside register user");
            return $http.post("/api/project/register", user);

        }

        function createUser(user){

            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/project/profile/"+userId, newUser);

        }
    }
})();