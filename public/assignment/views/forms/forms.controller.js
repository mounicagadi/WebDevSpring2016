(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,FormService) {

        FormService.findAllFormsForUser($rootScope._id, function (response) {
            $scope.data = response;
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = null;



        function addForm(formName) {
            if(formName!=null)
            {
                var newForm = {"title": formName};
            }

            FormService.createFormForUser($rootScope._id, newForm, function (response) {
                $scope.data.push(response);
                $scope.formName = null;
            });
        }


        function updateForm(formName) {
            if (formName != null) {
                var selectedForm = $scope.data[selectedIndex];

                var updatedForm = {
                    "_id": selectedForm._id,
                    "title": formName,
                    "userId": $rootScope._id
                };
            }
            FormService.updateFormById(selectedForm._id, updatedForm, function (response) {

                $scope.data[selectedIndex] = response;
                $scope.formName = null;
            });

        }

        function deleteForm(index) {
            var form = $scope.data[index];

            FormService.deleteFormById(form._id, function (response) {

                $scope.data = response;
            });
        }

        function selectForm(index) {
            selectedIndex = index;
            var form = $scope.data[index];
            $scope.name= form.title;

        }

    }

})();