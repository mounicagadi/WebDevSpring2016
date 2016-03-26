/**
 * Created by mounica on 3/9/2016.
 */

module.exports = function(app, userModel) {
    app.post("/api/project/login", login);
    app.put("/api/project/profile/:id", updateUser);
    app.post("/api/project/register", register);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get("/api/project/users", findAllUsers);
    app.get("/api/project/user/:userId/favourites",getFavourites)
    app.post("/api/project/user/:userId/favourites",addFavourites)
    app.delete("/api/project/user/:userId/deletefavourite/:id", deleteFavourite);

    function login(req, res) {
        var credentials = req.body;
        console.log(credentials);
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
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

    function findAllUsers(req, res){
        var users = userModel.findAllUsers();
        console.log("in server side service"+users);
        res.json(users);
    }

    function deleteUser(req, res){
        console.log("Inside server side deleteUser");
        var userId = req.params.userId;
        var user = userModel.deleteUserById(userId);
        res.json(user);
    }

    function getFavourites(req, res){
        console.log("inside getfavourites in server");
        var userId  = req.params.userId;
        var favourites = userModel.getFavourites(userId);
        console.log("response for favourites"+favourites);
        res.json(favourites);

    }

    function addFavourites(req, res){
        console.log("inside addfavourites in server");
        var userId  = req.params.userId;
        var newdata = req.body;
        var favourites = userModel.addFavourites(userId, newdata);
        res.json(favourites);
    }

    function deleteFavourite(req,res){
        var userID  = req.params.userId;
        var ID = req.params.id;
        userModel.deleteFavourites(userID,ID);
        res.send(200);
    };
}