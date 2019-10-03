import admin from '../authentication/FirebaseService';
import models from '../MongoConnect'

const createUserFirebase = async (req, res) => {

    console.log(req.body)

    const {
        email,
        password,
    } = req.body;

    const user = await admin.auth().createUser({
        email,
        password,
    });

    return res.send(user);
}

const createUserMongo = async (req, res, next) => {

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

        await user.save()
        req.mongoText = "Created mongo user succesfully!"
    } catch (error) {
        console.log('error', error);
        res.send({ error });
    }
    
    next();
}

export {createUserFirebase, createUserMongo}
