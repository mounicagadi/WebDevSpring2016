(function() {

    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    //Function to register a new user
    function RegisterController($location, UserService, $rootScope)
    {
        var vm = this;

        vm.register = register;

        function init(){

            UserService.findAllUsers()
                .then(function(user) {
                    console.log(user);

                });
        }

        init();

        function register (user) {

            if(user != null){

                if (user.username != null && user.password != null && user.verifypassword != null &&
                    user.password == user.verifypassword && user.email != null) {

                var new_data =
                {
                    "_id":(new Date()).getTime(),
                    "firstName":user.firstName,
                    "lastName": user.lastName,
                    "username":user.username,
                    "password":user.password,
                    "email":user.email,
                    "roles":[]
                };

                UserService.createUser(new_data)
                    .then(function (newUser) {
                    $rootScope.user = newUser.data;
                    $location.path("/profile");
                });

                    UserService.findAllUsers()
                        .then(function(user) {
                            console.log(user);

                        });


            } else {

                alert ("Invalid entry");
            }

        }else {
                alert("Please fill the required fields");
            }
        }

    }

})
();