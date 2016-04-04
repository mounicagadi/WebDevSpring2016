(function() {
    'use strict';

    angular
        .module("EatOutApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller : "HomeController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })

            .when("/search/:name", {
                templateUrl: "views/search/results.view.html",
                controller : "ResultsController",
                controllerAs : "model"
            })


            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "model"

            })

            .when("/details/:id", {
                templateUrl: "views/search/details.view.html",
                controller: "DetailsController",
                controllerAs : "model"
            })

            .when("/profile", {

                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs : "model"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        console.log("inside getloggedin")
        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                console.log(response.data);
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        console.log("checking logged in");
        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                console.log(currentUser);
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }


})();