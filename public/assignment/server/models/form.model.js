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
            if (forms[index]._id == formId) {
                forms[index].title = newForm.title;
                break;
            }
            }
        return forms;
    }

    function createFormForUser(form){
        forms.push(form);

    }

    function findAllFormsForUser(userId){
        console.log("inside form.model.js findAllFormsForUser");

        var userForms = [] ;
        for(var i in forms) {
            if(forms[i].userId == userId) {
                userForms.push(forms[i]);
            }
        }

        return userForms;

    }

    function findFormById(formId) {
        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f];
            }
        }
        return null;
    }

    function deleteFormById(formId) {

        for (var index in forms) {
            if (forms[index]._id == formId) {
                forms.splice(index, 1);
                break;
            }
        }
        return forms;
    }

    function findFormByTitle(title) {

        for (var f in forms) {
            if (forms[f].title === title) {
                return forms[f];
            }
        }
        return null;
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
