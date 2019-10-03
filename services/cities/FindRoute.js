import models from '../MongoConnect'

const findRouteById = (req, res) => {

    console.log(req.params.id)
    var routeId = req.params.id
    var route = {}

    models.Route.findById(routeId)        
        .lean().exec()
        .then((results) => {
            route = results

            models.Pin.find({'_id': route.pins})  
                .lean().exec()
                .then((pins) => {
                    route.pins = pins
                })
                .catch((error) => {
                    return res.status(500).send(error)
                })
        })
        .then(() => {
            models.User.findById(route.creator)    
                .lean().exec()
                .then((creator) => {
                    route.creator = creator
                })
                .catch((error) => {
                    return res.status(500).send(error)
                })
        })
        .then(() => {
            return models.City.findById(route.city)    
                .lean().exec()
                .then((city) => {
                    route.city = city
                })
                .catch((error) => {
                    return res.status(500).send(error)
                })

        })
        .then(() => {
            return res.send(route)
        })
        .catch((error) => {
            return res.status(500).send(error)
        })
}

export {findRouteById}
