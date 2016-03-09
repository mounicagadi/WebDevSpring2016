/**
 * Created by mounica on 3/9/2016.
 */

var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(credentials) {

        console.log(mock);
        console.log(credentials);
    }
}
