/**
 * Created by mounica on 3/23/2016.
 */

(function(){

    'use strict';

    angular
        .module("EatOutApp")
        .factory("ReviewService",ReviewService);

    function ReviewService($http){

        var api = {

            addReview : addReview,
            findAllReviews: findAllReviews,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReview: deleteReview,
            updateReviewById: updateReviewById
        };

        return api;

        function findAllReviews(callback){
            callback(reviewList);
        }

        function addReview(userId, review){

            return $http.post("/api/project/user/"+userId+"/addReview",review);

        }

        function findAllReviewsForUser(userId){

            console.log(userId);
            return $http.get("/api/project/user/"+userId+"/reviews");

        }

        function deleteReview(userId, id){
            return $http.delete("/api/project/user/"+userId+"/deleteReview/"+ id);
        }

        function updateReviewById(ratingId,rat,callback){
            for(var i=0;i<reviewList.length;i++) {
                if(reviewList[i]._id == ratingId) {
                    reviewList[i].rating=rat.rating;
                    reviewList[i].review=rat.review;
                    break;
                }
            }
            callback(reviewList);
        }


    }

})();
