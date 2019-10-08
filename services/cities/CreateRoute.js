import models from '../MongoConnect'
import async from "async"

const createRoute = (req, res, next) => {

    console.log(req.body)

    const {
        name,
        creator,
        city,
        pins
    } = req.body;
    let placeId = city

    try {
        let pinObjs = []

        for (const pin of pins) {
            pinObjs.push(createPin(pin))     
        }

        async.waterfall([
            (next) => {
                models.City.find({"placeId": placeId}).lean()
                .then((city) => {
                    next(null, city[0]._id)
                })
            },
            (cityId, next) => {
                let route = new models.Route({ 
                    name: name, 
                    creator: creator,
                    city: cityId,
                    pins: pinObjs
                }); 

                next(null, route)
            }
        ],(err, route) => {
            if (err) console.log(err)
            route.save().then(res.send("Mongo ObjectID:" + route.id))
        })

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
}

const createPin = (p) => {
    var id = []
    try {
        var pin = new models.Pin({ 
            geometry: p.geometry,
            properties: p.properties
        });
        pin.save().then(id.push(pin.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }

    return id[0]
}

export default createRoute
