/**
 * Created by mounica on 4/14/2016.
 */

module.exports = function(app, restaurantModel,reviewModel) {

    app.get("/api/project/restaurant/:id",findRestaurantById);
    app.post("/api/project/restaurant",addRestaurantById)
    app.get("/api/project/restaurant/:id/reviews", findAllReviewsforHotel);
    app.get("/api/project/restaurant",findRestaurantsByIds);

    function findRestaurantById(req, res){

        var id = req.params.id;

        restaurantModel.findRestaurantById(id)
            .then(
                function ( response ) {
                    res.json(response);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findRestaurantsByIds(req,res){
        var id = req.body;
        console.log("rest service"+id);
        restaurantModel.findRestaurantsByIds(id)
            .then(
                function ( response ) {
                    res.json(response);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function addRestaurantById(req, res){

        var details = req.body;

        restaurantModel.addRestaurantById(details)
            .then(
                function ( response ) {
                    res.json(response);
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

}
