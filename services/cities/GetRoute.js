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

const getRoutes = (req, res) => {

    models.Route.find({}).lean().limit(20)
        .then((routes) => {
                
            async.map(routes, async (route) => {
                    
                    await models.City.findById(route.city)    
                        .lean().exec()
                        .then((r) => {
                            route.city = r;
                        })
            
                    await models.User.findById(route.creator)    
                        .lean().exec()
                        .then((r) => {
                            route.creator = r;
                        }) 

                    await models.Pin.find({'_id': route.pins})  
                        .lean().exec()
                        .then((r) => {
                            route.pins = r
                        })
                    
                    return route
                }, 
                (err, results) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(err)
                    }
                    res.send(results)
                }
            );

        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        
}

export {getRouteById, getRoutes}
