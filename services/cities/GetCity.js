import models from '../MongoConnect'

const getCityById = (req, res) => {

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

const getCities = (req, res) => {

    models.City.find({}).lean()
        .then((cities) => {
            res.send(cities)
        
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
}

export {getCityById, getCities}
