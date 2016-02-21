(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){

        var data = [
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
            data.push(newForm);
            console.log(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for(var i in data){
                if(data[i].userId == userId){
                    userForms.push(data[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){
            for(var i in data){
                if(data[i]._id == formId){
                    data.splice(i, 1);
                    break;
                }
            }
            callback(data);
        }

        function updateFormById(formId, newForm, callback){
            for(var i in data){
                if(data[i]._id == formId){
                    data[i] = newForm;
                    break;
                }
            }
            callback(newForm);
        }

    }
})();