(function(){
    angular.module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var api=
        {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            getUserById: getUserById,
            addUser: addUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return api;

        function findUserByUsernameAndPassword(username,password,callback){

            for (var i in users) {
                if (!(username == i.username && password == i.password)) {
                    return null;
                }
    success: callback()
}

        }
    }

    function findAllUsers(callback){

        return callback(users);
    }

})();