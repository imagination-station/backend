import models from './MongoConnect'

async function populateRouteData(route) {
    await models.City.findById(route.city).lean().exec()
        .then((city) => {
            route.city = city
        })
    await models.User.findById(route.creator).lean().exec()
        .then((creator) => {
            route.creator = {"id": creator._id, "username": creator.username , "name": creator.name}
        })
    await models.Pin.find({'_id': route.pins}).lean().exec()
        .then((pins) => {
            route.pins = pins
        })

    return route
}

export {populateRouteData}