/**
 * Created by mounica on 3/13/2016.
 */

var q = require("q");

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
        model
            .findFormById(formId)
            .then(function(response){
                res.json(response);
            });
    }

    function findAllForms(req, res){
        console.log("Inside server side findAllForms - forms");
        model
            .findAllForms()
            .then(function(user){
                res.json(user);
            });
    }

    function createForm(req, res){

        model.createForm(req.body)
            .then(function(response){
                res.json(response);
            });

    }

    function findAllFormsForUser(req, res){
        console.log("Inside server side findAllFormsForUser - forms");
        var userId = req.params.userId;
        model
            .findAllFormsForUser(userId)
            .then(function(forms){
                res.json(forms);
            });
    }


    function deleteForm(req, res) {
        console.log("Inside server side deleteForm - forms");
        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function(forms) {
                res.json(forms)
            });
    }

    function updateForm(req, res) {
        console.log("Inside server side updateForm - forms");
        var formId = req.params.formId;
        var formObj = req.body;
        model
            .updateForm(formId, formObj)
            .then(function(form){
                res.json(form);
            });
    }


}
