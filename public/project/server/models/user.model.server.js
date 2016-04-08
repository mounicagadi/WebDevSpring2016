/**
 * Created by mounica on 3/9/2016.
 */




var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        createUser : createUser,
        deleteUserById: deleteUserById,
        findUserById: findUserById,
        findAllUsers :findAllUsers,
        findUserByUsername: findUserByUsername,
        getFavourites : getFavourites,
        addFavourites : addFavourites,
        deleteFavourites : deleteFavourites
    };
    return api;

    function findUserByCredentials(credentials) {

        console.log("inside credentials part in model");
        var deferred = q.defer();

        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function updateUser(userId, user){

        console.log("inside update model");
        console.log(user);
        return UserModel.update({_id: userId}, {$set: user});

    }

    function createUser(user){
        return UserModel.create(user);
    }

    function findAllUsers(){
        console.log("In Model")
        var deferred = q.defer ();
        UserModel.find (
            function (err, users) {
                console.log(users)
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function deleteUserById(userId){

        return UserModel.remove({_id: userId});

    }

    function findUserById(userId){

        return UserModel.findById(userId);

    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }


    function getFavourites(userId){

       return UserModel.findById(userId).select("favourites");

    }

    function addFavourites(userId, newFavourite) {

        return UserModel.findById(userId)
            .then(
                function(user) {
                    user.favourites.push(newFavourite);
                    return user.save();
                }
            );
    }

    function deleteFavourites(userID, favId){

        return UserModel.update(
            { _id: userID },
            { $pull: { 'favourites': { _id : favId} } }
        );
    }


}
