/**
 * Created by mounica on 3/4/2016.
 */
(function() {

    'use strict';

    var details_url = "https://api.foursquare.com/v2/venues/ID?&client_id=2TEEJCYF24ZQ0521PG3P1LULDWVGPFJWNGSTUQNI0OHQA2ID&client_secret=2HUMBZSV5A55CM4IVIHOSO5N3QGWCCL4GZ3I0BXVZGH0ROXA&v=20140806";

    angular
        .module("EatOutApp")
        .factory("FoursquareService", FoursquareService);

    function FoursquareService($http) {

        var api = {
            findByNameLocation: findByNameLocation,
            findRestaurantByID: findRestaurantByID,
            findRestaurantByOption : findRestaurantByOption
        };
        return api;

        function findByNameLocation(name,place) {

            return $http({
                method: "JSONP",
                params: {
                  query: name,
                    near : place,
                    categoryId : "4d4b7105d754a06374d81259",
                    limit : 10,
                    client_id : '2TEEJCYF24ZQ0521PG3P1LULDWVGPFJWNGSTUQNI0OHQA2ID',
                    client_secret : '2HUMBZSV5A55CM4IVIHOSO5N3QGWCCL4GZ3I0BXVZGH0ROXA',
                    v : '20140806'
                },
                url: "https://api.foursquare.com/v2/venues/search?callback=JSON_CALLBACK",
                isArray: true
            });


        }

        function findRestaurantByID(id) {

                var url = details_url
                    .replace("ID", id);
                return $http.get(url);
        }

        function findRestaurantByOption(name){

            return $http({
                method: "JSONP",
                params: {
                    query: name,
                    near : "Boston",
                    categoryId : "4d4b7105d754a06374d81259",
                    limit : 10,
                    client_id : '2TEEJCYF24ZQ0521PG3P1LULDWVGPFJWNGSTUQNI0OHQA2ID',
                    client_secret : '2HUMBZSV5A55CM4IVIHOSO5N3QGWCCL4GZ3I0BXVZGH0ROXA',
                    v : '20140806'
                },
                url: "https://api.foursquare.com/v2/venues/search?callback=JSON_CALLBACK",
                isArray: true
            });

        }


    }
})();