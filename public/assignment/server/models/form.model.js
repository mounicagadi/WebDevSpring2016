/**
 * Created by mounica on 3/13/2016.
 */

var forms = require("./form.mock.json");

var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

    var api = {

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle : findFormByTitle,
        findAllForms: findAllForms,
        findFormById : findFormById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return FormModel
    }

    function updateFormById(formId, newForm) {
        // find the object in the collection with id formId
        var deferred = q.defer();

        FormModel.update(
            { _id : formId },
            {$set: newForm},
            function (err, doc) {
                console.log("stats"+doc);
                if (!err) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function createFormForUser(userId, form){
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.create({
            userId : userId,
            title : form.title,
            created : Date.now()}, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log(doc);
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;

    }

    function findAllFormsForUser(userId){
        console.log("inside form.model.js findAllFormsForUser");

        var deferred = q.defer ();
        FormModel.find (
            {userId : userId},
            function (err, users) {
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;

    }

    function findFormById(formId) {
        console.log("Model form");
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {

        var deferred = q.defer();
        FormModel
            .remove (
                {_id: formId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
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

        var deferred = q.defer ();
        FormModel.find (
            function (err, users) {
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

}