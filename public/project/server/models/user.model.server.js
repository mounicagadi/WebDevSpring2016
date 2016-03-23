/**
 * Created by mounica on 3/9/2016.
 */

var mock = require("./user.mock.json");

var q = require("q");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
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
}
