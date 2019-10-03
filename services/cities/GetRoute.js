import models from '../MongoConnect'
import async from "async"

const getRouteById = (req, res) => {

    console.log(req.params.id)
    var routeId = req.params.id
    var route = {}

    models.Route.findById(routeId)        
            .lean().exec()
            .then((result) => {
                route = result;

                async.parallel({
                    cityFind: (cb) => { 
                        models.City.findById(route.city)    
                            .lean().exec(cb)
                    },
                    creatorFind: (cb) => { 
                        models.User.findById(route.creator)    
                            .lean().exec(cb) 
                    },
                    pinsFind: (cb) => { 
                        models.Pin.find({'_id': route.pins})  
                            .lean().exec(cb)
                    }
                }, (err, result) => {
                    route.city = result.cityFind;
                    route.creator = result.creatorFind;
                    route.pins = result.pinsFind
                    res.send(route)
                });


            })
            .catch((error) => {
                return res.status(500).send(error)
            })

}

export {getRouteById}
