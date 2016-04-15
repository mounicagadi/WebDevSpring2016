/**
 * Created by mounica on 4/14/2016.
 */

module.exports = function(db, mongoose) {

    var RestaurantSchema = require("./restaurant.schema.server.js")(mongoose);
    var RestaurantModel = mongoose.model('restaurant', RestaurantSchema);


    var api = {

        findRestaurantById : findRestaurantById,
        addRestaurantById : addRestaurantById
    };

    return api;

    function findRestaurantById(id){

        return RestaurantModel.find({restaurantId : id});

    }

    function addRestaurantById(restaurant){

        return RestaurantModel.create(restaurant);
    }


}