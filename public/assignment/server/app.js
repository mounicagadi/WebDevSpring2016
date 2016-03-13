/**
 * Created by mounica on 3/13/2016.
 */

module.exports = function(app){

    var model = require("./models/user.model.js")();
    var service = require("./services/user.service.server.js")(app, model);

}