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
        vm.deleteUsersIFollow = deleteUsersIFollow;
        vm.deleteMyFollowers = deleteMyFollowers;
        var selectedIndex = null;
        var username = $routeParams.username;

        function init(){

            var currUser = $rootScope.user;
            if (currUser != null) {
                vm.user = currUser;
            }

            ReviewService.findAllReviewsForUser($rootScope.user._id)
                .then(function (response) {
                    vm.reviews = response.data;
                });

            UserService.getFavourites($rootScope.user._id)
                .then(function (response) {
                    vm.forms = response.data;
                });

            UserService.getUsersIFollow($rootScope.user._id)
                .then(function(response){
                    vm.follows = response.data.follows;
                })

            UserService.getMyFollowers($rootScope.user._id)
                .then(function(response){
                    vm.followedBy = response.data.followedBy;
                })

        }

        init();

        function update(user) {

            UserService.updateUser($rootScope.user._id,user)
                .then(  function(response){
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
            ReviewService.deleteReview(index)
                .then(function(response){
                    if(response.data == "OK"){
                        vm.reviews.splice($index,1);
                    }
                });
        }

        function selectReview($index){
            vm.title={};
            selectedIndex = vm.reviews[$index];
            vm.title = selectedIndex.reviews;


        }

        function updateReview(review) {

            var newReview = {
                "_id" : selectedIndex._id,
                "reviews" : review
        }
            ReviewService.updateReview(newReview)
                .then(  function(response){

                    if(response.statusText === "OK") {
                        init();
                        vm.title = null;
                        selectedIndex = null
                    }

                });


        }

        function deleteUsersIFollow(username){

            UserService.deleteUsersIFollow($rootScope.user._id,username)
                .then(function(response){
                        init();
                });

            UserService.findUserByUsername(username)
                .then(function(response){
                    var userid = response.data._id;
                    UserService.deleteMyFollowers(userid,$rootScope.user.username)
                        .then(function(response){
                            init();
                        });
                });


        }

        function deleteMyFollowers(username){

            UserService.deleteMyFollowers($rootScope.user._id,username)
                .then(function(response){
                    init();
                });


            UserService.findUserByUsername(username)
                .then(function(response){
                    var userid = response.data._id;
                    UserService.deleteUsersIFollow(userid,$rootScope.user.username)
                        .then(function(response){
                            init();
                        });
                });
        }
    }
})();
