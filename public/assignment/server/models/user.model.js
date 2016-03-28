/**
 * Created by mounica on 3/13/2016.
 */

var users = require("./user.mock.json");


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
        var u = null;
        for(var user in users) {
            if(users[user]._id == userId){
                u = users[user];
                break;
            }
        }

        return u;

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
        var user = null;
        for(var u in users) {
            var obj = users[u];
            if( obj.username == credentials.username &&
                obj.password == credentials.password) {
                user = users[u];
                break;
            }
        }

        return user;

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
        var newUser = user;
        users.push(newUser);
        return newUser;
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