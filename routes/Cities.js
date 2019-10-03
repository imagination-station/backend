import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';
import {getCityById} from '../services/cities/GetCity'
import {getRouteById} from '../services/cities/GetRoute'

let router = Router();

router.get("/", checkIfAuthenticated, (req, res) => {
    res.send("BOILERPLATE");
});  

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.get("/:id", checkIfAuthenticated, getCityById);  

router.post("/routes", checkIfAuthenticated, createRoute, (req, res) => {
    res.write("\nCreated Routed!");
    res.end()
});  

router.get("/routes/:id", checkIfAuthenticated, getRouteById); 

export default router;