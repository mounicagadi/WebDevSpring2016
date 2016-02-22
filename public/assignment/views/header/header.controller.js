(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location){


        $rootScope = null;
        $scope.noLogin = noLogin;
        $scope.logout = logout;
        $scope.isAdmin = isAdmin;

        function noLogin() {
            if($rootScope!=null){

                $scope.username=$rootScope.username;
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