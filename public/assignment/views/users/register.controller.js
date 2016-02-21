(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $location, $rootScope , UserService)
    {
        $scope.register = register;
        function register(user)
        {
            var newdata = {
                username: $scope.user.username,
                password: $scope.user.password,
                verifypassword: $scope.user.verifypassword,
                email: $scope.user.email
            };

            $scope.newdata = newdata;

            if(user!==undefined)
            {
                if(user.username!==undefined && user.password!==undefined && user.verifypassword!==undefined && user.password==user.verifypassword && user.email!==undefined)
                {

                    UserService.createUser(newdata,function(newUser){

                        $rootScope.newUser = newUser;
                        console.log(newUser._id);
                        $location.path("/profile/"+newUser._id);
                    });
                    }

                else {
                    alert("Enter proper user credentials");
                }
            }
            else {
                alert("User is undefined");
            }


        };

    }

})();