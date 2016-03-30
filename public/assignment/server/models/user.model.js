/**
 * Created by mounica on 3/13/2016.
 */

var users = require("./user.mock.json");

var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        createUser : createUser
    };
    return api;

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findUserByUsername(username){
        var u = null;
        for(var user in users) {
            if(users[user].username == username){
                u = users[user];
                break;
            }
        }

        return u;

    }

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

        // use q to defer the response
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
}