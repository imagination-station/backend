import models from '../MongoConnect'

const findUserById = (req, res) => {

    console.log(req.params.id)
    var userId = req.params.id
    var user = {};

    models.User.findById(userId)        
        .lean().exec().then((results) => {
            user = results

            try {
                // get the city information
                models.City.findById(results.location)  
                    .lean().exec().then((results) => {
                        user.location = results

                        return res.send(user)
                    })
            } catch (err3) {
                return res.send(err3)
            } 
        })
}

export {findUserById}
