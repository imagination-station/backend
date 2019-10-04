import models from '../MongoConnect'
import async from "async"
import {populateRouteData} from "../Utilities"

const getRouteById = (req, res) => {

    console.log(req.params.id)
    var routeId = req.params.id

    models.Route.findById(routeId)        
            .lean().exec()
            .then((result) => {
                async.map([result], 
                    async (route) => {return populateRouteData(route)},
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(err)
                        }
                        res.send(results)
                    }
                );

            })
            .catch((error) => {
                return res.status(500).send(error)
            })

}

const getRoutes = (req, res) => {

    models.Route.find({}).lean().limit(20)
        .then((routes) => {
                
            async.map(routes, 
                async (route) => {return populateRouteData(route)}, 
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

const getRoutesByCity = (req, res) => {

    let placeId = req.params.id

    async.waterfall([
        (next) => {
            models.City.find({"placeId": placeId}).lean()
                .then((city) => {
                    next(null, city[0]._id)
                })
        },
        (cityId, next) => {
            models.Route.find({"city": cityId}).lean().limit(20)
                .then((routes) => {
                    next(null, routes)
                
                })
        }
    ], (err, routes) => {
        if (err) {
            res.status("500").send("")
            return
        } 

        if (routes == null || routes.length == 0) {
            res.status("404").send("")
            return
        }

        async.map(routes, 
            async (route) => {return populateRouteData(route)}, 
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                }
                res.send(results)
            }
        );
    })
        
}

export {getRouteById, getRoutes, getRoutesByCity}
