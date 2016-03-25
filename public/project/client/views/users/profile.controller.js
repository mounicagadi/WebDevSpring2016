/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("ProfileController", ProfileController);

    //Function to display the content on the homepage
    function ProfileController(UserService, $rootScope, $routeParams, ReviewService, FormService) {

        var vm = this;
        vm.update = update;
        vm.deleteForm =deleteForm;
        var selectedIndex = null;
        var currentForms = [];
        var username = $routeParams.username;

        function init(){

            var currUser = $rootScope.user;
            console.log(currUser);
            if (currUser != null) {
                vm.user = currUser;
            }

            console.log($rootScope.user._id);

            ReviewService.findAllReviewsForUser($rootScope.user._id)
                .then(function (response) {
                    console.log(response.data.reviews);
                    vm.reviews = response.data.reviews;
                });

            UserService.getFavourites($rootScope.user._id)
                .then(function (response) {
                    console.log(response.data);
                    vm.forms = response.data;
                    //console.log("checking favourites response"+response);
                    currentForms = response.data;
                });

        }

        init();




        function deleteForm(index){

            selectedIndex = index;
            FormService.deleteFormById(currentForms[index].id,currentForms,renderFormAfterAction);
        }

        function renderFormAfterAction(response){
            render(response);
        }

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
