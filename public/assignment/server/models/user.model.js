/**
 * Created by mounica on 3/13/2016.
 */

var users = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        createUser : createUser
    };
    return api;

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;

    }

    function updateUser(userid){

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
        var newUser = user;
        console.log(newUser);
        users.push(newUser);
    }

    function findAllUsers(){

    }

    function deleteUserById(userId){

        for(var user in users) {
            if(users[i].id == userId) {
                users.splice(user, 1);
            }
        }
    }
}