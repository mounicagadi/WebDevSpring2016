

module.exports = function (app, formModel, uuid) {

    app.post("/api/assignment/form/:formId/field", createFormField);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {

        var field = req.body;
        var formId = req.params.formId;

        formModel.createFieldForForm(formId, field)
            .then(
            function(doc) {
                res.json(doc);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllFieldsForForm(req, res) {

        var formId = req.params.formId;
        var result = formModel.findAllFieldsForForm(formId)
            .then(
            function(doc) {
                res.json(doc);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var result = formModel.findFieldByFieldIdAndFormId(formId, fieldId)
            .then(
            function(doc) {
                res.json(doc);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        formModel.updateFieldByFieldIdAndFormId(formId, fieldId, field)
            .then(
            function(doc) {
                res.json(doc);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFieldIdAndFormId(formId, fieldId).then (
            function (stats) {
                res.send(200);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

}