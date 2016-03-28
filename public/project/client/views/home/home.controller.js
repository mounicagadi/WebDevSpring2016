/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("HomeController", HomeController);

    //Function to display the content on the homepage
    function HomeController($location, $rootScope, FoursquareService) {

        var vm  = this;
        vm.search = search;
        vm.getDrinks = getDrinks;
        vm.getCoffee = getCoffee;
        vm.getDonuts = getDonuts;
        vm.getPizza = getPizza;
        vm.getFood = getFood;
        var default_place = "boston";
        var default_name = "restaurants"

        function search(restaurant) {

            var name = restaurant.name;
            var place = restaurant.place;

            console.log(name,place);

            if (name == null && place == null) {
                console.log("empty fields");
                FoursquareService
                    .findByNameLocation("restaurants", "boston");
            }

            else if (name == null && place !== null){

                console.log("name null");
                FoursquareService
                    .findByNameLocation("restaurants", place);
            }

            else if (name !== null && place == null){

                console.log("place null");
                FoursquareService
                    .findByNameLocation(name, "boston");
            }

            else {

                //$location.path("/home/"+name);
                console.log(name);
                FoursquareService
                    .findByNameLocation(name, place)
                    .then(function(response){
                        console.log(response.data.response.venues);
                        $rootScope.info = response.data;
                        $rootScope.name = name;
                        $location.url("/search/"+name);
                    });

            }
        }

        function getDrinks(){

            var option = "drinks";
            FoursquareService
                .findRestaurantByOption(option)
                .then(function(response){
                    console.log(response.data.response.venues);
                    $rootScope.info = response.data;
                    $rootScope.name = option;
                    $location.path("/search/"+option);
                });
        }

        function getCoffee(){

            var option = "coffee";
            FoursquareService
                .findRestaurantByOption(option)
                .then(function(response){
                    console.log(response.data.response.venues);
                    $rootScope.info = response.data;
                    $rootScope.name = option;
                    $location.path("/search/"+option);
                });
        }

        function getDonuts(){

            var option = "donuts";
            FoursquareService
                .findRestaurantByOption(option)
                .then(function(response){
                    console.log(response.data.response.venues);
                    $rootScope.info = response.data;
                    $rootScope.name = option;
                    $location.path("/search/"+option);
                });
        }

        function getPizza(){

            var option = "pizza";
            FoursquareService
                .findRestaurantByOption(option)
                .then(function(response){
                    console.log(response.data.response.venues);
                    $rootScope.info = response.data;
                    $rootScope.name = option;
                    $location.path("/search/"+option);
                });
        }

        function getFood(){

            var option = "buffet";
            FoursquareService
                .findRestaurantByOption(option)
                .then(function(response){
                    console.log(response.data.response.venues);
                    $rootScope.info = response.data;
                    $rootScope.name = option;
                    $location.path("/search/"+option);
                });
        }

    }
})();
