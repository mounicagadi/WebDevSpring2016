(function() {
    'use strict';

    angular
        .module("SampleApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller : "HomeController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

})();