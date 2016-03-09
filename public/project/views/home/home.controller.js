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

        var name = $routeParams.name;

        $scope.search = search;
        $scope.render = render;
        $scope.error = error;


        function search(name,place) {

            if(name == null && place == null){
                console.log("empty fields");
                var name = "restaurants"
                var place = "boston"
            }

            $location.url("/results/"+name);
            console.log(name);
            FoursquareService
                .findByNameLocation(name, place, render, error);
        }

        function render(response){
            console.log(response);
            $scope.data = response;
            console.log("name - "+$scope.data.response.venues[0].name);

        }
        function error(){
            console.log("error");
        }
    }
})();
