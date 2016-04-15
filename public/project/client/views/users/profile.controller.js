/**
 * Created by mounica on 3/3/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("ProfileController", ProfileController);

    //Function to display the content on the homepage
    function ProfileController(UserService, $rootScope, $routeParams, ReviewService) {

        var vm = this;
        vm.deleteFavourite =deleteFavourite;
        vm.deleteReview = deleteReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.update = update;
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

        function update(user) {

            console.log("inside update function in controller");

            UserService.updateUser($rootScope.user._id,user)
                .then(  function(response){
                    console.log(response);
                    $rootScope.user  = response.config.data;

                });


        }


        function deleteFavourite($index){

            selectedIndex = vm.forms[$index]._id;
            UserService.deleteFavourites($rootScope.user._id, selectedIndex)
                .then(function(response){
                    if(response.data == "OK"){
                        vm.forms.splice($index,1);
                    }
                });

        }

        function deleteReview($index){

            var index = vm.reviews[$index]._id;
            console.log(index);
            ReviewService.deleteReview($rootScope.user._id, index)
                .then(function(response){
                    console.log(response);
                    if(response.data == "OK"){
                        vm.reviews.splice($index,1);
                    }
                });
        }

        function selectReview($index){
            console.log("inside select review");

            vm.title={};
            selectedIndex = vm.reviews[$index];
            vm.title = selectedIndex.reviews;


        }

        function updateReview(review) {

            var newReview = {
                "_id" : selectedIndex._id,
                "reviews" : review
            }
            ReviewService.updateReview($rootScope.user._id,newReview)
                .then(  function(response){
                    console.log(response);

                    if(response.statusText === "OK") {
                        init();
                        vm.title = null;
                        selectedIndex = null
                    }

                });


        }
    }
})();
