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


        function search(name,place) {

            var finalName;
            var finalPlace;
            console.log(name,place);

            if (name == null && place == null) {
                console.log("empty fields");
                finalName = "restaurants";
                finalPlace = "boston";
                //FoursquareService
                //    .findByNameLocation("restaurants", "boston");
            }

            else if (name == null && place !== null){

                console.log("name null");
                finalName = "restaurants";
                finalPlace = place;

            }

            else if (name !== null && place == null){

                console.log("place null");
                finalName = name;
                finalPlace = "boston";

            }

            else {

                finalName = name;
                finalPlace = place;


            }

            FoursquareService
                .findByNameLocation(finalName, finalPlace)
                .then(function(response){
                    console.log(response.data.response.venues);
                    var result = response.data.response.venues;

                    if(result != "") {
                        $rootScope.info = response.data;
                        $rootScope.name = name;
                        $location.url("/search/" + name);
                    }else{

                        alert(" No results found");
                        return;
                    }
                });
        }

        function getDrinks(){

            var option = "bar";
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
