/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;

        vm.register = register;

        function init() {

            UserService.findAllUsers()
                .then(function (response) {
                    console.log(response.data);

                });

        }

        init();

        function register(user) {

            console.log(user);

            if (user != null) {

                if (user.username != null && user.password != null && user.verifypassword != null &&
                    user.password == user.verifypassword && user.email != null) {

                    var new_data =
                    {
                        "_id": (new Date()).getTime(),
                        "username": user.username,
                        "password": user.password,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "email": user.email
                    };

                    UserService.registerUser(new_data)
                        .then(function (response) {
                            console.log(response);
                            $rootScope.user = response.data;
                            $location.path("/profile");
                        });

                    UserService.findAllUsers()
                        .then(function (response) {
                            console.log(response.data);

                        });


                } else {

                    alert("Invalid entry");
                }

            } else {
                alert("Please fill the required fields");
            }
        }
    }

})();
