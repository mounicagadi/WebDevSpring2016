/**
 * Created by mounica on 3/25/2016.
 */

var review_mock = require("./review.mock.json");

module.exports = function(db, mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var ReviewModel = mongoose.model('review', ReviewSchema);

    var api = {
        findAllReviewsForUser: findAllReviewsForUser,
        findAllReviewsforHotel : findAllReviewsforHotel,
        addReview : addReview,
        deleteReview: deleteReview
    };
    return api;


    function findAllReviewsForUser(userId){

            return ReviewModel.find({userId : userId});

    }

    function findAllReviewsforHotel(hotelId){

        ReviewModel.find({restaurantId : hotelId});
    }

    function addReview(review){

        return ReviewModel.create(review);
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