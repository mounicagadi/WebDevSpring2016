/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/project/login", login);
    app.put("/api/project/profile/:id", updateUser);
    app.post("/api/project/register", register);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get("/api/project/users", findAllUsers);
    app.get("/api/project/user/:userId",findUserById)
    app.get("/api/project/user/:userId/favourites",getFavourites)
    app.post("/api/project/user/:userId/favourites",addFavourites)
    app.delete("/api/project/user/:userId/deletefavourite/:id", deleteFavourite);
    app.get("/api/project/users/loggedin", loggedin);
    app.post("/api/project/user/logout", logout);


    function setSession(req,user) {
        console.log("Inside server side login part");
        req.session.user = user;
        console.log('User session: ', req.session.user);

    }

    function logout(req, res) {
        console.log("inside logout");
        req.session.destroy();
        res.status(200);
    }

    function loggedin(req, res) {
        console.log("inside loggedin func of server");
        console.log(req.session.user);
        res.json(req.session.user);
    }

    function login(req, res) {
        var credentials = req.body;
        console.log(credentials);
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    setSession(req, doc);
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
        var userId = req.params.id;
        var newUser = req.body;
        userModel.updateUser(userId, newUser)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res){
        console.log("Inside server side createUser");
        var body = req.body;
        var user = userModel.createUser(body)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.user = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res){
        var users = userModel.findAllUsers()
            .then (
                function (users) {
                    res.json (users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        console.log("Inside server side deleteUser");
        var userId = req.params.userId;
        var user = userModel.deleteUserById(userId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res){
        var userId = req.params.userId;

        // use model to find user by id
        var user = userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFavourites(req, res){
        console.log("inside getfavourites in server");
        var userId  = req.params.userId;
        var favourites = userModel.getFavourites(userId)
            .then (
            function (response) {
                res.json (response.favourites);
            },
            function (err) {
                res.status(400).send(err);
            }
        );

    }


    function addFavourites(req, res){
        console.log("inside addfavourites in server");
        var userId  = req.params.userId;
        var newdata = req.body;
        var favourites = userModel.addFavourites(userId, newdata)
            .then (
            function (favourites) {
                res.json (favourites);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFavourite(req,res) {
        var userID = req.params.userId;
        var favourite = req.params.id;
        userModel.deleteFavourites(userID, favourite)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}