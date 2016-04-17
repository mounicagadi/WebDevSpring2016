/**
 * Created by mounica on 3/9/2016.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel,restaurantModel) {

    var auth = authorized;

    app.post("/api/project/login", passport.authenticate('project'),login);
    app.post("/api/project/register", register);
    app.post("/api/project/user", auth, createUser);
    app.put("/api/project/profile/:id", auth, updateUser);
    app.delete("/api/project/user/:userId", auth, deleteUser);
    app.get("/api/project/users", auth, findAllUsers);
    app.get("/api/project/userbyname/:username",findUserByUsername)
    app.get("/api/project/user/:userId",findUserById)
    app.get("/api/project/user/:userId/favourites",getFavourites)
    app.post("/api/project/user/:userId/favourites",addFavourites)
    app.delete("/api/project/user/:userId/deletefavourite/:id", deleteFavourite);
    app.post("/api/project/user/:userId/follows/:username",addfollowers);
    app.get("/api/project/user/:userId/follows",getUsersIFollow);
    app.delete("/api/project/user/:userId/follows/:username",deleteUsersIFollow)
    app.post("/api/project/user/:username/followedBy/:currUser",userFollowedby)
    app.get("/api/project/user/:userId/followedBy",getMyFollowers)
    app.delete("/api/project/user/:userId/followedBy/:username",deleteMyFollowers)
    app.get("/api/project/users/loggedin", loggedin);
    app.post("/api/project/user/logout", logout);

    passport.use('project',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
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


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function updateUser(req, res) {
        console.log("Inside server side updateUser");
        var userId = req.params.id;
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(userId, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
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

    function register(req, res){
        var newUser = req.body;

        if(newUser.username === "admin" || newUser.username === "adminadmin") {
            newUser.roles = ['admin'];
        }else{
            newUser.roles = ['student'];
        }

        console.log("roles"+newUser.roles);
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
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
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
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

    function findAllUsers(req, res){
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        console.log(users);
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        console.log("Inside server side deleteUser");
        if (isAdmin(req.user)) {
            var userId = req.params.userId;
            userModel.deleteUserById(userId)
                .then(
                    function (stats) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                ).then(
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

    function findUserByUsername(req,res){
        var username = req.params.username;
        console.log(username);
        // use model to find user by id
        var user = userModel.findUserByUsername(username)
            .then(
                // return user if promise resolved
                function (doc) {
                    console.log(doc)
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {

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
    };



    function getFavourites(req, res){
        var userId  = req.params.userId;
        userModel.getFavourites(userId)
            .then (
            function (response) {

                res.json(response.favourites);
                //return restaurantModel.findRestaurantsByIds(response.favourites);

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
                console.log("receiving favs"+favourites);
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


    function addfollowers(req,res){
        var userid = req.params.userId;
        var username = req.params.username;
        userModel.addfollowers(userid,username)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsersIFollow(req, res){
        var userId = req.params.userId;
        userModel.getUsersIFollow(userId)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUsersIFollow(req,res){
        var userid = req.params.userId;
        var username = req.params.username;
        userModel.deleteUsersIFollow(userid,username)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userFollowedby(req, res){
        var username = req.params.username;
        var currUser = req.params.currUser;
        userModel.userFollowedby(username,currUser)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function getMyFollowers(req, res){
        var userId = req.params.userId;
        userModel.getMyFollowers(userId)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMyFollowers(req,res){
        var userid = req.params.userId;
        var username = req.params.username;
        userModel.deleteMyFollowers(userid,username)
            .then (
                function (response) {
                    res.json (response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}