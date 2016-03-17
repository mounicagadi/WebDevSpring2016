(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, FormService, $rootScope) {

        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        var selectedIndex = null;

        function init() {
            var user = $rootScope.user;
            if (user == null) {
                vm.data = [];
            }

            FormService
                .findAllFormsForUser($rootScope.user._id)
                .then(function(forms) {
                    console.log(forms.data);
                    vm.data = forms.data;

                });
        }
        init();



        //Function to add a form to the table for a particular user
        function addForm(name) {
            if(name!=null) {
               var formName = {
                   "title":name

               };
                //console.log(formName);
            }

            //Service to create the form for a given user
            FormService.createFormForUser($rootScope.user._id, formName)
                .then(function (response) {
                    console.log("create form response"+response.data);
                vm.data = response.data;
                vm.title = null;
            });
        }

        //Function to update an existing form for a particular user
        function updateForm(name) {
            if (name != null) {

                var selectedForm = vm.data[selectedIndex];
                var updatedForm = {
                    "_id": selectedForm._id,
                    "title": name,
                    "userId": selectedForm.userId
                };
            }
            FormService.updateFormById(selectedForm._id, updatedForm)
                .then(function (response) {

                vm.data[selectedIndex] = response.data;
                vm.title = null;
                vm.selectedIndex = null;
            });

        }

        //Function to delete a form for a particular user
        function deleteForm($index) {
            var form = vm.data[$index];

            FormService.deleteFormById(form._id)
                .then(function (response) {

                vm.data = response.data;
            });
        }

        //Function to select a form for a particular user
        function selectForm($index) {

            if (vm.data == null ) {
                return null;
            }
            vm.selectedIndex = $index;
            var form = vm.data[$index];
            vm.title= form.title;

        }

    }

})();