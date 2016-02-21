(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,FormService,$rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;

        FormService.findAllFormsForUser($rootScope._id, function (response) {
            $scope.data = response;
        });


        function addForm(formName) {
            var newForm = {"title": formName};
            FormService.createFormForUser($rootScope._id, newForm, function (response) {
                $scope.data.push(response);
                $scope.formName = "";
            });
        }


        function updateForm(formName) {
            var selectedForm = $scope.data[selectedIndex];
            var updatedForm = {
                "_id": selectedForm._id,
                "title": formName,
                "userId": $rootScope._id
            };

            FormService.updateFormById(selectedForm._id, updatedForm, function (response) {

                $scope.data = response;
                $scope.formName = "";
            });

        }
    }

})();