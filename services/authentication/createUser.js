import admin from './FirebaseService';
import models from '../MongoConnect'

const createUserFirebase = async (req, res) => {

    console.log(req.body)

    const {
        email,
        password,
    } = req.body;

    create

    const user = await admin.auth().createUser({
        email,
        password,
    });

    return res.send(user);
}

const createUserMongo = async (req, res) => {

    console.log(req.body)

    const {
        type, 
        email,
        name,
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

        await user.save()
        res.send("User added to mongoDB.")
    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export {createUserFirebase, createUserMongo}
