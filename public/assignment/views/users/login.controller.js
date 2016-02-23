(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $location,UserService,$rootScope) {

        $scope.login = login;
        function login(user)
        {
            var name = user.username;
            var pwd = user.password;

            console.log(name+pwd);

            UserService.findUserByCredentials(name,pwd,function(user)
            {
                if (user != null) {
                    $rootScope.user = user;
                    $scope.user.username = $rootScope.user.username;
                    //console.log("user Check : " + UserService.checkAdmin(user));
                    var adminuser = UserService.checkAdmin(user);
                    if(adminuser)
                    {
                        $location.path("/admin");
                        return true;
                    }
                    //console.log($rootScope);
                    //console.log($location);

                    else

                    $location.path("/profile");
                }

            });


        }

    }

})();