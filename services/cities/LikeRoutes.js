import models from '../MongoConnect'
import async from "async"

const likeRouteById = (req, res) => {

    let type = req.body.type
    let userId = req.body.userId;

    console.log(req.params.id)
    var routeId = req.params.id

    async.waterfall([
        (next) => {
            models.Route.findOneAndUpdate({_id :routeId}, {$inc : {'numLikes' : 1}}, {new: true},
                (err, user) => {
                    if (err) return res.status(500).send(err);
                    console.log(err)
                    next();
                }
            )
        },
        (next) => {
            models.User.findByIdAndUpdate(userId, {$push: {likedRoutes: [routeId]}}, {new: true},
                (err) => {
                    if (err) return res.status(500).send(err);
                    console.log(err)
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

export {likeRouteById}
