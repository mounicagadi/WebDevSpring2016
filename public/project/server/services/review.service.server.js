/**
 * Created by mounica on 3/25/2016.
 */



module.exports = function(app, reviewModel) {

    app.get("/api/project/user/:id/reviews",findAllReviewsForUser)

    function findAllReviewsForUser(req, res){
        var id = req.params.id
        console.log("inside server"+id);
        var reviews = reviewModel.findAllReviewsForUser(id);
        res.json(reviews);
    }

}