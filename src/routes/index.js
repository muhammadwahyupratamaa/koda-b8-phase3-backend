import { Router } from "express";
import authRoute from "./auth.route.js";
import linkRoute from "./link.route.js";
import { redirectLinks } from "../controllers/link.controller.js";

const router = Router();
router.use("/api", authRoute);
router.use("/api", linkRoute);
router.use("/:slug", redirectLinks);

export default router;
