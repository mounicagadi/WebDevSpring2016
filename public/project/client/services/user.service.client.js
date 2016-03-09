/**
 * Created by mounica on 3/9/2016.
 */

(function(){
    angular
        .module("EatOutApp")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials
        };
        return api;

        function findUserByCredentials(credentials) {
            console.log(credentials);
            return $http.post("/api/project/user", credentials);
        }
    }
})();
