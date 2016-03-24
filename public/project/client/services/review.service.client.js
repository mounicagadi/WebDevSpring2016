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

            findAllReviews: findAllReviews,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById
        };

        return api;

        function findAllReviews(callback){
            callback(reviewList);
        }

        function createReview(review, callback){
            review._id=(new Date).getTime();
            reviewList.push(review);
            callback(reviewList);
        }

        function findAllReviewsForUser(userId){

            console.log(userId);
            return $http.get("/api/project/reviews/"+userId);

        }

        function deleteReviewById(reviewId,callback){
            for(var i=0;i<reviewList.length;i++) {
                if(reviewList[i]._id == reviewId)
                {
                    reviewList.splice(i,1);
                }
            }
            callback(reviewList);
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
