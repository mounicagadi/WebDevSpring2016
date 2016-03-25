/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app){

    var userModel = require("./models/user.model.server.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);

    var reviewModel = require("./models/review.model.server.js")();
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);

}
