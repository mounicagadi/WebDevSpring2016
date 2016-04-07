/**
 * Created by mounica on 3/9/2016.
 */


var favourite_mock = require("./favourites.mock.json")

var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        createUser : createUser,
        deleteUserById: deleteUserById,
        findAllUsers :findAllUsers,
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
        var deferred = q.defer();

        UserModel.update(
            { _id : userId },
            {$set: user},
            function (err, stats) {
                console.log("stats"+stats);
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;

    }

    function createUser(user){
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log(doc);
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers(){

        var deferred = q.defer ();
        UserModel.find (
            function (err, users) {
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

        var deferred = q.defer();
        UserModel
            .remove (
                {_id: userId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;

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
