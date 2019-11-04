import models from '../MongoConnect'

const deleteRouteById = (req, res) => {

    console.log(req.params.id)
    var routeId = req.params.id

    models.Route.findByIdAndRemove(routeId, (err, route) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        
        const response = {
            message: "Route successfully deleted",
            id: route._id
        };
        return res.status(200).send(response);
    });

}

export {deleteRouteById}
