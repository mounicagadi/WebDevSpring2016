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
                        //console.log("name - "+$rootScope.info.response.venues[0].name);
                        $location.url("/search/"+name);
                    });

            }
        }

    }
})();
