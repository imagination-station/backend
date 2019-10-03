import admin from '../authentication/FirebaseService';
import models from '../MongoConnect'

const createUserFirebase = (req, res, next) => {

    console.log(req.body)

    const {
        email,
        password,
    } = req.body;

    const user = admin.auth().createUser({
        email,
        password,
    });

    next();
}

const createUserMongo = (req, res, next) => {

    console.log(req.body)

    const {
        type, 
        name,
        email,
        location
    } = req.body;

    try {
        var user
        if (type == "Local") {
            user = new models.Local({ 
                name: name, 
                email: email, 
                location: location, 
                savedRoutes:[], 
                createdRoutes:[] 
            });
        } else {
            user = new models.Visitor({ 
                name: name, 
                email: email, 
                location: location, 
                savedRoutes:[]
            });
        }

        user.save().then(res.write("Mongo ObjectID:" + user.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export {createUserFirebase, createUserMongo}
