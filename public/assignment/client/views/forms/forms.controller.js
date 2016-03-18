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

                });
        }
        init();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        var selectedIndex = null;



        //Function to add a form to the table for a particular user
        function addForm(form) {
            console.log(form.title);
            if (form.title != null){
            //Service to create the form for a given user
                FormService.createFormForUser($rootScope.user._id, form)
                    .then(function (response) {
                        console.log("create form response" + response);
                        vm.forms = response;

                    });
        }
            vm.form = {};

        }

        //Function to update an existing form for a particular user
        function updateForm(form) {
            console.log("update stuff title"+form.userId);
            if (form.title != null && selectedIndex != null) {

                var position = vm.forms[selectedIndex];
                var newForm = {
                    "_id": form._id,
                    "title": form.title,
                    "userId": form.userId
                };
            FormService.updateFormById(form._id,newForm)
                .then(function (response) {

                    vm.forms[selectedIndex] = response;
                    vm.form.title = null;
                    vm.selectedIndex = null;
                });

        }}

        //Function to delete a form for a particular user
        function deleteForm($index) {
            var formId = vm.forms[$index]._id;

            FormService.deleteFormById(formId)
                .then(function (response) {
                    vm.forms.splice($index,1);

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