import models from '../MongoConnect'
import async from "async"
import {populateRouteData} from "../Utilities"

const getBookmarksByUser = (req, res) => {

    let userId = req.params.userId

    async.waterfall([
        (next) => {
            models.User.find({"_id": userId}).lean()
                .then((user) => {
                    next(null, user[0].bookmarkedRoutes)
                })
        },
        (bookmarks, next) => {
            async.map(bookmarks, 
                async (bookmark) => {return models.Route.findById(bookmark).lean()}, 
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
                console.log(results)
                res.send(results)
            }
        );
    })
        
}

export {getBookmarksByUser}