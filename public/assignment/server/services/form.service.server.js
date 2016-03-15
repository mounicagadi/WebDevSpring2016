/**
 * Created by mounica on 3/13/2016.
 */

var q = require("q");

module.exports = function(app, model) {

    app.post("/api/assignment/user/:userId/form", createForm);

    function createForm(req, res){

        model.createForm(req.body)
            .then(function(response){
                res.json(response);
            });

    }
}
