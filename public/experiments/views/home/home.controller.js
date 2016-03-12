(function() {

    'use strict';

    angular
        .module("SampleApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {


        var geocoder =  new google.maps.Geocoder();
        geocoder.geocode( { 'address': "Boston"}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.map = { center: { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }, zoom: 8 };
                $scope.marker = {
                    id : 0,
                    location: {
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng()
                    }
                };
            }

            else {
                $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            }
        });

        $scope.$location = $location;

    }

})();