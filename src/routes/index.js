import { Router } from "express";
import authRoute from "./auth.route.js";

const router = Router();

router.use("/api", authRoute);

export default router;
