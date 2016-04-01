(function () {

    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    //Function to update the usr information
    function ProfileController(UserService, $rootScope) {

        var vm = this;

        vm.update = update;


        function init(){

            UserService.findUserById($rootScope.user._id)
                .then(function(response){

                    vm.user = response.data;
                    vm.user.email = joinValues(vm.user.email);
                    vm.user.phones = joinValues(vm.user.phones);
                    console.log(vm.user);
                });

        }

        init();

        function joinValues(value){
            return value.join(',');
        }

        function setEmails(emails){
            return emails.trim().split(',');
        }

        function update(user) {

            user.email = setEmails(user.email);
            user.phones = user.phones.trim().split(',');
            UserService.updateUser($rootScope.user._id,user)
                .then(  function(user){
                    console.log(user);

                $rootScope.user  = user.config.data;

            });


        }
    }

})();