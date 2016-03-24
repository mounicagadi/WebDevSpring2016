/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("ProfileController", ProfileController);

    //Function to display the content on the homepage
    function ProfileController(UserService, $rootScope, $routeParams) {

        var vm = this;
        vm.update = update;
        var username = $routeParams.username;

        function init(){

            var currUser = $rootScope.user;
            console.log(currUser);
            if (currUser != null) {
                vm.user = currUser;
            }
        }

        init();

        function update(user) {

            console.log("inside update function in controller");
            var updatedContent = {

                "_id":$rootScope.user._id,
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email" : user.email
            };

            UserService.updateUser($rootScope.user._id,updatedContent)
                .then(  function(response){
                    console.log(response);
                    console.log(response.config.data);
                    $rootScope.user  = response.config.data;

                });


        }
    }
})();
