(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController ($scope,$rootScope) {

        var currentUser = null;
        $rootScope = currentUser;
        $scope.nologin = nologin;
        $scope.isAdmin = isAdmin;

        function nologin() {
            if($rootScope != null){
                return true;
            }
            else{
                return false;
            }
        }

        function isAdmin(){
            if($rootScope!=null)
            {
                var roles = $rootScope.roles;
                if(roles!=null){
                    for(var i in roles){
                        if(roles[i]=="admin"){
                            return true;
                        }
                    }
                }
            }

            return false;
        }

    }

})();