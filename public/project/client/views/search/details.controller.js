/**
 * Created by mounica on 3/4/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, FoursquareService, $rootScope, UserService, $location, ReviewService,RestaurantService) {

        var vm = this;
        vm.addFavourite = addFavourite;
        vm.addReview = addReview;
        vm.isVenueInFavourites= isVenueInFavourites;
        var findres;

        vm.id = $routeParams.id;
        var hotelId = $routeParams.id;

        function init() {

            RestaurantService.findAllReviewsforHotel(hotelId)
                .then(function(response){
                    console.log(response.data);
                        vm.allReviews = response.data;
                });

            UserService.findUserById($rootScope.user._id)
                .then(function(response){
                    console.log(response.data);
                    $rootScope.user = response.data;
                });

            RestaurantService.findRestaurantById(hotelId)
               .then(function(response){
                   console.log(response.data);
                   findres = response.data;
                   console.log(findres);
               });

        }

        init();

        function isVenueInFavourites(favourites, id) {
            for(var i in favourites) {
                if(favourites[i].restaurantId === id)
                    return true;
            }
            return false;
        }

        function addFavourite(name,id){
            if($rootScope.user){

                var userFav = $rootScope.user.favourites;
                for(var index in userFav){
                    if(userFav[index].restaurantId === id){
                        alert("Already added to favourites")
                        return;
                    }
                }

                var favourites = {

                    "restaurantId" : id,
                    "restaurantName": name
                }
                UserService.addFavourite($rootScope.user._id,favourites);
                init();

            }else {
                alert("Please login to add favourites");
                $location.url("/login");
            }

        }

        function addReview(venue,review){

            if($rootScope.user) {

                if( findres === null)
                {
                    var details = {

                        "restaurantId": venue.id,
                        "restaurantName": venue.name,
                    }
                }
                RestaurantService.addRestaurantById(details);

                var newReview =
                {
                    "userId" : $rootScope.user._id,
                    "username" : $rootScope.user.username,
                    "restaurantId": venue.id,
                    "restaurantName" : venue.name,
                    "reviews": review

                };
                ReviewService.addReview($rootScope.user._id,newReview);
                vm.review = null;
                init();
            }else{
                alert("Please login to write a review");
                $location.url("/login");
            }
        }


        FoursquareService.findRestaurantByID(vm.id)
            .then(function(response) {

                console.log(response.data);

                vm.info = response.data;

                console.log("trying tips"+vm.info.response.venue.tips.groups[0].items[1].text);

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