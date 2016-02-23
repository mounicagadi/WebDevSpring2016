(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope){

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api=
        {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return api;

        function createFormForUser(userId, form, callback){
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            forms.push(newForm);
            console.log(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            console.log("I am called");
            var userForms = [];
            for(var i in forms){
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){
            for(var i in forms){
                if(forms[i]._id == formId){
                    forms.splice(i, 1);
                    break;
                }
            }
            findAllFormsForUser($rootScope.user._id, callback);
        }

        function updateFormById(formId, newForm, callback){
            for(var i in forms){
                if(forms[i]._id == formId){
                    forms[i] = newForm;
                    break;
                }
            }
            callback(newForm);
        }

    }
})();