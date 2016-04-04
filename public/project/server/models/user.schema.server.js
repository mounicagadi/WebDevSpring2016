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
        favourites : [String],
        email: String,
        phones: String
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});
    return UserSchema;
};