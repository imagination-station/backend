import express from 'express';
import {createUser} from '../services/authentication/createUser';
import {checkIfAuthenticated} from '../services/authentication/authMiddleware';

let router = express.Router();

router.post('/createUser', createUser)

export default router;