import express from 'express';
import { createUserFirebase, createUserMongo } from '../services/users/CreateUser';
import { getUserById } from '../services/users/GetUser';
import { checkIfAuthenticated } from '../services/authentication/CheckAuthorization';
import { addBookmarkToUser } from '../services/users/CreateBookmark';
import { getBookmarksByUser } from '../services/users/GetBookmark';

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

router.get('/:userId/bookmarks', checkIfAuthenticated, getBookmarksByUser)

router.put('/:userId/bookmark', checkIfAuthenticated, addBookmarkToUser)

export default router;