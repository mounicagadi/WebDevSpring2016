(function() {

    'use strict';

    angular
        .module("SampleApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
    }

})();