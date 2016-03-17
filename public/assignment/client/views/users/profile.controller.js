(function () {

    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    //Function to update the usr information
    function ProfileController(UserService, $rootScope) {

        var vm = this;

        vm.update = update;


        function init(){

            var currUser = $rootScope.user;
            console.log(currUser);
            if (currUser != null) {
                vm.user = currUser;
        }
        }

        init();

        function update(user) {

            var updatedContent = {

                "_id":$rootScope.user._id,
                "firstName": $rootScope.user.firstName,
                "lastName": $rootScope.user.lastName,
                "username": $rootScope.user.username,
                "password": $rootScope.user.password,
                email : $rootScope.user.email
            };

            UserService.updateUser($rootScope.user._id,updatedContent)
                .then(  function(user){
                $rootScope.user  = user.config.data;

            });


        }
    }

})();