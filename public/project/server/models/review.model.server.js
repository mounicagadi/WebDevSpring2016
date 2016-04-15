/**
 * Created by mounica on 3/25/2016.
 */


module.exports = function(db, mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var ReviewModel = mongoose.model('review', ReviewSchema);


    var api = {
        findAllReviewsForUser: findAllReviewsForUser,
        findAllReviewsforHotel : findAllReviewsforHotel,
        addReview : addReview,
        deleteReview: deleteReview,
        getMongooseModel : getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return ReviewModel
    }

    function findAllReviewsForUser(userId){

            return ReviewModel.find({userId : userId});

    }

    function findAllReviewsforHotel(hotelId){

        return ReviewModel.find({restaurantId : hotelId});
    }

    function addReview(userId,review){

        return ReviewModel.create(review);
    }

    function deleteReview(id){

        return ReviewModel.remove({'_id':id});

    }
}