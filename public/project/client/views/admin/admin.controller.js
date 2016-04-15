/**
 * Created by mounica on 3/23/2016.
 */
//5705ca68c983d5a032cd50f7
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$rootScope) {

        var vm = this;

        vm.removeUser = removeUser;
        vm.updateUser = updateUser;
        vm.addUser    = addUser;
        vm.selectUser = selectUser;

        function init() {

            var newUsers =[];
            UserService.findAllUsers()
                .then(function(response){
                    console.log(response);
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

        function removeUser($index)
        {
            var userId = vm.users[$index]._id;
            UserService.deleteUserById(userId)
                .then(
                    function(users){
                        init();
                    }
                );
        }

        function updateUser(user)
        {
            UserService.updateUser(user._id, user)
                .then(
                    function(response){
                        init();
                        vm.user = {};
                    }
            );
        }

        function addUser(user)
        {
            UserService.createUser(user)
                .then(
                    function(response){
                        init();
                    }
                );
            vm.user = {};
        }

    }
})();
