(function() {
    'use strict';

    angular
        .module("EatOutApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller : "HomeController"
            })

            .when("/home/:name", {
                templateUrl: "views/home/home.view.html",
                controller : "HomeController"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"

            })

            .when("/profile", {

                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

})();