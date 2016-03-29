/**
 * Created by mounica on 3/25/2016.
 */



module.exports = function(app, reviewModel) {

    app.get("/api/project/user/:id/reviews",findAllReviewsForUser);
    app.post("/api/project/user/:userId/addReview",addReview);
    app.delete("/api/project/user/:userId/deleteReview/:id", deleteReview);
    app.get("/api/project/restaurant/:id/user", findAllUserReviews);

    function findAllReviewsForUser(req, res){
        var id = req.params.id;
        console.log("inside server"+id);
        var reviews = reviewModel.findAllReviewsForUser(id);
        res.json(reviews);
    }

    function addReview(req, res){
        var id = req.params.userId;
        var review = req.body;
        console.log("inside server"+id);
        var reviews = reviewModel.addReview(id, review);
        res.json(reviews);
    }

    function deleteReview(req,res){
        var userID  = req.params.userId;
        var ID = req.params.id;
        reviewModel.deleteReview(userID,ID);
        res.send(200);
    }

    function findAllUserReviews(req, res){
        var id = req.params.id;

    }
}