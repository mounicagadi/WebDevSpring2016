

module.exports = function (app, formModel, uuid) {

    app.post("/api/assignment/form/:formId/field", createFormField);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {

        var field = req.body;
        var formId = parseInt(req.params.formId);
        field._id = parseInt(uuid.v4(), 16);

        formModel.createFieldForForm(formId, field);
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function findAllFieldsForForm(req, res) {

        var formId = parseInt(req.params.formId );
        var result = formModel.findAllFieldsForForm(formId);
        res.json(result);
    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16   );
        var result = formModel.findFieldByFieldIdAndFormId(formId, fieldId);
        res.json(result);
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16);
        var field = req.body;

        res.send(formModel.updateFieldByFieldIdAndFormId);
    }

    function deleteFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);
        res.send(200);
    }

}