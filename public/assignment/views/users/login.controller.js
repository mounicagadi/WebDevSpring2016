(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    //Function to validate the login activity of the user
    function LoginController ($scope, $location, UserService, $rootScope) {

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

                            var adminuser = UserService.checkAdmin(user);

                            if (adminuser) {
                                $location.path("/admin");
                            } else {
                                $location.path("/profile");
                            }
                        }

                        else {
                            alert("Invalid entry");
                        }


                });

            }


        }

})();