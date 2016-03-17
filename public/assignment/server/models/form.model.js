/**
 * Created by mounica on 3/13/2016.
 */

var forms = require("./form.mock.json");


module.exports = function() {
    var api = {

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle : findFormByTitle,
        findAllForms: findAllForms,
        findFormById : findFormById,
        findFieldsByFormId : findFieldsByFormId,
        findFieldById : findFieldById,
        deleteFieldById : deleteFieldById,
        createField : createField,
        updateFieldById : updateFieldById
    };
    return api;

    function updateFormById(formId, newForm) {

        // find the object in the collection with id formId
        for (var index in forms) {
            if (forms[index]._id === formId) {
                forms[index] = newForm;
                return newForm;
            }
            }

    }

    function createFormForUser(form){

        console.log("Inside model side createForm - forms");
        // add FormId
        var uuid = require('node-uuid');
        form._id = uuid.v1();
        // add to current collection
        console.log(form);
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

        console.log(userForms);
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

    function findFieldsByFormId(formId) {
        for(var u in forms) {
            if (forms[u]._id === formId) {
                return forms[u].fields;
                break;
            }
        }
    }

    function findFieldById(fieldId, formId) {
        for(var u in forms) {
            if (forms[u]._id === formId) {
                for(var v in forms[u].fields) {
                    if (v._id === fieldId) {
                        return v;
                        break;
                    }
                }
            }
        }
    }

    function deleteFieldById(fieldId, formId) {
        for(var u in forms) {
            if (forms[u]._id === formId) {
                for(var v in forms[u].fields) {
                    if (v._id === fieldId) {
                        delete v;
                    }
                }
            }
        }
    }

    function createField(field, formId) {
        for (var u in forms) {
            if (forms[u]._id === formId) {
                field._id = (new Date()).getTime();
                forms[u].fields.push(field);
            }
        }
    }

    function updateFieldById(fieldId, field, formId) {

        for (var u in forms) {
            if (forms[u]._id === formId) {
                for(var v in forms[u].fields) {
                    if (v._id === fieldId) {
                        v.label = field.label;
                        v.type = field.type;
                        v.placeholder = field.placeholder;
                    }
                }
            }
        }
    }
}
