(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, UserService,$rootScope) {

        var vm = this;

        vm.logout = logout;

        // Function to implement the logout activity and return to homepage
        function logout() {

            UserService
                .logout()
                .then(function(user){
                    $rootScope.user = null;
                    $location.url("/home");
                });
        }

    }
})();