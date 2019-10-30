import models from '../MongoConnect'

const createCity = (req, res, next) => {

    console.log(req.body)

    const {
        placeId,
        name,
        photoRef
    } = req.body;

    try {
        var city = new models.City({ 
            placeId: placeId,
            name: name,
            photoRef: photoRef
        });


        city.save().then(res.write("Mongo ObjectID:" + city.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export default createCity
