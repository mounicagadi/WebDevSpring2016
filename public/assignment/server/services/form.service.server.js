/**
 * Created by mounica on 3/13/2016.
 */

module.exports = function(app, formModel, uuid) {

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.get("/api/assignment/form/:formId", findFormById);

    function findFormById(req, res){
        var formId = req.params.formId;

        res.json(formModel.findFormById(formId));

    }

    function findAllForms(req, res){
        console.log("Inside server side findAllForms - forms");
        res.json(formModel.findAllForms());

    }

    function createForm(req, res){

        var form = req.body;
        var userId = parseInt(req.params.userId);

        form.userId = userId;
        form._id = parseInt(uuid.v4(), 16);

        formModel.createFormForUser(form);
        res.json(formModel.findAllFormsForUser(userId));


    }

    function findAllFormsForUser(req, res){
        console.log("Inside server side findAllFormsForUser - forms");
        var id = parseInt(req.params.userId);
        res.json(formModel.findAllFormsForUser(id));

    }


    function deleteFormById(req, res) {
        var formId = req.params.formId;

        formModel.deleteFormById(formId);

        res.send(200);

    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;

        formModel.updateFormById(formId, form);

        res.send(200);

    }


}
