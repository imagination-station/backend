import models from '../MongoConnect'

const addBookmarkToUser = (req, res) => {

    const {
        routeId
    } = req.body;

    models.User.findByIdAndUpdate(req.params.userId, {$push: {bookmarkedRoutes: [routeId]}}, {new: true},
        (err, user) => {
            if (err) return res.status(500).send(err);
            console.log(user)
            return res.send("Success");
        }
    )

}

export {addBookmarkToUser}
