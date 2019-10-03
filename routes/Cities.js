import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';


let router = Router();

router.get("/", checkIfAuthenticated, (req, res) => {
    res.send("BOILERPLATE");
});  

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.post("/routes", checkIfAuthenticated, createRoute, (req, res) => {
    res.write("\nCreated Routed!");
    res.end()
});  

export default router;