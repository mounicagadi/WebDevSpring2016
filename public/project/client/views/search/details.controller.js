/**
 * Created by mounica on 3/4/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, FoursquareService) {
        $scope.id = $routeParams.id;


        FoursquareService.findRestaurantByID($scope.id, function(response){

            $scope.info = response;
            console.log("in details")
            console.log($scope.info)

        }

        )

    }
})();