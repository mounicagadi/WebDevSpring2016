(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController ($scope,$location,$rootScope) {

      $scope.$location = $location;

    }

})();