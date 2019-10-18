import express from 'express';
import { createUserFirebase, createUserMongo } from '../services/users/CreateUser';
import { getUserById } from '../services/users/GetUser';
import { checkIfAuthenticated } from '../services/authentication/CheckAuthorization';
import { addForkToUser } from '../services/users/CreateFork';
import { getForksByUser } from '../services/users/GetFork';

let router = express.Router();

router.post('/social', createUserMongo, (req, res) => {
    res.write("\nMongo Success");
    res.end();
})

router.post('/email', createUserMongo, createUserFirebase, (req, res) => {
    res.write("\nFirebase Success");
    res.end();
})

router.get('/:id', checkIfAuthenticated, getUserById)

router.get('/:userId/forks', checkIfAuthenticated, getForksByUser)

router.post('/:userId/forks', checkIfAuthenticated, addForkToUser)

export default router;