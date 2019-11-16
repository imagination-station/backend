import models from '../MongoConnect'
import async from "async"
import {populateRouteData} from "../Utilities"

const getRouteById = (req, res) => {

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

const getRoutesByCityAndTags = (req, res, next) => {

    let placeId = req.params.id

    var page = 0;
    if (req.query.page != null) {
        page = Number(req.query.page)
    }    
    
    async.waterfall([
        (next) => {
            models.City.find({"placeId": placeId}).lean()
                .then((city) => {
                    next(null, city[0]._id)
                })
        },
        (cityId, next) => {
            const conditions = {}

            conditions.city = cityId
            conditions.access = "public"

            if (req.query.tag != null) {
                conditions.tags = {$elemMatch: {$in: [req.query.tag]}}
            }
            
            models.Route.find(conditions).lean().skip(page).limit(10)
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
            res.status("404").send([])
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

const getRoutesByLocationAndTag = (req, res) => {

    let search_lat = Number(req.query.lat)
    let search_lng = Number(req.query.lng)

    var page = 0;
    if (req.query.page != null) {
        page = Number(req.query.page)
    }

    var miles = 10;
    if (req.query.range != null) {
        miles = Number(req.query.range)
    }

    const conditions = {}
    conditions.startPoint = {
        $geoWithin: { 
            $centerSphere: [
                [ search_lng, search_lat ],
                miles/3963.2
            ]  
        } 
    }

    if (req.query.tag != null) {
        conditions.tags = {$elemMatch: {$in: [req.query.tag]}}
    }

    models.Route.find(conditions).lean().skip(page).limit(10)
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
        res.status("500").send("Error. Try again later.")
    })
    
}

export {getRouteById, getRoutes, getRoutesByCityAndTags, getRoutesByLocationAndTag}
