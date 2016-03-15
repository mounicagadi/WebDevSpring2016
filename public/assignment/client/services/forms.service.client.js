(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q){


        var api=
        {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return api;

        function createFormForUser(userId, form){

            var deferred = $q.defer();

            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .success(function(response) {

                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();

            var userForms = [];
            for(var i in forms){
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            return deferred.promise;
        }

        function deleteFormById(formId){

            var deferred = $q.defer();

            for(var i in forms){
                if(forms[i]._id == formId){
                    forms.splice(i, 1);
                    break;
                }
            }
            findAllFormsForUser($rootScope.user._id);
        }

        function updateFormById(formId, newForm){

            var deferred = $q.defer();

            for(var i in forms){
                if(forms[i]._id == formId){
                    forms[i] = newForm;
                    break;
                }
            }
            return deferred.promise;
        }

    }
})();