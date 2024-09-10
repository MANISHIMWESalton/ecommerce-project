import { Router } from "express";
import authRouter from "./authRouters";
import productRoute from "./productRouters";
import authMiddleWare from "../middleware/authMiddleware";
const router = Router();
router.use("/auth", authRouter)
router.use("/product", authMiddleWare, productRoute)

export default router