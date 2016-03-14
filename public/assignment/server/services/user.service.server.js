/**
 * Created by mounica on 3/13/2016.
 */
module.exports = function(app, model) {

    app.get("/api/assignment/user/username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
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

    function findAllUsers(req, res){
        console.log("Inside findAllUsers!");
        model
            .findAllUsers()
            .then(function(users){
                res.json(users);
            });
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

}