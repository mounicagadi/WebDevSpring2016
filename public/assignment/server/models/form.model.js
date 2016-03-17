/**
 * Created by mounica on 3/13/2016.
 */

var forms = require("./form.mock.json");


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

        return newForm;


    }

    function createForm(form){

        // add FormId
        var uuid = require('node-uuid');
        form._id = uuid.v1();
        // add to current collection
        forms.push(form);
        return forms;

    }

    function findAllFormsForUser(userId){
        console.log("inside form.model.js findAllFormsForUser");

        var userForms = [] ;
        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }

        return userForms;

    }

    function findFormById(formId) {
        var form = null;
        // find the object in the collection with id formId
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i]._id == formId) {
                form = forms[i];
                break ;
                // return the matching element, if found

            }
        }
        return form;

    }

    function deleteFormById(formId) {

        // find the object in the collection with id formId
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i]._id == formId) {
                // remove the matching instance
                forms.splice(i, 1);
                break;
            }
        }

        findAllFormsForUser(formId);

    }

    function findFormByTitle(title) {

        var form = null;
        // find form in collection whose title is title
        var len = forms.length;
        for (i = 0; i < len; i++) {
            if (forms[i].title == title) {
                form = forms[i];
                // returns matching object, if found

            }
        }
    return form;

    }

    function findAllForms() {

        return forms;
    }
}
