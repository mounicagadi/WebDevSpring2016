/**
 * Created by mounica on 3/13/2016.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, model) {

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", auth,createUser);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/user", auth,findAllUsers);
    app.delete("/api/assignment/user/:id", auth,deleteUserById);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/users/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }


    function updateUser(req,res){
        var userId = req.params.id;
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        model
            .updateUser(userId, newUser)
            .then(
                function(user){
                    return model.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function register(req,res){
        var newUser = req.body;
        newUser.roles = ['student'];

        model.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return model.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
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

            findUserByCredentials(credentials);

        } else if (username != null) {

            console.log("going to call username function");
            model.findUserByUsername(username);


        } else {

            if (isAdmin(req.user)) {
                var users =[];
                model.findAllUsers()
                    .then(
                        function (doc) {

                            for(var i in doc){
                                if(doc[i].roles.indexOf("admin") == -1){
                                    users.push(doc[i]);
                                }
                            }
                            res.json(users);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
            }
        }
    }

    function findUserByCredentials(credentials, req ,res){
        model.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res){

        //var user = req.body;
        var userId = req.params.id;

        if(isAdmin(req.user)) {

            model
                .deleteUserById(userId)
                .then(
                    function(user){
                        return model.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function findUserByUsername(req, res) {
        console.log("Inside server side findUserByUsername");
        var username = req.params.username;
        var user = model.findUserByUsername(username)
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

    function findUserById(req, res){
        var userId = req.params.id;

        // use model to find user by id
        var user = model.findUserById(userId)
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

}