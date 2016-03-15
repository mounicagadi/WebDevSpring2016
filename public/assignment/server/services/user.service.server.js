/**
 * Created by mounica on 3/13/2016.
 */

var q = require("q");

module.exports = function(app, model) {

    //app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=:username", findUserByUsername);


    function findUserByCredentials(req, res) {
        console.log("Inside server side login part");
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }


    function updateUser(req, res) {
        console.log("Inside server side updateUser");
        var userId = req.params._id;
        var newUser = req.body;
        model
            .updateUser(userId, newUser)
            .then(function(user){
                res.json(user);
            });
    }

    function createUser(req, res){
        console.log("Inside server side createUser");
        var user = req.body;
        model
            .createUser(user)
            .then(function(users){
                res.json(users);
            });
    }

    function findAllUsers(req, res) {


        var username = req.query.username;
        var password = req.query.password;

        console.log(username,password);

        if (username != null && password != null) {

            var credentials = {
                username : username,
                password : password
            };

            console.log("Going to call credentials function")
            model
                .findUserByCredentials(credentials)
                .then(function(user) {
                    res.json(user);
                });

        } else if (username != null) {

            console.log("going to call username function");
            model
                .findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                });
        } else {

            console.log("going to call all users function");
            model
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
    }

    function deleteUserById(req, res){

        console.log("Inside server side deleteUser");
        var userId = req.params._id;
        model
            .deleteUserById(userId)
            .then(function(users){
                res.json(users);
            });
    }

    function findUserByUsername(req, res) {
        console.log("Inside server side findUserByUsername");
        var username = req.params.username;
        model
            .findUserByUsername(username)
            .then(function(user){
                res.json(user);
            });
    }

    function findUserById(req, res){
        console.log("Inside server side findUserById");
        var userId = req.params._id;
        model
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            });
    }

}