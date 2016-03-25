/**
 * Created by mounica on 3/9/2016.
 */

var mock = require("./user.mock.json");
var favourite_mock = require("./favourites.mock.json")

var q = require("q");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        createUser : createUser,
        findAllUsers :findAllUsers,
        getFavourites : getFavourites
    };
    return api;

    function findUserByCredentials(credentials) {

        var user = null;
        for(var u in mock) {
            var obj = mock[u];
            if( obj.username == credentials.username &&
                obj.password == credentials.password) {
                user = mock[u];
                break;
            }
        }

        return user;
    }

    function updateUser(userId, user){

        console.log("inside update model");
        for (var value in mock) {
            var obj = mock[value];
            var id = obj._id;
            if (id == userId) {
                mock[value] = user;
                console.log("in model"+user);
                return user;
            }else{
                return null;
            }
        }

    }

    function createUser(user){
        var newUser = user;
        mock.push(newUser);
        return newUser;
    }

    function findAllUsers(){

        return mock;
    }

    function getFavourites(userId){

        var favourites = [];
        for(var index in favourite_mock){
            if(favourite_mock[index].user_id == userId){
                favourites.push(favourite_mock[index]);
            }
        }

        return favourites;

    }
}
