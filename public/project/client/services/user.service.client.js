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
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            checkAdmin: checkAdmin

        };
        return api;

        function login(credentials) {

            return $http.post("/api/project/login", credentials);
        }

        function checkAdmin(user){
            var adminFlag = false;
            console.log(user.roles);
            for(var i = 0 ; i < user.roles.length; i++){
                if(user.roles[i]== "admin"){
                    adminFlag = true;
                    break;
                }
            }


            return adminFlag;
        }

        function findAllUsers(callback) {

            callback(users);
        }


        function createUser(user, callback) {

            var new_user = user;
            users.push(new_user);
            callback(new_user);

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

        function updateUser(userid, user, callback) {

            for (var value in users) {
                var obj = users[value];
                var id = obj._id;
                if (id == userid) {
                    users[value] = user;
                    callback(user);
                    break;
                }

            }

        }
    }
})();