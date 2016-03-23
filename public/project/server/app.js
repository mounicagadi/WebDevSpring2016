/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app){

    var userModel = require("./models/user.model.service.js")();
    var service = require("./services/user.service.server.js")(app, userModel);

}
