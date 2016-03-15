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

        var deferred = $q.defer();
        for(var user in users) {
            if(users[user]._id == userId){
                deferred.resolve(users[user]);
            }
        }

        return deferred.promise;
    }

    function findUserByUsername(username){

        var deferred = $q.defer();

        for(var user in users) {
            if(users[user].username == username){
            }
        }

    }

    function findUserByCredentials(credentials) {

        var deferred = $q.defer();
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;

    }

    function updateUser(userid){

        var deferred = $q.defer();

        var len = users.length;
        for (i = 0; i < len; i++) {
            if (users[i].id == userid) {
                var user = users[i];

                // update found user with newUser's property values
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.username = newUser.username;
                user.password = newUser.password;
                user.email = newUser.email;
            }
        }

    }


    function createUser(user){
        var deferred = $q.defer();
        var newUser = user;
        console.log(newUser);
        users.push(newUser);
    }

    function findAllUsers(){

        var deferred = $q.defer();

    }

    function deleteUserById(userId){

        var deferred = $q.defer();

        for(var user in users) {
            if(users[i].id == userId) {
                users.splice(user, 1);
            }
        }
    }
}