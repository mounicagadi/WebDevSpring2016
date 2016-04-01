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
                    $rootScope.user = response.data;
                    vm.user = $rootScope.user;
                });

        }

        init();

        function update(user) {

            UserService.updateUser($rootScope.user._id,user)
                .then(  function(user){
                    console.log(user);
                $rootScope.user  = user.config.data;

            });


        }
    }

})();