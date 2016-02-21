(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $location,$rootScope, UserService) {

        $scope.update = update;
        var currentuser = $rootScope;

        $scope.username = currentuser.username;
        $scope.password = currentuser.password;
        $scope.firstName = currentuser.firstName;
        $scope.lastName = currentuser.lastName;

        function update(username,password,firstname,lastname,email) {

            var updatedContent = {
                "_id":currentuser._id,
                "firstname": firstname,
                "lastname": lastname,
                "username": username,
                "password": password,
                "roles": currentuser.roles

            };


            UserService.updateUser(currentuser._id,updatedContent,function(user){
                $rootScope  = user;

            });


        }
    }

})();