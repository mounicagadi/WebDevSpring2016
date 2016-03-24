/**
 * Created by mounica on 3/9/2016.
 */

var mock = require("./user.mock.json");
var review_mock = require("./review.mock.json");

var q = require("q");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        createUser : createUser,
        findAllUsers :findAllUsers,
        findAllReviewsForUser : findAllReviewsForUser
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

    function findAllReviewsForUser(userId){
        console.log("inside reviews part in model");
        var rev = null;
        for(var i in review_mock){
            //console.log("checking mock for reviews"+review_mock);
            console.log("paramter"+userId);
            var obj = review_mock[i];
            var id = obj._id;
            console.log("review id"+id);
            if(id == userId){
                rev = review_mock[i];
                console.log("reviews console"+review_mock[i]);
                break;
            }
        }
        return rev;

    }
}
