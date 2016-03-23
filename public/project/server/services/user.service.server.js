/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/project/login", login);
    app.put("/api/project/profile/:id", updateUser);
    app.post("/api/project/register", register);

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

    function updateUser(req, res) {
        console.log("Inside server side updateUser");
        var id = req.params.userId;
        var newUser = req.body;
        res.json(userModel.updateUser(id, newUser));
    }

    function register(req, res){
        console.log("Inside server side createUser");
        var body = req.body;
        var user = userModel.createUser(body);
        res.json(user);
    }
}