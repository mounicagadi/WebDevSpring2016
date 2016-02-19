(function () {
    angular.module("MovieApp")
        .controller("SearchController",searchController);

    function searchcontroller($scope){

        //event handlers
        $scope.search = search;

        function search(title){
            console.log(title)
        }
    }

})