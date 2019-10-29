import models from '../MongoConnect'
import mongoose from 'mongoose';
import async from "async"

const addForkToUser = (req, res) => {

    const {
        routeId
    } = req.body;


    async.waterfall([
        (next) => {
            models.Route.findById(routeId).exec( (err, route) => {
                    if (err) {
                        console.log(err)
                        return res.status("500").send("Route not found")
                    } else {
                        route._id = mongoose.Types.ObjectId();
                        route.isNew = true;
                        route.creator = req.params.userId;
                        route.parent = routeId;
                        route.save().then(next(null, route.id))
                    }

                    
                }
            );
        },
        (id, next) => {
            models.User.findByIdAndUpdate(req.params.userId, {$push: {forkedRoutes: [id]}}, {new: true},
                (err, user) => {
                    if (err) return res.status(500).send(err);
                    console.log(user)
                    next(null);
                }
            )
        }
    ], (err) => {
        if (err) {
            res.status("500").send("")
        } 

        res.send("Success");
    })

}

export {addForkToUser}
