/**
 * Created by mounica on 3/4/2016.
 */

(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("ResultsController", ResultsController);

    //Function to display the content on the homepage
    function ResultsController($location, $routeParams) {

        var vm = this;
        vm.$location = $location;
        vm.name = $routeParams.name;
    }
})();
