import { Router } from 'express';
import { checkIfAuthenticated } from '../services/authentication/CheckAuthorization';
import createCity from '../services/cities/CreateCity';
import createRoute from '../services/cities/CreateRoute';
import { getCityById, getCities } from '../services/cities/GetCity'
import { getRouteById, getRoutes, getRoutesByCity, getRoutesByTags, getRoutesByLocation, getRoutesByLocationAndTag } from '../services/cities/GetRoute'
import { deleteRouteById } from '../services/cities/DeleteRoute';
import { likeRouteById, unlikeRouteById } from '../services/cities/LikeController';

let router = Router();

router.post("/", checkIfAuthenticated, createCity, (req, res) => {
    res.write("\nCreated City!");
    res.end()
});  

router.post("/routes/", checkIfAuthenticated, createRoute);  

router.get("/", checkIfAuthenticated, getCities);

router.get("/routes/", checkIfAuthenticated, (req, res, next) => {
    console.log(req.query.tag)
    console.log(req.query.lng)
    console.log(req.query.lat)
    if (req.query.tag != null && req.query.lng != null && req.query.lat != null) {
        getRoutesByLocationAndTag(req, res, next)

    } else if (req.query.tag == null && req.query.lng != null && req.query.lat != null) {
        
        getRoutesByLocation(req, res, next)

    } else if (req.query.tag == null && req.query.lng == null && req.query.lat == null) {
        getRoutes(req, res, next)
    }
    
});

router.get("/routes/:id", checkIfAuthenticated, getRouteById); 

router.delete("/routes/:id", checkIfAuthenticated, deleteRouteById);

router.patch("/routes/:id/likes", /*checkIfAuthenticated,*/ (req, res, next) => {
    if (req.body.type === "like") {
        likeRouteById(req, res, next)
    } else if (req.body.type === "unlike") {
        unlikeRouteById(req, res, next)
    } else {
        res.status("500").send("No like type provided")
    }
    
});

router.get("/:id", checkIfAuthenticated, getCityById);

router.get("/:id/routes", checkIfAuthenticated, (req, res, next) => {
    if (req.query.tag != null) {
        console.log("here")

        getRoutesByTags(req, res, next)

    } else if (req.query.tag == null) {
        getRoutesByCity(req, res, next)

    } else {
        res.status("500").json({"err": "Malformed request"}).end()
    }

});  

export default router;