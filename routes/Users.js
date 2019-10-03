import express from 'express';
import {createUserFirebase, createUserMongo} from '../services/users/CreateUser';
import {findUserById} from '../services/users/FindUser';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = express.Router();

router.post('/social', createUserMongo, (req, res) => {
    res.write("\nMongo Success");
    res.end();
})

router.post('/email', createUserMongo, createUserFirebase, (req, res) => {
    res.write("\nFirebase Success");
    res.end();
})

router.get('/:id', checkIfAuthenticated, findUserById)

export default router;