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

        }

        init();

        function register(user) {

            console.log(user);

            if (user != null) {

                if (user.username != null && user.password != null && user.verifypassword != null &&
                    user.password == user.verifypassword && user.email != null) {


                    UserService.registerUser(user)
                        .then(function (response) {
                            console.log(response);
                            $rootScope.user = response.data;
                            $location.path("/profile");
                        });

                    init();

                } else {

                    alert("Invalid entry");
                }

            } else {
                alert("Please fill the required fields");
            }
        }
    }

})();
