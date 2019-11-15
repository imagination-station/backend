import models from './MongoConnect'

async function populateRouteData(route) {
    await models.City.findById(route.city).lean().exec()
        .then((city) => {
            route.city = city
        })
        .catch((err) => {
            console.log("In Utilities", "City id not found")
            route.city = {"error": "City not found"}
        })
    await models.User.findById(route.creator).lean().exec()
        .then((creator) => {
            route.creator = {"id": creator._id, "username": creator.username , "name": creator.name}
        })
        .catch((err) => {
            console.log("In Utilities", "User id not found")
            route.creator = {"error": "User not found"}
        })
    await models.Pin.find({'_id': route.pins}).lean().exec()
        .then((pins) => {
            route.pins = pins
        })
        .catch((err) => {
            console.log("In Utilities", "Pins not found")
            route.pins = {"error": "Pins not found"}
        })

    return route
}

export {populateRouteData}