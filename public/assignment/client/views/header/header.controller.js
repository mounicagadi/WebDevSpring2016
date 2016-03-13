(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, $rootScope) {

        var vm = this;

        vm.logout = logout;

        function init(){

            vm.$location = $location;

        }

        // Function to implement the logout activity and return to homepage
        function logout() {

            $rootScope.user = null;
            $location.path("/home");
        };

    }
})();