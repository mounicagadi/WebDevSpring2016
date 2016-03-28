/**
 * Created by mounica on 3/13/2016.
 */


module.exports = function(app, model) {

    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/users/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);


    function setSession(req,user) {
        console.log("Inside server side login part");
        //var username = req.params.username;
        //var password = req.params.password;
        //var credentials = {
        //    username: username,
        //    password: password
        //};
        //var user = model.findUserByCredentials(credentials);
        req.session.user = user;
        console.log('User session: ', req.session.user);
        //res.json(user);
    }

    function logout(req, res) {
        console.log("inside logout");
        req.session.destroy();
        //res.send(200);
        res.status(200).send(null);
    }

    function loggedin(req, res) {
        console.log("inside loggedin func of server");
        console.log(req.session.user);
        res.json(req.session.user);
    }


    function updateUser(req, res) {
        console.log("Inside server side updateUser");
        var id = req.params.userId;
        var newUser = req.body;
        res.json(model.updateUser(id, newUser));
    }

    function createUser(req, res){
        console.log("Inside server side createUser");
        var body = req.body;
        var user = model.createUser(body);
        req.session.user = user;
        res.json(user);
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
            var user = model.findUserByCredentials(credentials);
            setSession(req,user);
            res.json(user);


        } else if (username != null) {

            console.log("going to call username function");
            var user = model.findUserByUsername(username);
            res.json(user);

        } else {

            console.log("going to call all users function");
            var users = model.findAllUsers();
            console.log("in server side service"+users);
            res.json(users);
        }
    }

    function deleteUserById(req, res){

        console.log("Inside server side deleteUser");
        var userId = req.params._id;
        var user = model.deleteUserById(userId);
        res.json(user);

    }

    function findUserByUsername(req, res) {
        console.log("Inside server side findUserByUsername");
        var username = req.params.username;
        var user = model.findUserByUsername(username);
        res.json(user);

    }

    function findUserById(req, res){
        console.log("Inside server side findUserById");
        var userId = req.params.id;
        var user = model.findUserById(userId);
        res.json(user);
    }

}