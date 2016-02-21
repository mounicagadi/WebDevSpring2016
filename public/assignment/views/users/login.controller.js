(function () {
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $location,UserService) {

        $scope.login = login;
        function login(username,password)
        {
            var name = $scope.username;
            var pwd = $scope.password;

            console.log(name+pwd);

            UserService.findUserByCredentials(name,pwd,function(user)
            {
                if (user != null) {
                    $rootScope = user;
                    //console.log($rootScope);
                    $location.path("/profile");
                }

            });


        }

    }

})();