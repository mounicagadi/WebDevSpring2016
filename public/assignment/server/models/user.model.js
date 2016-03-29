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

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
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
        for (var value in users) {
            var obj = users[value];
            var id = obj._id;
            if (id == userId) {
                users[value] = user;
                console.log("in model"+user);
                return users[value];
            }else{
                return null;
            }
        }

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

        return users;
    }

    function deleteUserById(userId){

        for(var index in users) {
            var obj = users[index]
            if(obj._id == userId) {
                users.splice(index, 1);
                break;

            }
        }

        return users;

    }
}