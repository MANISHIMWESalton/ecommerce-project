import { Router } from "express";
import authControllers from "../module/controller/authControllers";
const authRouter: Router = Router();
authRouter.post("/register", authControllers.signup)
authRouter.post("/login", authControllers.login)

export default authRouter
