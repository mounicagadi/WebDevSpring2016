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

            var myLatLng = {lat: 46.363, lng: -71.044};

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 8
            });

            console.log("inside init");
        }

        init();

        $scope.id = $routeParams.id;


        FoursquareService.findRestaurantByID($scope.id, function(response){

            $scope.info = response;
            console.log("in details")
            console.log($scope.info)
            console.log($scope.info.response.venue.name);





        }

        )

    }
})();