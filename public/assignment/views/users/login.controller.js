(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = login;
        function login(username,password)
        {
            var name = $scope.username;
            var pwd = $scope.password;

            console.log(name+pwd);

            UserService.findUserByUsernameAndPassword(name,pwd,function(user)
            {
                if (user != null) {
                    $rootScope = user;
                    $location.path("/profile");
                }

            });


        }

    }

})();