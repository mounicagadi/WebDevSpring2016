/**
 * Created by mounica on 3/25/2016.
 */



module.exports = function(app, reviewModel) {

    app.get("/api/project/reviews",findAllReviews);
    app.get("/api/project/user/:id/reviews",findAllReviewsForUser);
    app.post("/api/project/user/:userId/addReview",addReview);
    app.put("/api/project/review",updateReview);
    app.delete("/api/project/review/:id", deleteReview);



    function findAllReviews(req,res){
        reviewModel.findAllReviews()
            .then(
                function(response){
                    res.json(response);
                },
                function (){
                    res.status(400).send(err);
                }
            );
    }

    function findAllReviewsForUser(req, res){
        var id = req.params.id;
        console.log("inside server"+id);
        reviewModel.findAllReviewsForUser(id)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function addReview(req, res){
        var id = req.params.userId;
        var review = req.body;
        reviewModel.addReview(id, review)
            .then(
            function ( reviews ) {
                res.json(reviews);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function deleteReview(req,res){
        var ID = req.params.id;
        reviewModel.deleteReview(ID)
            .then(
            function ( doc ) {
                res.send(200);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function findAllReviewsforHotel(req, res){
        var id = req.params.id;
        reviewModel.findAllReviewsforHotel(id)
            .then(
                function ( reviews ) {
                    res.json(reviews);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function updateReview(req,res){

        console.log("inside update reev server");
        var newReview = req.body;
        reviewModel.updateReview(newReview)
            .then(
                function ( stats ) {
                    res.send(stats);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
}