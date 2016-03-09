/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app, model) {
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        model.findUserbyCredentials(credentials);
        res.send(200);
    }
}