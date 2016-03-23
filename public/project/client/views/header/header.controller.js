/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {

        var vm = this;

        function init(){
            $scope.$location = $location;
        }

        init();

        $scope.logout = logout;

        // Function to implement the logout activity and return to homepage
        function logout() {

            $rootScope.user = null;
            $location.path("/home");
        }

    }
})();
