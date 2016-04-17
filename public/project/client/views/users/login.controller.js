/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("LoginController", LoginController);

    //Function to display the content on the homepage
    function LoginController(UserService, $location, $rootScope) {

        var vm = this;

        vm.login = login;

        function login (user) {

            //Service to validate the user credentials
            if (user == null) {
                alert("Please fill the required fields");
                return;
            }

                UserService.login({username : user.username, password : user.password})
                    .then(function (user) {
                    if( user != null) {
                        console.log(user);
                        $rootScope.user = user.data;
                        vm.user.username = $rootScope.user.username;
                        $location.url("/profile");
                    }

                    else {
                        alert("Invalid entry");
                    }


                }
                    );

        }
        }



})();
