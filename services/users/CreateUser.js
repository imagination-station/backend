import admin from '../authentication/FirebaseService';
import models from '../MongoConnect'

const createUserFirebase = (req, res, next) => {

    const {
        email,
        password,
    } = req.body;

    const user = admin.auth().createUser({
        email,
        password,
    }).catch((err) => {
        console.log('error', err);
        res.status("500").send({ err });
    });

    next();
}

const createUserMongo = (req, res, next) => {

    const {
        name,
        username,
        email,
        bio,
        location
    } = req.body;

    try {
        var user = new models.User({ 
            name: name, 
            username: username,
            email: email, 
            bio: bio,
            location: location, 
            forkedRoutes:[]
        });
        
        user.save().then(res.write("Mongo ObjectID:" + user.id))

    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export {createUserFirebase, createUserMongo}
