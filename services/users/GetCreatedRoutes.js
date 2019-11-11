import models from '../MongoConnect'
import async from "async"
import {populateRouteData} from "../Utilities"

const getRoutesByUser = (req, res) => {

    let userId = req.params.userId

    models.Route.find({"creator": userId, "access": "public"}).lean().limit(100)
        .then((routes) => {
            async.map(routes, 
                async (route) => {return populateRouteData(route)}, 
                (err, results) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(err)
                        return
                    }

                    if (results == null || results.length == 0) {
                        res.status("404").send([])
                        return
                    } 

                    res.send(results)
                }
            );
        })
        
}

export {getRoutesByUser}
