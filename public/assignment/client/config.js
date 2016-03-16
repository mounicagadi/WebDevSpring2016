(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller:"FormController",
                controllerAs : "model"
            })

            .when("/fields", {
                templateUrl : "../assignment/views/forms/fields.view.html",
                controller:"FieldController",
                controllerAs : "model"
            })

            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })

            .when("/profile", {

                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

})();