(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var api =
        {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var value in users) {
                var obj = users[value];
                uname = obj.username;
                passwd = obj.password;
                if (uname == username && passwd == password) {
                    user = users[value];
                    console.log("details matched");
                    break;
                }
            }

            callback(user);
        }

        function findAllUsers(callback) {

            callback(users);
        }


        function createUser(user, callback) {

            var new_user = user;
            new_user._id = (new Date).getTime();
            console.log(new_user);
            users.push(new_user);
            //console.log(users);
            callback(new_user);

        }

        function deleteUserById(userId,callback) {

            for(var index in users){
                var obj = users[index];
                if(obj._id==userId){
                    users.splice(index,1);
                    break;
                }
            }

            callback(users);
        }

        function updateUser(userid, user, callback) {

            for (var value in users) {
                var obj = users[value];
                id = obj._id;
                if (id == userid) {
                    users[value] = user;
                    console.log(user);
                    callback(user);
                    break;
                }

            }

        }
    }
})();