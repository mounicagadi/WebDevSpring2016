(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
    }

})();