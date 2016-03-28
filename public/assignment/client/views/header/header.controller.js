(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, $rootScope, UserService) {

        var vm = this;

        vm.logout = logout;

        function init(){

            vm.$location = $location;

        }

        // Function to implement the logout activity and return to homepage
        function logout() {

            UserService
                .logout()
                .then(function(user){
                    // UserService.setCurrentUser(user);
                    console.log("user after logout: ", $rootScope.user, null, 2);
                    $location.url("/home");
                });
        }

    }
})();