import models from '../MongoConnect'

const getUserById = (req, res) => {

    console.log(req.params.id)
    var userId = req.params.id
    var user = {};

    models.User.findById(userId)        
        .lean().exec()
        .then((results) => {
            user = results

            // get the city information
            models.City.find({"placeId": results.location})  
                .lean().exec()
                .then((results) => {
                    user.location = results[0]

                    return res.send(user)
                })
                .catch((error) => {
                    return res.send(error)
                })
        })
        .catch((error) => {
            return res.send(error)
        })
}

const getUserByFirebaseId = (req, res) => {

    console.log(req.params.id)
    let id = req.query.firebaseId;
    var user = {};

    models.User.find({"firebaseId": id})
        .lean()
        .then((results) => {
            user = results[0]

            models.City.find({"placeId": results[0].location})  
                .lean().exec()
                .then((results) => {
                    user.location = results[0]

                    return res.send(user)
                })
                .catch((error) => {
                    return res.send(error)
                })
        })
        .catch((error) => {
            return res.send(error)
        })
}

export {getUserById, getUserByFirebaseId}
