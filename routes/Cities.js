import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';
import {getCityById} from '../services/cities/GetCity'
import {getRouteById, getRoutes} from '../services/cities/GetRoute'

let router = Router();

router.get("/", checkIfAuthenticated, (req, res) => {
    res.send("BOILERPLATE");
});  

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.post("/routes/", checkIfAuthenticated, createRoute, (req, res) => {
    res.write("\nCreated Routed!");
    res.end()
});  

router.get("/routes/", checkIfAuthenticated, getRoutes);

router.get("/routes/:id", checkIfAuthenticated, getRouteById); 

router.get("/:id", checkIfAuthenticated, getCityById);  

export default router;