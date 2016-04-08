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
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function selectUser(user){

            vm.user = angular.copy(user);
        }

        function removeUser(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function updateUser(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function addUser(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function handleSuccess(response) {
            console.log(response.data);
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }



    }
})();
