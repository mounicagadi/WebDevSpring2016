/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app){

    //var model = require("./models/user.model.service.js")();
    require("./services/user.service.server.js")(app);
    //require("./services/form.service.server.js")(app);
}
