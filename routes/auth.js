import express from 'express';
import {createUserFirebase, createUserMongo} from '../services/authentication/CreateUser';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = express.Router();

router.post('/createUser/mongo', createUserMongo, (req, res) => {
    res.send("Created user succesfully!")
})

router.post('/createUser/firebase', createUserMongo, createUserFirebase)

export default router;