(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController ($scope,$location,$rootScope) {

      $scope.$location = $location;
      $scope.isAdmin = isAdmin;

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