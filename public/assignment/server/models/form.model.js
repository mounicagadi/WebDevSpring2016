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
        updateFormById: updateFormById
    };
    return api;

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
}
