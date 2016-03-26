/**
 * Created by mounica on 3/4/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, FoursquareService, $rootScope, UserService, $location, ReviewService) {

        function init() {

        }

        init();

        var vm = this;
        vm.addFavourite = addFavourite;
        vm.addReview = addReview;

        vm.id = $routeParams.id;

        function addFavourite(name,id){
            if($rootScope.user){

                var favourites = {
                    "user_id":$rootScope.user._id,
                    "restaurantName": name,
                    "id" : id
                }
                UserService.addFavourite($rootScope.user._id,favourites);

            }else {
                alert("Please login to add favourites");
                $location.url("/login");
            }

        }

        function addReview(name,id,review){
            if($rootScope.user) {

                var newReview =
                {
                    "user_id" : $rootScope.user._id,
                    "restaurantName": name,
                    "id": id,
                    "reviews": review

                };
                ReviewService.addReview($rootScope.user._id,newReview);
                vm.review = null;
            }else{
                alert("Please login to write a review");
                $location.url("/login");
            }
        }


        FoursquareService.findRestaurantByID(vm.id)
            .then(function(response) {

                console.log(response.data);
                vm.info = response.data;

                var address = vm.info.response.venue.location.address + vm.info.response.venue.location.city + vm.info.response.venue.location.country;

                var latitude = vm.info.response.venue.location.lat;
                var longitude = vm.info.response.venue.location.lng;

                console.log(latitude,longitude);

                var myLatLng = {lat: latitude, lng: longitude};

                // Create a map object and specify the DOM element for display.
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: myLatLng,
                    zoom: 12
                });

                // Create a marker and set its position.
                var marker = new google.maps.Marker({
                    map: map,
                    position: myLatLng,
                    title: address
                });


            });



    }
})();