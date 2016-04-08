/**
 * Created by mounica on 4/8/2016.
 */

module.exports = function(mongoose) {


    var ReviewSchema = mongoose.Schema({
        userId: String,
        restaurantId: String,
        reviews: String

    }, {collection: 'project.reviews'});
    return ReviewSchema;
};
