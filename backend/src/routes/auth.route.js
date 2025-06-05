import express from 'express';
import { signup , login , logout , updateProfile , checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//protectRoute is a middleware to check the authenticity of the user as only authenticated user can update the profile
router.put("/update-profile" , protectRoute , updateProfile);

router.get("/check" , protectRoute , checkAuth) ; // this route is called whenever the user refresh the page to check if the user is authenticated . depending on that user will go to login page or profile page

export default router;