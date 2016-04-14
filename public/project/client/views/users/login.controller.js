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

            if(user.username == "admin" && user.password == "admin"){

                $location.url("/admin");
            }else{

                UserService.login
                ({
                    username : user.username, password : user.password}).
                then(function (user) {
                    console.log(user.data);
                    if( user != null) {
                        $rootScope.user = user.data;
                        vm.user.username = $rootScope.user.username;
                        $location.url("/profile");
                    }

                    else {
                        alert("Invalid entry");
                    }


                });

        }
        }


    }
})();
