/**
 * Created by mounica on 3/4/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, FoursquareService) {

        function init() {

            var mapDisplay = document.getElementById('map_display');
            var mapOptions = {
                center: new google.maps.LatLng(42.3601, -71.0589),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapDisplay, mapOptions)

            console.log("inside init");
        }

        init();

        $scope.id = $routeParams.id;


        FoursquareService.findRestaurantByID($scope.id, function(response){

            $scope.info = response;
            console.log("in details")
            console.log($scope.info)

        }

        )

    }
})();