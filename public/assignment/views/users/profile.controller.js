(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$rootScope) {

        $scope.update = update;

        function update(user) {

            var updatedContent = {

                "_id":$rootScope.user._id,
                "firstName": $rootScope.user.firstName,
                "lastName": $rootScope.user.lastName,
                "username": $rootScope.user.username,
                "password": $rootScope.user.password,
                "roles": $rootScope.user.roles

            };


            UserService.updateUser($rootScope.user._id,updatedContent,function(user){
                $rootScope.user  = user;

            });


        }
    }

})();