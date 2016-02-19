(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .config("HeaderController",HeaderController);

    function HeaderController($scope , $location){

        $scope.$location = $location;

    }
})();