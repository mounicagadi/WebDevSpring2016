(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function() {

            uname : $scope.username
            pword : $scope.password

            console.log("credentials entered"+uname+"pwd:"+pword)

            UserService.findUserByUsernameAndPassword(uname, pword,function(user)
            {
                if (user !== null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });


        }

    }

})();