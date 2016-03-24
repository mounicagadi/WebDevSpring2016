/**
 * Created by mounica on 3/4/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, FoursquareService) {

        function init() {

        }

        init();

        var vm = this;

        vm.id = $routeParams.id;


        FoursquareService.findRestaurantByID(vm.id)
            .then(function(response) {

                console.log(response.data);
                vm.info = response.data;
                console.log("in details")
                console.log(vm.info)
                console.log(vm.info.response.venue.rating);

                var latitude = vm.info.response.venue.location.lat;
                var longitude = vm.info.response.venue.location.lng;

                console.log(latitude,longitude);

                var myLatLng = {lat: latitude, lng: longitude};

                // Create a map object and specify the DOM element for display.
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: myLatLng,
                    zoom: 8
                });

                // Create a marker and set its position.
                var marker = new google.maps.Marker({
                    map: map,
                    position: myLatLng,
                    title: 'Hello World!'
                });


            });



    }
})();