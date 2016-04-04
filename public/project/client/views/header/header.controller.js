/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;

        vm.logout = logout;

        function init(){

            vm.$location = $location;

        }

        // Function to implement the logout activity and return to homepage
        function logout() {

            UserService
                .logout()
                .then(function(user) {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });

    }
    }
})();
