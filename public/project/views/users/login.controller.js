/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("LoginController", LoginController);

    //Function to display the content on the homepage
    function LoginController(UserService, $location, $scope, $rootScope) {

        $scope.login = login;

        function login (user) {

            //Service to validate the user credentials
            if (user == null) {
                alert("Please fill the required fields");
                return;
            }

            UserService.findUserByCredentials (user.username, user.password, function (user) {
                if( user != null) {

                    $rootScope.user = user;
                    $scope.user.username = $rootScope.user.username;
                    $location.path("/profile");
                }

                else {
                    alert("Invalid entry");
                }


            });

        }


    }
})();
