/**
 * Created by mounica on 4/8/2016.
 */

module.exports = function(mongoose) {


    var RestaurantSchema = mongoose.Schema({

        restaurantId: String,
        restaurantName: String

    }, {collection: 'project.restaurant'});
    return RestaurantSchema;
};
