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
        vm.deleteFavourite =deleteFavourite;
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


        function deleteFavourite(hotel){
            UserService.deleteFavourites($rootScope.user._id, hotel)
                .then(function(response){
                    console.log(response);
                    if(response.data == "OK"){
                        console.log("deleted");
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

            UserService.updateUser($rootScope.user._id,user)
                .then(  function(response){
                    console.log(response);
                    console.log(response.config.data);
                    $rootScope.user  = response.config.data;

                });


        }
    }
})();
