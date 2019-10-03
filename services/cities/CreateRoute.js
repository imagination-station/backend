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
        let pinObjs = createPin(pins)

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

const createPin = (pins) => {
    var pinObjs = []

    for (const pin of pins) {
        console.log(pin);
        try {
            var pinM = new models.Pin({ 
                name: pin.name,
                coordinates: pin.coordinates
            });


            pinM.save().then(pinObjs.push(pinM.id))

        } catch (error) {
            console.log('error', error);
            res.send({ error });
        }
    }

    return pinObjs
}

export default createRoute
