
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldController);

    function FieldController(FieldService, $routeParams, $location, $uibModal) {
        var vm = this;
        vm.fields = [];
        vm.field = {};
        vm.options = [];

        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.editField = editField;

        var formId = -1;

        function init() {

            if ($routeParams.formId) {

                formId = $routeParams.formId;
                FieldService.getFieldsForForm(formId).then(function (response) {

                    vm.fields = response;


                });

            } else {

                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text", value: "single-line-text"},
                {name: "Multi Line Text", value: "multiple-line-text"},
                {name: "Date", value: "date"},
                {name: "Dropdown", value: "dropdown"},
                {name: "Checkboxes", value: "checkbox"},
                {name: "Radio Buttons", value: "radio"}
            ];
        }

        init();

        function addField() {
            var type = vm.fieldType.value;

            switch (type) {

                case "single-line-text":
                    vm.field = {
                        _id: null, label: "New Text Field", type: "TEXT", placeholder: "New Field"
                    };
                    break;

                case "multiple-line-text":
                    vm.field = {
                        _id: null, label: "New Text Field", type: "TEXTAREA", placeholder: "New Field"
                    };
                    break;

                case "date":
                    vm.field = {
                        _id: null, label: "New Date Field", type: "DATE"
                    };
                    break;

                case "dropdown":
                    vm.field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "checkbox":
                    vm.field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;

                case "radio":
                    vm.field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;

            }

            FieldService.createFieldForForm(formId, vm.field).then(function (response) {

                vm.fields = response;
                vm.field = {};
            });

        }

        function deleteField($index) {
            var fieldId = vm.fields[$index]._id;
            FieldService.deleteFieldFromForm(formId, fieldId).then(function (response) {
                if (response == "OK") {

                    FieldService.getFieldsForForm(formId).then(function (response1) {
                        vm.fields = response1;

                    });
                }
            });
        }


        function editField($index) {
            vm.editTheField = vm.fields[$index];
            var modalInstance = $uibModal.open({
                templateUrl: 'popup.html',
                controller: 'popupCtrl',
                resolve: {
                    field: function () {

                        console.log(vm.editTheField);

                        return vm.editTheField;
                    }
                }

            });

            modalInstance.result
                .then(function (field) {
                    console.log(field);
                    return FieldService.updateField(formId, field._id, field);

                })
                .then(function (response) {
                    if (response === "OK") {
                        return FieldService.getFieldsForForm(formId);

                    }
                })
                .then(function (response) {
                    vm.fields = response;


                });
        }
    }


    angular.module('FormBuilderApp').controller('popupCtrl', function ($scope, $uibModalInstance, field) {

        $scope.field = field;
        $scope.ok = function () {

            if($scope.newLabel) {
                $scope.field.label = $scope.newLabel;
            }

            if($scope.field.type != "DATE") {
                if($scope.newPlaceholder) {
                    if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA") {
                        $scope.field.placeholder = $scope.newPlaceholder;
                    } else {
                        OtherFields();
                    }
                }

            }

            function OtherFields() {
                var content = $scope.newPlaceholder;
                content = content.trim();
                var rawOptions = content.split("\n");
                var options = [];
                for (var i in rawOptions) {
                    var rawField = rawOptions[i].split(":");
                    var option = {label: rawField[0], value: rawField[1]};
                    options.push(option);
                }
                $scope.field.options = options;
            }
            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

})();