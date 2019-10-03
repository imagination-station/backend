import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = Router();

router.get("/info", checkIfAuthenticated, async (_, res) => {
    return res.send("You got mail!");
});  

export default router;