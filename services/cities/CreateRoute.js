import models from '../MongoConnect'
import async from "async"

const createRoute = (req, res, next) => {

    console.log(req.body)

    const {
        name,
        creator,
        city,
        pins,
        tags
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
                .catch((err) => {
                    return res.status("501").send("No such city found")
                })
            },
            (cityId, next) => {
                let route = new models.Route({ 
                    name: name, 
                    creator: creator,
                    city: cityId,
                    pins: pinObjs,
                    tags: tags
                }); 

                next(null, route)
            }
        ],(err, route) => {
            if (err) console.log(err)
            route.save().then(() => {
                res.json({"Mongo ObjectID" : route.id});
                res.end()
            })
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
