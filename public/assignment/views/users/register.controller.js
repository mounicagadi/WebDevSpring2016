(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $location, UserService,$rootScope)
    {
        $scope.register = register;
        function register(user)
        {  if(user.username!=null && user.password!=null && user.verifypassword!=null && user.password==user.verifypassword)
                {
                    var new_data={
                        "_id":(new Date).getTime(),
                        "firstName":null,
                        "lastName": null,
                        "username":user.username,
                        "password":user.password,
                        "roles": []
                    };

                    UserService.createUser(new_data,function(newUser){

                        $rootScope.user = newUser;
                        console.log(newUser._id);
                        $location.path("/profile");
                    });
                    }

                else {
                    alert("Enter proper user credentials");

            }



        };

    }

})();