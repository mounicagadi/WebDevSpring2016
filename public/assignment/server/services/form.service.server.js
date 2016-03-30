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
        // use model to find form by id
        var form = formModel.findFormById(formId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllForms(req, res){

        var forms = formModel.findAllForms()
            .then (
                function (forms) {
                    res.json (forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createForm(req, res){

        var form = req.body;
        var userId = req.params.userId;

        var results = formModel.createFormForUser(form)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllFormsForUser(req, res){
        console.log("Inside server side findAllFormsForUser - forms");
        var id = req.params.userId;
        var results = formModel.findAllFormsForUser(id)
            .then(
            // login user if promise resolved
            function ( doc ) {
                res.json(doc);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;

        var forms = formModel.deleteFormById(formId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateForm(req, res) {
        console.log("In server service");
        var formId = req.params.formId;
        var form = req.body;
        var forms = formModel.updateFormById(formId, form)
            .then(
            function(doc){
                res.json(doc);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }


}
