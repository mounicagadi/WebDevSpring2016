/**
 * Created by mounica on 3/13/2016.
 */

var forms = require("./form.mock.json");
var q = require("q");

module.exports = function() {
    var api = {

        createFormForUser: createForm,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle : findFormByTitle,
        findAllForms: findAllForms,
        findFormById : findFormById
    };
    return api;

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        // find the object in the collection with id formId
        var len = forms.length;
        for (i = 0; i < len; i++) {

            if (forms[i]._id == formId) {
                var form = forms[i];
                // update found form with newForm's property values
                form.id = newForm.id;
                form.title = newForm.title;
                form.userId = newForm.userId;
                form.fields = newForm.fields;
            }
        }

        // return all objects
        deferred.resolve(forms);
        return deferred.promise;
    }

    function createForm(form){

        var deferred = q.defer();

        // add FormId
        var uuid = require('node-uuid');
        form._id = uuid.v1();


        // add to current collection
        forms.push(form);

        // return collection
        deferred.resolve(forms);
        return deferred.promise;

    }

    function findAllFormsForUser(userId){
        console.log("inside form.model.js findAllFormsForUser");
        var deferred = q.defer();
        var userForms = [] ;
        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }
        deferred.resolve(userForms);
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        // find the object in the collection with id formId
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i]._id == formId) {
                var form = forms[i];
                // return the matching element, if found
                deferred.resolve(form);
            }
        }

        // return null otherwise
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        // find the object in the collection with id formId
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i]._id == formId) {
                // remove the matching instance
                forms.splice(i, 1);
            }
        }

        deferred.resolve(forms);
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        // find form in collection whose title is title
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i].title == title) {
                // returns matching object, if found
                deferred.resolve(forms[i]);
            }
        }

        // otherwise returns null
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        deferred.resolve(forms);
        return deferred.promise;
    }
}
