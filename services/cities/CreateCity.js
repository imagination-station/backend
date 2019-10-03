import models from '../MongoConnect'

const createCity = (req, res, next) => {

    console.log(req.body)

    const {
        name,
        state,
        country
    } = req.body;

    try {
        var city = new models.City({ 
            name: name, 
            state: state,
            country: country
        });


        city.save().then(res.write("Mongo ObjectID:" + city.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export default createCity
