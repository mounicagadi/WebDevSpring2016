(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller:"FormController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
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