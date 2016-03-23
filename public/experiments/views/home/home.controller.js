'use strict';
(function() {
    angular
        .module("SampleApp")
        .controller("HomeController", HomeController);

    function HomeController($scope) {

        $scope.display = display;

        function display() {


            var myLatLng = {lat: 46.363, lng: -71.044};

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 8
            });

            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: 'Hello World!'
            });
        }

    }


})();