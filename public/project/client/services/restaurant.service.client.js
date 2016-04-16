/**
 * Created by mounica on 4/14/2016.
 */

(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http) {

        var api = {

            findRestaurantById : findRestaurantById,
            findRestaurantsByIds : findRestaurantsByIds,
            addRestaurantById : addRestaurantById,
            findAllReviewsforHotel : findAllReviewsforHotel
        };

        return api;

        function findRestaurantById(id){

            return $http.get("/api/project/restaurant/"+id);

        }

        function findRestaurantsByIds(ids){
            return $http.get("/api/project/restaurant",ids);
        }

        function addRestaurantById(details){

            return $http.post("/api/project/restaurant",details);
        }

        function findAllReviewsforHotel(id){
            return $http.get("/api/project/restaurant/"+id+"/reviews");
        }
    }

})();
