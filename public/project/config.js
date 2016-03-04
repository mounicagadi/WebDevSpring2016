(function() {
    'use strict';

    angular
        .module("EatOutApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                css:"CSS/landingcss.css"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                css:"CSS/signcss.css"
            })

            .when("/profile", {

                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                css:"CSS/signcss.css"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                css:"CSS/signcss.css"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

})();