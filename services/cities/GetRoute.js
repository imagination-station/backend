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

    let cityId = req.params.id

    models.Route.find({"city": cityId}).lean().limit(20)
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

export {getRouteById, getRoutes, getRoutesByCity}
