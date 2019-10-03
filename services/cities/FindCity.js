import models from '../MongoConnect'

const findCityById = (req, res) => {

    console.log(req.params.id)
    var cityId = req.params.id

    models.City.findById(cityId)        
        .lean().exec()
        .then((results) => {
            return res.send(results)
        })
        .catch((error) => {
            console.log(error)
            return res.send("An error occured finding city")
        })
}

export {findCityById}
