/**
 * Created by mounica on 3/23/2016.
 */

(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $rootScope) {

        var vm = this;

        function init(){
            vm.$location = $location;
        }

        init();



    }
})();
