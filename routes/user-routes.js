import { Router } from "express";
import { getAuthenticatedUser, loginUser, registerUser } from "../controllers/user-controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


const userRoutes = Router();


userRoutes.post ("/users/register", registerUser);

userRoutes.post ("/users/login", loginUser);

userRoutes.get ("/users/me", isAuthenticated, getAuthenticatedUser);

export default userRoutes;