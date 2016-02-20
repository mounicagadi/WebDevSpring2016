(function (){
    angular.module("MovieApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider.when("/home", {
            templateUrl: "home.view.html"
        })
            .when("/search",{
                templateUrl : "search/search.view.html"
            })
            .otherwise({
                redirectTo :"/home"
            });

    }
})();