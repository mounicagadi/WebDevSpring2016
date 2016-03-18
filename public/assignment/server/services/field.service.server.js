/**
 * Created by mounica on 3/13/2016.
 */
module.exports = function(app, formModel, uuid) {

    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldById);


    function findFieldsByFormId(req, res) {
        var formId = parseInt(req.params.formId );

        res.json(formModel.findAllFieldsForForm(formId));
    }

    function findFieldById(req, res) {
        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16);

        res.json(formModel.findFieldByFieldIdAndFormId(formId, fieldId));
    }

    function deleteFieldById(req, res) {
        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);

        formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);

        res.send(200);
    }

    function createField(req, res) {
        var field = req.body;
        var formId = parseInt(req.params.formId);
        console.log("IN server servicce");
        console.log(field);
        field._id = parseInt(uuid.v4(), 16);

        formModel.createFieldForForm(formId, field);

        res.json(formModel.findAllFieldsForForm(formId));
    }

    function updateFieldById(req, res) {
        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16);
        var field = req.body;

        res.send(200);
    }
};