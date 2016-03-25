/**
 * Created by mounica on 3/25/2016.
 */

var review_mock = require("./review.mock.json");

module.exports = function() {

    var api = {
        findAllReviewsForUser: findAllReviewsForUser
    };
    return api;


    function findAllReviewsForUser(userId){
        console.log("inside reviews model");
        var rev = null;
        for(var i in review_mock){
            var obj = review_mock[i];
            var id = obj._id;
            if(id == userId){
                rev = review_mock[i];
                break;
            }
        }
        return rev;

    }

}