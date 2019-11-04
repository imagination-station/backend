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

    models.Route.find({"access": "public"}).lean().limit(100)
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

const getRoutesByCity = (req, res, next) => {

    if (req.body.tags != null) {
        // if tags are there then client wants search by tags
        // so we skip to the next function
        next()
        return 
    }

    let placeId = req.params.id

    async.waterfall([
        (next) => {
            models.City.find({"placeId": placeId}).lean()
                .then((city) => {
                    next(null, city[0]._id)
                })
        },
        (cityId, next) => {
            models.Route.find({"city": cityId, "access": "public"}).lean().limit(100)
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

const getRoutesByCityAndTags = (req, res) => {

    console.log(req.body.tags)
    let placeId = req.params.id
    const tagsReq = req.body.tags;

    async.waterfall([
        (next) => {
            models.City.find({"placeId": placeId}).lean()
                .then((city) => {
                    next(null, city[0]._id)
                })
        },
        (cityId, next) => {
            models.Route.find({"city": cityId, "access": "public", "tags": {$elemMatch: {$in: tagsReq}}}).lean().limit(100)
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

export {getRouteById, getRoutes, getRoutesByCity, getRoutesByCityAndTags}
