import models from '../MongoConnect'
import async from "async"

const likeRouteById = (req, res) => {

    let userId = req.body.userId;

    console.log(req.params.id)
    var routeId = req.params.id

    async.waterfall([
        (next) => {
            models.Route.findOneAndUpdate({_id :routeId}, {$inc : {'numLikes' : 1}}, {new: true},
                (err, user) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    next();
                }
            )
        },
        (next) => {
            models.User.findByIdAndUpdate(userId, {$push: {likedRoutes: [routeId]}}, {new: true},
                (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    next();
                }
            )
        }
    ], (err) => {
        if (err) {
            res.status("500").send("")
            return
        } 
        
        res.send("Success")
         
    })

}

const unlikeRouteById = (req, res) => {

    let userId = req.body.userId;

    console.log(req.params.id)
    var routeId = req.params.id

    async.waterfall([
        (next) => {
            models.Route.findOneAndUpdate({_id :routeId}, {$inc : {'numLikes' : -1}}, {new: true},
                (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    
                    next();
                }
            )
        },
        (next) => {
            models.User.updateOne( { _id: userId }, {$pull: {likedRoutes: routeId}}, {new: true},
                (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    next();
                }
            )
        }
    ], (err) => {
        if (err) {
            res.status("500").send("")
            return
        } 
        
        res.send("Success")
         
    })

}

export {likeRouteById, unlikeRouteById}
