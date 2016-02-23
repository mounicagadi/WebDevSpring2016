(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,FormService,$rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = null;

        FormService.findAllFormsForUser($rootScope.user._id, function(response)
       {
            $scope.data = response;
        });

        function addForm(name) {
            if(name!=null)
            {
               var formName = {
                   "title":name
               };
                console.log(formName);
            }

            FormService.createFormForUser($rootScope.user._id, formName, function (response) {
                $scope.data.push(response);
                console.log("inform contlr"+response);
                $scope.name = null;
            });
        }


        function updateForm(name) {
            if (name != null) {
                var selectedForm = $scope.data[selectedIndex];

                var updatedForm = {
                    "_id": selectedForm._id,
                    "title": name,
                    "userId": selectedForm.userId
                };
            }
            FormService.updateFormById(selectedForm._id, updatedForm, function (response) {

                $scope.data[selectedIndex] = response;
                $scope.name = null;
                selectedIndex = null;
            });

        }

        function deleteForm($index) {
            console.log("Data" + $scope.data);
            var form = $scope.data[$index];

            FormService.deleteFormById(form._id,function (response) {

                $scope.data = response;
            });
        }

        function selectForm($index) {
            selectedIndex = $index;
            var form = $scope.data[$index];
            $scope.name= form.title;

        }

    }

})();