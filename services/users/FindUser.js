import models from '../MongoConnect'

const findUserById = (req, res) => {

    console.log(req.params.id)
    var userId = req.params.id
    var user = {};

    models.User.findById(userId)        
        .lean().exec()
        .then((results) => {
            user = results

            // get the city information
            models.City.findById(results.location)  
                .lean().exec()
                .then((results) => {
                    user.location = results

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

export {findUserById}
