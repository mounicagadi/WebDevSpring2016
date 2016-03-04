/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {

        $scope.$location = $location;
    }
})();
