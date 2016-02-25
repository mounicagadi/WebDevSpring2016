(function() {

    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    //Function to register a new user
    function RegisterController($scope, $location, UserService, $rootScope)
    {
        $scope.register = register;

        function register (user) {

            if (user.username!== null && user.password!== null && user.verifypassword!== null &&
                user.password=== user.verifypassword && user.email!== null) {

                var new_data =
                {
                    "_id":(new Date()).getTime(),
                    "firstName":null,
                    "lastName": null,
                    "username":user.username,
                    "password":user.password,
                    "roles": []
                };

                UserService.createUser(new_data,function (newUser) {

                    $rootScope.user = newUser;
                    console.log(newUser._id);
                    $location.path("/profile");
                });

            } else {

                alert ("Invalid Details");
            }



        }

    }

})
();