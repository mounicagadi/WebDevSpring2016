

module.exports = function (app, fieldModel) {

    app.post("/api/assignment/form/:formId/field", createFormField);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field", updateFields);

    function createFormField (req, res) {

        var field = req.body;
        var formId = req.params.formId;

        fieldModel.createFieldForForm(formId, field)
            .then(
            function(form) {
                res.json(form);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllFieldsForForm(req, res) {

        var formId = req.params.formId;
        var result = fieldModel.findAllFieldsForForm(formId)
            .then(
            function(form) {
                res.json(form.fields);
            },

            function(err) {
                res.status(400).send(err);
            }
        );
    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var result = fieldModel.findFieldByFieldIdAndFormId(formId, fieldId)
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

        fieldModel.updateFieldByFieldIdAndFormId(formId, fieldId, field)
            .then(
            function(doc) {
                console.log(doc);
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
        fieldModel.deleteFieldByFieldIdAndFormId(formId, fieldId)
            .then (
            function (stats) {
                res.send(200);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFields(req, res) {

        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            fieldModel.sortFields(formId, startIndex, endIndex)
                .then(
                    function (stat) {
                        res.json(200);

                    },
                    function (err) {
                        res.json(400);
                    }
                );
        }

    }

}