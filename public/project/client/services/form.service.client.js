/**
 * Created by mounica on 3/25/2016.
 */
(function() {

    'use strict';

    angular
        .module("EatOutApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var model = {

            deleteFormById: deleteFormById
        };

        return model;

        function deleteFormById(formId,currentUserForms,callback){
            forms = currentUserForms;
            for(var f in forms) {
                if (forms[f].id == formId) {
                    forms.splice(f, 1);
                    break;
                }
            }
            callback(forms);
        }
    }
})();