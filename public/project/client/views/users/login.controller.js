/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("LoginController", LoginController);

    //Function to display the content on the homepage
    function LoginController(UserService) {

        var vm = this;

        vm.login = login;

        function init(){

        }
        init();

        function login(user){
            console.log(user);
            UserService.findUserByCredentials({
                username : user.username,
                password : user.password
            });
        }
    }
})();
