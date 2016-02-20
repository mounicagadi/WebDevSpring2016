/**
 * Created by mounica on 2/19/2016.
 */
(function()
{
    angular.module("MovieApp")
        .controller("NavController",NavController);

    function NavController($location,$scope){
        $scope.$location = $location;
    }
})
