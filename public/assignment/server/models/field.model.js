/**
 * Created by mounica on 3/31/2016.
 */

var q = require("q");


module.exports = function(db, mongoose, formModel) {

    var FormModel = formModel.getMongooseModel();

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

        //var deferred = q.defer();

        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function findAllFieldsForForm (formId) {

        return FormModel.findById(formId).select("fields");

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

        return FormModel.update(
            { _id: formId ,
             "fields._id" :fieldId} ,
            {$set : {"fields.$" : field}
            }
        );
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        return FormModel.update(
            { _id: formId },
            { $pull: { 'fields': { _id : fieldId } } }
        );
    }

}
