import {Router} from 'express';
import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';
import {getCityById, getCities} from '../services/cities/GetCity'
import {getRouteById, getRoutes, getRoutesByCity, getRoutesByCityAndTags} from '../services/cities/GetRoute'

let router = Router();

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.post("/routes/", checkIfAuthenticated, createRoute);  

router.get("/", checkIfAuthenticated, getCities);

router.get("/routes/", checkIfAuthenticated, getRoutes);

router.get("/routes/:id", checkIfAuthenticated, getRouteById); 

router.get("/:id", checkIfAuthenticated, getCityById);

router.get("/:id/routes", checkIfAuthenticated, getRoutesByCity, getRoutesByCityAndTags);  

export default router;