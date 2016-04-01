/**
 * Created by mounica on 3/31/2016.
 */

var q = require("q");

module.exports = function(db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var fieldModel = mongoose.model('Form', FieldSchema);

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

        var deferred = q.defer();
        fieldModel.create({
            label : field.label,
            type : field.type,
            placeholder : field.placeholder,
            options : field.options
        })
            .then(
                function(doc, err){
                    if(!err){
                        deferred.resolve(doc);
                    }else{
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllFieldsForForm (formId) {

        var deferred = q.defer();
        fieldModel.findById(formId)
            .then(
                function(doc,err){
                        if (!err) {
                        deferred.resolve(doc);
                    } else {
                        deferred.reject(err);
                    }
                }

                    );
                    return deferred.promise;
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
