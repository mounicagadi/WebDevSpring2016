/**
 * Created by mounica on 3/31/2016.
 */

var q = require("q");

module.exports = function(db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FieldModel = mongoose.model('Fields', FieldSchema);

    var api = {

        //fields
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    }

    return api;

    // field munction definitons
    function createFieldForForm(formId, field) {
        for (var i in forms) {

            if (forms[i]._id == formId) {

                if(!forms[i].fields) {
                    forms[i].fields = [];
                }

                forms[i].fields.push(field);
                break;
            }
        }
    }

    function findAllFieldsForForm (formId) {

        for (var i in forms) {

            if (forms[i]._id == formId) {
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

        for (var i in forms) {
            if (forms[i]._id === formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id === fieldId) {
                        forms[i].fields[j] = field;
                        return field;
                    }
                }
            }
        }
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        forms[i].fields.splice(j,1);
                    }
                }
            }
        }
    }

}
