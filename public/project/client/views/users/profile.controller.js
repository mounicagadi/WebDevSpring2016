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
        vm.deleteReview = deleteReview;
        vm.selectReview = selectReview;
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
                    console.log(response.data);
                    vm.reviews = response.data;
                });

            UserService.getFavourites($rootScope.user._id)
                .then(function (response) {
                    console.log(response.data);
                    vm.forms = response.data;
                });

        }

        init();

        function displayReviews(){
            ReviewService.findAllReviewsForUser($rootScope.user._id)
                .then(function (response) {
                    console.log(response.data);
                    vm.reviews = response.data;
                });
        }

        function displayFavourites(){

            UserService.getFavourites($rootScope.user._id)
                .then(function (response) {
                    console.log(response.data);
                    vm.forms = response.data;
                });
        }


        function deleteForm(id){
            UserService.deleteFavourites($rootScope.user._id, id)
                .then(function(response){
                    console.log(response);
                    if(response.data == "OK"){
                        displayFavourites();
                    }
                });

        }

        function deleteReview(id){
            ReviewService.deleteReview($rootScope.user._id, id)
                .then(function(response){
                    console.log(response);
                    if(response.data == "OK"){
                        displayReviews();
                    }
                });
        }

        function selectReview($index){
            vm.i={};

            var selectedIndex = vm.reviews[$index];

            vm.title = selectedIndex.title;

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
