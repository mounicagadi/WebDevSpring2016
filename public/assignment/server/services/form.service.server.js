/**
 * Created by mounica on 3/13/2016.
 */


module.exports = function(app, model) {

    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/form", findAllForms);

    function findFormById(req, res){
        console.log("Inside server side findformById - forms");
        var formId = req.params.formId;
        var user = model.findFormById(formId);
        res.json(user);

    }

    function findAllForms(req, res){
        console.log("Inside server side findAllForms - forms");
        var user = model.findAllForms();
        res.json(user);

    }

    function createForm(req, res){

        var response = model.createForm(req.body);
        res.json(response);


    }

    function findAllFormsForUser(req, res){
        console.log("Inside server side findAllFormsForUser - forms");
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);

    }


    function deleteForm(req, res) {
        console.log("Inside server side deleteForm - forms");
        var formId = req.params.formId;
        var forms = model.deleteForm(formId);
        res.json(forms)

    }

    function updateForm(req, res) {
        console.log("Inside server side updateForm - forms");
        var formId = req.params.formId;
        var formObj = req.body;
        var form = model.updateForm(formId, formObj);
        res.json(form);

    }


}
