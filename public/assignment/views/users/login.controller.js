(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    //Function to validate the login activity of the user
    function LoginController ($scope, $location, UserService, $rootScope) {

        $scope.login = login;

        function login (user) {

            var name = user.username;
            var pwd = user.password;

            //Service to validate the user credentials
            UserService.findUserByCredentials (name,pwd,function (user) {
                if (user !== null) {

                    $rootScope.user = user;
                    $scope.user.username = $rootScope.user.username;

                    var adminuser = UserService.checkAdmin(user);

                    if(adminuser) {
                       $location.path("/admin");
                    } else {
                        $location.path("/profile");
                    }

                } else {
                    alert ("User not found");
                }

            });


        }

    }

})();