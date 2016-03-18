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

            FormService.updateFormById(form._id)
                .then(function (response) {

                    if (response === "OK") {

                        FormService.findFormById(form._id)
                            .then(function(updatedForm) {
                                var formindex = vm.forms.indexOf(updatedForm);
                            vm.forms[formindex] = updatedForm;
                        });
                    }
                });

            vm.form={};
        }

        //Function to delete a form for a particular user
        function deleteForm($index) {
            var formId = vm.forms[$index]._id;

            FormService.deleteFormById(formId)
                .then(function (response) {
                    if(response === "OK") {
                        init();
                    }
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