import express from 'express';
import { createUserFirebase, createUserMongo } from '../services/users/CreateUser';
import { getUserById, getUserByFirebaseId } from '../services/users/GetUser';
import { checkIfAuthenticated } from '../services/authentication/CheckAuthorization';
import { addForkToUser } from '../services/users/CreateFork';
import { getForksByUser } from '../services/users/GetFork';
import { getRoutesByUser } from '../services/users/GetCreatedRoutes';
import { getLikesByUser } from '../services/users/GetLikes';


let router = express.Router();

router.post('/social', createUserMongo, (req, res) => {
    res.write("\nMongo Success");
    res.end();
})

router.post('/email', createUserFirebase, createUserMongo)

router.get('/:id', checkIfAuthenticated, getUserById)

router.get('/', checkIfAuthenticated, getUserByFirebaseId)

router.get('/:userId/routes', checkIfAuthenticated, getRoutesByUser)

router.get('/:userId/forks', checkIfAuthenticated, getForksByUser)

router.post('/:userId/forks', checkIfAuthenticated, addForkToUser)

router.get('/:userId/likes', checkIfAuthenticated, getLikesByUser)

export default router;