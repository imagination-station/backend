import models from '../MongoConnect'

const createRoute = (req, res, next) => {

    console.log(req.body)

    const {
        name,
        creator,
        city,
        pins
    } = req.body;

    try {
        let pinObjs = []

        for (const pin of pins) {
            pinObjs.push(createPin(pin))     
        }

        var route = new models.Route({ 
            name: name, 
            creator: creator,
            city: city,
            pins: pinObjs
        });

        route.save().then(res.write("Mongo ObjectID:" + route.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

const createPin = (p) => {
    var id = []
    try {
        var pin = new models.Pin({ 
            name: p.name,
            coordinates: p.coordinates,
            description: p.description
        });
        pin.save().then(id.push(pin.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }

    return id[0]
}

export default createRoute
