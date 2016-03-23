/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/project/login", login);

    function login(req, res) {
        var credentials = req.body;
        console.log(credentials);

        var user = userModel.findUserbyCredentials(credentials)
            .then(function (doc) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }
}