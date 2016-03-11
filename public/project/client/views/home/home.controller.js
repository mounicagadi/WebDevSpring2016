/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("HomeController", HomeController);

    //Function to display the content on the homepage
    function HomeController($scope, $location, $routeParams, FoursquareService) {

        $scope.name = $routeParams.name;

        $scope.search = search;
        $scope.render = render;
        $scope.error = error;

        function search(name,place) {

            if (name == null && place == null) {
                console.log("empty fields");
                FoursquareService
                    .findByNameLocation("restaurants", "boston", render, error);
            }

            else if (name == null && place !== null){

                console.log("name null");
                FoursquareService
                    .findByNameLocation("restaurants", place, render, error);
            }

            else if (name !== null && place == null){

                console.log("place null");
                FoursquareService
                    .findByNameLocation(name, "boston", render, error);
            }

            else {

                console.log(name);
                FoursquareService
                    .findByNameLocation(name, place, render, error);

            }
        }

        function render(response){
            //console.log(response);
            $scope.info = response;
            console.log($scope.info)
            //console.log($scope.info.response.venues[0].location);
            console.log("name - "+$scope.info.response.venues[0].name);

        }
        function error(){
            console.log("error");
        }
    }
})();
