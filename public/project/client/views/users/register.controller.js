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

            if (user != null) {

                if (user.username != null && user.password != null && user.verifypassword != null &&
                    user.password === user.verifypassword && user.email != null) {


                    UserService.registerUser(user)
                        .then(function (response) {
                                var currentUser = response.data;
                                if(currentUser){
                                    $rootScope.user = currentUser;
                                    $location.url("/profile");
                                }else{
                                    vm.message = "Username already exists";
                                    vm.user.password = null;
                                    vm.user.verifypassword = null;
                                }
                            },
                            function(err){
                                console.log(err);
                            }
                        );


                } else {

                    vm.message = "Invalid entry";
                }

            } else {
                vm.message="Please fill the required fields";
            }
        }
    }

})();
