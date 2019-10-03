import express from 'express';
import {createUserFirebase, createUserMongo} from '../services/users/CreateUser';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = express.Router();

router.post('/create/mongo', createUserMongo, (req, res) => {
    res.send(req.mongoText)
})

router.post('/create/firebase', createUserMongo, createUserFirebase)

export default router;