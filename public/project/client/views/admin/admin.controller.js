/**
 * Created by mounica on 3/23/2016.
 */
//5705ca68c983d5a032cd50f7
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$filter, ReviewService,$rootScope) {

        var vm = this;

        vm.removeUser = removeUser;
        vm.updateUser = updateUser;
        vm.addUser    = addUser;
        vm.selectUser = selectUser;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        var selectedIndex = null;

        vm.predicate = 'age';
        var orderBy = $filter('orderBy');
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        };

        function init() {

            ReviewService.findAllReviews()
                .then(function(response){
                    console.log(response);
                    vm.reviews = response.data;

                });


            var newUsers =[];
            UserService.findAllUsers()
                .then(function(response){
                    console.log(response);
                    var allUsers = response.data;
                    //for(var i in allUsers){
                    //    if(allUsers[i].roles.indexOf("admin") == -1){
                    //        newUsers.push(allUsers[i]);
                    //    }
                    //}

                    vm.users = allUsers;
                }
        );


        }
        init();

        function selectUser($index){

            var userId = vm.users[$index]._id;
            UserService.findUserById(userId)
                .then(
                    function(response){
                        var user = response.data;
                        vm.user = user;
                    }
                );
        }

        function removeUser($index)
        {
            var userId = vm.users[$index]._id;
            UserService.deleteUserById(userId)
                .then(
                    function(users){
                        init();
                    }
                );
        }

        function updateUser(user)
        {
            UserService.updateUser(user._id, user)
                .then(
                    function(response){
                        init();
                        vm.user = {};
                    }
            );
        }

        function addUser(user)
        {
            UserService.createUser(user)
                .then(
                    function(response){
                        init();
                    }
                );
            vm.user = {};
        }

        function deleteReview($index){

            var index = vm.reviews[$index]._id;
            ReviewService.deleteReview(index)
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
            ReviewService.updateReview(newReview)
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
