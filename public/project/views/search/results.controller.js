/**
 * Created by mounica on 3/4/2016.
 */
/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("ResultsController", ResultsController);

    //Function to display the content on the homepage
    function ResultsController($scope, $location) {

        console.log("in results controller");
        $scope.$location = $location;
    }
})();
