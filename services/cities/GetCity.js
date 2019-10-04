import models from '../MongoConnect'

const getCityById = (req, res) => {

    console.log(req.params.id)
    var cityId = req.params.id

    models.City.findById(cityId)        
        .lean().exec()
        .then((results) => {
            if (results == null) {
                return res.status("404").send("Not a city")
            }
            
            return res.send(results)
        })
        .catch((error) => {
            console.log(error)
            return res.status("500").send("An error occured finding city")
        })
}

const getCities = (req, res) => {

    models.City.find({}).lean()
        .then((cities) => {
            if (cities == null) {
                return res.status("404").send("No cities")
            }

            res.send(cities)
        
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
}

export {getCityById, getCities}
