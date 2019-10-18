import models from '../MongoConnect'

const addForkToUser = (req, res) => {

    const {
        routeId
    } = req.body;

    models.User.findByIdAndUpdate(req.params.userId, {$push: {forkedRoutes: [routeId]}}, {new: true},
        (err, user) => {
            if (err) return res.status(500).send(err);
            console.log(user)
            return res.send("Success");
        }
    )

}

export {addForkToUser}
