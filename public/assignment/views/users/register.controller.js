(function(){
    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope, $location, UserService)
    {
        $scope.register = register;
        function register(username,password,verifypassword,email)
        {  if(username!=null && password!=null && verifypassword!=null && password==verifypassword)
                {
                    var new_data={
                        "_id":(new Date).getTime(),
                        "firstName":null,
                        "lastName": null,
                        "username":username,
                        "password":password,
                        "roles": []
                    };

                    UserService.createUser(new_data,function(newUser){

                        $rootScope = newUser;
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