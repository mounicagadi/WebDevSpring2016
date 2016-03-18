(function () {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, FormService, $rootScope) {

        var vm = this;

        function init() {

            FormService
                .findAllFormsForUser($rootScope.user._id)
                .then(function(response) {
                    vm.forms = response;
                    vm.$location = $location;

                });
        }
        init();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        var selectedIndex = -1;



        //Function to add a form to the table for a particular user
        function addForm(form) {
            //Service to create the form for a given user
            FormService.createFormForUser($rootScope.user._id, form)
                .then(function (response) {
                    console.log("create form response"+response);
                    vm.forms = response;

            });
            vm.form = {};

        }

        //Function to update an existing form for a particular user
        function updateForm(form) {
            console.log(form);
            var index = vm.forms[selectedIndex];
            FormService.updateFormById(form._id,form)
                .then(function (response) {

                    vm.forms = response;
                    vm.form = null;
                    selectedIndex = -1;
                });

            vm.form={};
        }

        //Function to delete a form for a particular user
        function deleteForm($index) {
            var formId = vm.forms[$index]._id;

            FormService.deleteFormById(formId)
                .then(function (response) {
                    vm.forms = response;
                });
        }

        //Function to select a form for a particular user
        function selectForm($index) {

            vm.form={};

            var selectedForm = vm.forms[$index];

            vm.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };

            selectedIndex = $index;
        }

    }

})();