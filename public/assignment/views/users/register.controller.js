(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $location, $rootScope , UserService)
    {
        $scope.register = function () {
            var newLogin = {
                username: $scope.username,
                password: $scope.password,
                veriypassword: $scope.verifypassword,
                email: $scope.email
            };

            UserService.createUser(newLogin,function(newUser){

                $rootScope.newUser = newUser;
                $location.path("/profile");
            });
        };

    }

})();