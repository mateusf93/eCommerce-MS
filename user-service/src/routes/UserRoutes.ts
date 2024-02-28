
import {Router} from "express";

import { UserController } from "../controllers/UserController";

export const userRoutes:Router = Router();

userRoutes.post("/user", UserController.createUser);
userRoutes.post("/login", UserController.login)
userRoutes.get("/userinfo", UserController.getUsers)
userRoutes.get("/")
