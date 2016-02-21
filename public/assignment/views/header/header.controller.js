(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$rootScope){

        var currentUser = null;

        $rootScope = currentUser;
        $scope.nologin = nologin;
        $scope.logout = logout;
        $scope.isAdmin = isAdmin;

        function nologin() {
            if($rootScope != null){
                $scope.username = $rootScope.username;
                return false;
            }
            else{
                return true;
            }
        }

        function logout(){
            $rootScope = null;
        }

        function isAdmin(){
            if($rootScope!=null)
            {
                var roles = $rootScope.roles;
                if(roles!=null){
                    for(var i in roles){
                        if(roles[i]=="admin"){
                            $location.path('/admin');
                        }
                    }
                }
            }

            return false;
        }

    }
})();