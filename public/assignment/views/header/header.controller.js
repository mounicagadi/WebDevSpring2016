(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$rootScope){

        $scope.$location = $location;
        $scope.logout = logout;
        $scope.isAdmin =isAdmin;

        function logout()
        {
            $rootScope.user = null;
            $location.path("/home");
        }

        function isAdmin(){
            if($rootScope.user!=null)
            {
                var roles = $rootScope.user.roles;
                if(roles!=null)
                {
                    for(var i in roles)
                    {
                        if(roles[i]=="admin")
                        {
                            //console.log($location);
                            return true;
                        }
                    }
                }
            }
        }

    }
})();