/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("RegisterController", RegisterController);

    //Function to display the content on the homepage
    function RegisterController($scope, $location) {
        $scope.$location = $location;
    }
})();
