import models from '../MongoConnect'
import async from "async"
import {populateRouteData} from "../Utilities"

const getLikesByUser = (req, res) => {

    let userId = req.params.userId

    async.waterfall([
        (next) => {
            models.User.find({"_id": userId}).lean()
                .then((user) => {
                    next(null, user[0].likedRoutes)
                })
        },
        (forks, next) => {
            async.map(forks, 
                async (fork) => {return models.Route.findById(fork).lean()}, 
                (err, results) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(err)
                    }
                    next(null, results)
                }
            );
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

        var filteredRoutes = routes.filter((el) => {
            return el != null;
        })

        async.map(filteredRoutes, 
            async (route) => {return populateRouteData(route)}, 
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                }
                console.log(results)
                res.send(results)
            }
        );
    })
        
}

export { getLikesByUser }