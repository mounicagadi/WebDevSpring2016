(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
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