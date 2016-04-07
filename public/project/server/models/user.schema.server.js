/**
 * Created by mounica on 4/3/2016.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        favourites : [
            {
                restaurantId : String,
                restaurantName : String
            }
        ],
        email: String,
        roles: [String]

        // collection name to 'user'
    }, {collection: 'project.user'});
    return UserSchema;
};