(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs : "model",
                resolve: {
                    checkAdmin: checkAdmin
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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/users/loggedin').success(function(user)
        {
            //$rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    function getLoggedIn($q, $http, $rootScope, $timeout) {

        var deferred = $q.defer();

        $http.get('/api/assignment/users/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    }

    function checkLoggedIn($q, $location, $http, $rootScope, $timeout) {

        var deferred = $q.defer();

        $http.get('/api/assignment/users/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    }

})();