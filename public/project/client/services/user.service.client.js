(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var userFavourites = [
            {
                "user_id":123,
                "restaurantName": "The Maharaja",
                "id" : '4d8417c37e8ef04dd2e104be'
            }
        ];

        var api =
        {
            login: login,
            findAllUsers: findAllUsers,
            registerUser: registerUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFavourite : addFavourite,
            getFavourites :getFavourites

        };
        return api;

        function addFavourite(name, id, userId){
            var favourite = {
                "user_id":userId,
                "restaurantName": name,
                "id" : id
            };

            userFavourites.push(favourite);
        }

        function getFavourites(userID, callback){
            console.log(userID);
            var favourites = [];
            for(var index in userFavourites){
                if(userFavourites[index].user_id == userID){
                    favourites.push(userFavourites[index]);
                }
            }

            console.log(favourites);

            callback(favourites);
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

        function deleteUserById(userId,callback) {

            for(var index in users){
                var obj = users[index];
                if(obj._id==userId){
                    users.splice(index,1);
                    break;
                }
            }

            callback(users);
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/project/profile/"+userId, newUser);

        }
    }
})();