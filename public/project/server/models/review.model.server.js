/**
 * Created by mounica on 3/25/2016.
 */

var review_mock = require("./review.mock.json");

module.exports = function() {

    var api = {
        findAllReviewsForUser: findAllReviewsForUser,
        addReview : addReview,
        deleteReview: deleteReview
    };
    return api;


    function findAllReviewsForUser(userId){

        var reviews = [];
        for(var index in review_mock){
            if(review_mock[index].user_id == userId){
                reviews.push(review_mock[index]);
            }
        }

        return reviews;

    }

    function addReview(id, newReview){
       review_mock.push(newReview);

}

    function deleteReview(userId, id){
        var removed = -1;
        for(var index in review_mock){
            if(review_mock[index].user_id == userId && review_mock[index].id == id){
                removed = index;
                break;
            }
        }

        if(removed>=0){
            review_mock.splice(removed,1);
        }
    }
}