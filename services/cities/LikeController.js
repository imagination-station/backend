import models from '../MongoConnect'
import async from "async"

const likeRouteById = (req, res) => {

    let userId = req.body.userId;
    var routeId = req.params.id

    models.User.find({_id :userId},).lean()
    .then((u) => {
        var alreadyLiked = false

        u[0].likedRoutes.forEach((elem) => {
            if (elem == routeId){
                alreadyLiked =  true
            }
        })

        if (alreadyLiked) {
            res.status("500").json({"err": "User already liked this route"})
            return res.end()
        }

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

    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send(err);
    })


}

const unlikeRouteById = (req, res) => {

    let userId = req.body.userId;
    var routeId = req.params.id

    models.User.find({_id :userId},).lean()
    .then((u) => {
        var needToUnlike = false

        if (u[0].likedRoutes.length > 0) {
            u[0].likedRoutes.forEach((elem) => {
                if (elem == routeId){
                    needToUnlike = true
                }
            })
        } else {
            needToUnlike = false
        }

        if (!needToUnlike) {
            res.status("500").json({"err": "User hasn't liked this route"})
            return res.end()
        }

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

    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send(err);
    })


    

}

export {likeRouteById, unlikeRouteById}
