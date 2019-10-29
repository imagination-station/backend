import models from './MongoConnect'

async function populateRouteData(route) {
    await models.City.findById(route.city).lean().exec()
        .then((city) => {
            route.city = city
        })
        .catch((err) => {
            console.log(err)
            route.creator = {"error": "City not found"}
        })
    await models.User.findById(route.creator).lean().exec()
        .then((creator) => {
            route.creator = {"id": creator._id, "username": creator.username , "name": creator.name}
        })
        .catch((err) => {
            console.log(err)
            route.creator = {"error": "User not found"}
        })
    await models.Pin.find({'_id': route.pins}).lean().exec()
        .then((pins) => {
            route.pins = pins
        })
        .catch((err) => {
            console.log(err)
            route.creator = {"error": "Pins not found"}
        })

    return route
}

export {populateRouteData}