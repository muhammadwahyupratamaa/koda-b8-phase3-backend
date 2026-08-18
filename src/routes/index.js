import { Router } from "express";
import authRoute from "./auth.route.js";
import linkRoute from "./link.route.js";

const router = Router();
router.use("/api", authRoute);
router.use("/api", linkRoute);

export default router;
