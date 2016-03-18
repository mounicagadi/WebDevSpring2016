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

        //fields
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    };
    return api;

    function updateFormById(formId, newForm) {
        // find the object in the collection with id formId
        console.log("In model update");
        console.log(formId);
        console.log(newForm);
        for (var index in forms) {
            if (forms[index]._id == formId) {
                forms[index] = newForm;
                return newForm;
            }
            }
    }

    function createFormForUser(form){
        forms.push(form);
        return forms;

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
        console.log("Model form");
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
                delete forms[index];
                //forms.splice(index, 1);
                //break;
            }
        }
    }

    function findFormByTitle(title) {

        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }
        return null;
    }

    function findAllForms() {

        return forms;
    }

    // field munction definitons
    function createFieldForForm(formId, field) {
        console.log("in forms model for create field function");
        console.log()
        for (var i in forms) {

            if (forms[i]._id == formId) {

                if(!forms[i].fields) {
                    forms[i].fields = [];
                }

                forms[i].fields.push(field);
                console.log(forms[i].fields);
                console.log("end of create field function");
                break;
            }
        }
    }

    function findAllFieldsForForm (formId) {

        for (var i in forms) {

            if (forms[i]._id == formId) {
                console.log("forms fields");
                console.log(forms[i].fields);
                return forms[i].fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        field._id = fieldId;

        for (var i in forms) {

            if (forms[i]._id === formId) {

                for (var j in forms[i].fields) {

                    if (forms[i].fields[j]._id === fieldId) {

                        forms[i].fields[j] = field;
                    }
                }
            }
        }
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        console.log("delete field in model");
        console.log(formId);
        console.log(fieldId);

        for (var i in forms) {
            console.log("compare");
            console.log("forms.id in loop:"+forms[i]._id);
            console.log("form id:"+formId);
            if (forms[i]._id == formId) {

                for (var j in forms[i].fields) {
                    console.log("compare");
                    console.log("field id in loop:"+forms[i].fields[j]._id);
                    console.log("field id:"+fieldId);


                    if (forms[i].fields[j]._id == fieldId) {

                        forms[i].fields.splice(j,1);
                    }
                }
            }
        }
    }
}