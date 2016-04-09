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
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        sortFields: sortFields
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

        return FormModel.findById(formId).select("fields").findById(fieldId);
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

    function sortFields(formId, startIndex, endIndex) {

        return FormModel.findOne(formId)
            .then(
                function (form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.markModified("fields");
                    form.save();
                });

    }

}
