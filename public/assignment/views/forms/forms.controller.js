(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, $location, FormService, $rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = null;

        FormService.findAllFormsForUser($rootScope.user._id, function(response) {
            $scope.data = response;
        });

        //Function to add a form to the table for a particular user
        function addForm(name) {
            if(name!=null) {
               var formName = {
                   "title":name
               };
                //console.log(formName);
            }

            //Service to create the form for a given user
            FormService.createFormForUser($rootScope.user._id, formName, function (response) {
                $scope.data.push(response);
                $scope.name = null;
            });
        }

        //Function to update an existing form for a particular user
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

        //Function to delete a form for a particular user
        function deleteForm($index) {
            var form = $scope.data[$index];

            FormService.deleteFormById(form._id,function (response) {

                $scope.data = response;
            });
        }

        //Function to select a form for a particular user
        function selectForm($index) {
            selectedIndex = $index;
            var form = $scope.data[$index];
            $scope.name= form.title;

        }

    }

})();