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
    }).then((user) => {
        req.firebaseID = user.uid
        next();
    }).catch((err) => {
        console.log('error', err);
        res.status("500").send({ err });
    })

    
}

const createUserMongo = (req, res, next) => {

    const {
        name,
        username,
        email,
        bio,
        location,
        tags
    } = req.body;

    var user = new models.User({ 
        name: name, 
        username: username,
        email: email, 
        bio: bio,
        location: location, 
        forkedRoutes:[],
        likedRoutes:[],
        firebaseId: req.firebaseID,
        tags: tags
    });
    
    user.save().then((user) => {
        res.json({"Mongo ObjectID" : user.id});
    }).catch((error) => {
        console.log('error', error);
        res.send({ error });
    })
    
}

export {createUserFirebase, createUserMongo}
