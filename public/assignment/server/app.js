/**
 * Created by mounica on 3/13/2016.
 */

module.exports = function(app, uuid, db, mongoose){

    var userModel = require("./models/user.model.js")(db, mongoose);
    var service = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")();
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, formModel, uuid);

}