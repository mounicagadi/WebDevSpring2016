(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api =
        {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return api;

        function findUserByCredentials(username, password) {
            console.log(username,password);
            $http.get("/api/assignment/user?username="+ username + "&password=" + password);

        }

        //function checkAdmin(user){
        //    var adminFlag = false;
        //    console.log(user.roles);
        //           for(var i = 0 ; i < user.roles.length; i++){
        //               if(user.roles[i]== "admin"){
        //                   adminFlag = true;
        //                   break;
        //               }
        //           }
        //
        //
        //    return adminFlag;
        //}
        //
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