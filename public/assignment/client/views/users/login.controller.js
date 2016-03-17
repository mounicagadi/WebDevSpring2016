(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    //Function to validate the login activity of the user
    function LoginController ($location, UserService, $rootScope) {

        var vm = this;

        vm.login = login;

        function init(){

        }

        function login (user) {

            //Service to validate the user credentials
            if (user == null) {
                alert("Please fill the required fields");
                return;
                }

                    UserService.findUserByCredentials (user.username, user.password)
                        .then(function(user){
                            console.log(user.data);
                            if(user != null){
                                $rootScope.user = user.data;
                                console.log($rootScope.user.username);
                                vm.user.username = $rootScope.user.username;

                                var adminuser = UserService.checkAdmin(user.data);

                                if (adminuser) {
                                    $location.path("/admin");
                                } else {
                                    $location.path("/profile");
                                }

                            } else {
                                alert("Invalid entry");
                            }
                    });

            }


        }

})();