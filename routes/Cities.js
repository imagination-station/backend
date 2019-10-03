import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';
import {findCityById} from '../services/cities/FindCity'
import {findRouteById} from '../services/cities/FindRoute'

let router = Router();

router.get("/", checkIfAuthenticated, (req, res) => {
    res.send("BOILERPLATE");
});  

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.get("/:id", checkIfAuthenticated, findCityById);  

router.post("/routes", checkIfAuthenticated, createRoute, (req, res) => {
    res.write("\nCreated Routed!");
    res.end()
});  

router.get("/routes/:id", checkIfAuthenticated, findRouteById); 

export default router;