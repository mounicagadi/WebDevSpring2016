/**
 * Created by mounica on 3/13/2016.
 */

var users = require("./user.mock.json");
var q = require("q");

module.exports = function() {
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
        for(var user in users) {
            if(users[user]._id == userId){
                deferred.resolve(users[user]);
            }
        }

        return deferred.promise;
    }

    function findUserByUsername(username){

        var deferred = q.defer();

        for(var user in users) {
            if(users[user].username == username){
                deferred.resolve(users[user]);
            }
        }

        return deferred.promise;

    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        for(var u in users) {
            var obj = users[u];
            if( obj.username == credentials.username &&
                obj.password == credentials.password) {
                deferred.resolve(users[u]);
                break;
            }
        }
        return deferred.promise;

    }

    function updateUser(userId, user){

        var deferred = q.defer();

        for (var value in users) {
            var obj = users[value];
            var id = obj._id;
            if (id == userId) {
               users[value] = user;
                deferred.resolve(user);
            }
        }

        return deferred.promise;

    }


    function createUser(user){
        var deferred = q.defer();
        var newUser = user;
        console.log(newUser);
        users.push(newUser);
        deferred.resolve(newUser);
        return deferred.promise;
    }

    function findAllUsers(){

        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;

    }

    function deleteUserById(userId){

        var deferred = q.defer();

        for(var index in users) {
            var obj = users[index]
            if(obj._id == userId) {
                users.splice(index, 1);
                break;

            }
        }

        deferred.resolve(users);
        return deferred.promise;
    }
}