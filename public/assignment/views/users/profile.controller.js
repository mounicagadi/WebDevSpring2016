(function () {
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService) {

        $scope.update = update;
        var user = $rootScope;

        $scope.username = user.username;
        $scope.password = user.password;
        $scope.firstName = user.firstName;
        $scope.lastName = user.lastName;

        function update(password,firstName,lastName,email) {

            var updatedContent = {
                "_id":user._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": user.username,
                "password": password,
                "roles": user.roles

            };


            UserService.updateUser(user._id,updatedContent,function(user){
                $rootScope  = user;

            });


        }
    }

})();