/**
 * Created by mounica on 2/7/2016.
 */


(function() {

    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService){
        var vm = this;

        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        function init() {

            var newUsers =[];

            UserService.findAllUsers()
                .then(
                    function(response){
                        var allUsers = response.data;
                        for(var i in allUsers){
                            if(allUsers[i].roles.indexOf("admin") == -1){
                                newUsers.push(allUsers[i]);
                            }
                        }

                        vm.users = newUsers;
                    }
                );

        }
        init();

        function addUser(user){
            var newUsers = [];
            UserService.createUser(user)
                .then(
                    function(response){
                        init();
                    }
                );
            vm.user = {};
        }

        function deleteUser($index){
            var userId = vm.users[$index]._id;
            UserService.deleteUserById(userId)
                .then(
                    function(users){
                        init();
                    }
                );
        }

        function selectUser($index){
            var userId = vm.users[$index]._id;
            UserService.findUserById(userId)
                .then(
                    function(response){
                        var user = response.data;
                        vm.user = user;
                    }
                );
        }

        function updateUser(user){
            var userId = user._id;
            var newUsers=[];
            UserService.updateUser(userId, user)
                .then(
                    function(response){
                        init();
                        vm.user = {};
                    }
                );
        }

    }
})();
