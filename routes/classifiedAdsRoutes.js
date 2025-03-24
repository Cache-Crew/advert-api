import { Router } from "express";
import { addClassifiedAd, deleteAd, getAllAds, updateAd, getAdById } from "../controllers/classifiedAdsControllers.js";
import { classifiedAdPicturesUpload } from "../middlewares/uploads.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

// create a classified ads router
const advertRouter = Router();
//Check if user has permission will also be done with a middleware

// define routes

// upload classified ad image is done with local upload middleware
advertRouter.post(
    '/classified-ads',
    isAuthenticated,
    isAuthorized("vendor"),
    classifiedAdPicturesUpload.array('pictures', 3), 
    addClassifiedAd);

advertRouter.get('/ads', getAllAds);

advertRouter.get('/ads/:id', getAdById);  

advertRouter.put('/ads/:id', isAuthenticated, isAuthorized("vendor"),classifiedAdPicturesUpload.array('pictures', 3), updateAd);

advertRouter.delete('/ads/:id', isAuthenticated,isAuthorized("vendor"), deleteAd);

// export router
export default advertRouter;
