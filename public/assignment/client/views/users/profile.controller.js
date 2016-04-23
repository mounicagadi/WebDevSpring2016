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
            if (currUser != null) {

                vm.user = {
                    username: currUser.username,
                    firstName: currUser.firstName,
                    lastName: currUser.lastName,
                    password: currUser.password,
                    email: joinValues(currUser.email),
                    phones: joinValues(currUser.phones),
                    roles: currUser.roles
                };
            }


        }

        init();

        function joinValues(value){
            return value.join(',');
        }



        function update(user) {

            var updateduser = {

                _id: $rootScope.user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email : user.email.trim().split(","),
                phones : user.phones.trim().split(",")

            };

            UserService.updateUser($rootScope.user._id,updateduser)
                .then(  function(user){
                    console.log(user);

                $rootScope.user  = user.config.data;

            });


        }
    }

})();