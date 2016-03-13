/**
 * Created by mounica on 3/13/2016.
 */
module.exports = function(app, model) {

    app.get("/api/assignment/user/username=:username&password=:password", findUserByCredentials);

            function findUserByCredentials(req, res) {
                   var credentials = req.body;
                    console.log(credentials);
                    var user = model.findUserByCredentials(credentials);
                    res.json(user);
                }
}